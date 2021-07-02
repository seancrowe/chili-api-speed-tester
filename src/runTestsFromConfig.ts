import { stopwatch } from "durations";
import { ChiliConnector } from "chiliconnector";
import { NoTryResult, useTry, useTryAsync } from "no-try";
import { ApiTest, ChiliConfig } from "./runtypes";
import { ApiTestResults, TestFunction, TestOptions, TestResult } from "./types";

import cliProgress from "cli-progress";
import runDateTest from "./api_tests/runDateTest";
import runApiKeyTest from "./api_tests/runApiKeyTest";
import runTreeLevelTest from "./api_tests/runTreeLevelTest";
import runXmlDownloadTest from "./api_tests/runXmlDownloadTest";
import runItemCopyTest from "./api_tests/runItemCopyTest";
import runItemDeleteTest from "./api_tests/runItemDeleteTest";
import runEditorUrlTest from "./api_tests/runEditorUrlTest";
import runEditorLoadTest from "./api_tests/runEditorLoadTest";
import runItemMoveTest from "./api_tests/runItemMoveTest";

export default async function runConfig(
  config: ChiliConfig,
  url: string,
  debug = false
): Promise<ApiTestResults[]> {
  const generalTests: Array<TestFunction> = [
    runDateTest,
    runApiKeyTest,
    runTreeLevelTest,
  ];

  const documentTests: Array<TestFunction> = [
    runItemCopyTest,
    runXmlDownloadTest,
    runEditorUrlTest,
  ];

  if (config.chromeExecutablePath != null) {
    documentTests.push(runEditorLoadTest);
  }

  documentTests.push(runItemMoveTest);
  documentTests.push(runItemDeleteTest);

  console.log(`Found ${config.apiTests.length} tests`);

  const multiBar = new cliProgress.MultiBar({
    format: "{bar} | {percentage}% || {value}/{total} {test}",
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });

  const mainBar = multiBar.create(config.apiTests.length, 0, {
    test: "Total ApiTest Cases",
  });

  const apiTestResultsArray: ApiTestResults[] = [];

  for (const apiTest of config.apiTests) {
    const chiliConnector = new ChiliConnector(
      url == null ? apiTest.baseUrl : url
    );

    const testBarTotal =
      generalTests.length + documentTests.length * apiTest.documentIds.length;
    const testBar = multiBar.create(testBarTotal, 0, {
      test: apiTest.baseUrl,
    });
    mainBar.increment();

    const apiTestResults: ApiTestResults = {
      results: [],
      errors: false,
    };

    apiTestResultsArray.push(apiTestResults);

    const testOptions: TestOptions =
      config.chromeExecutablePath != null
        ? { chromePath: config.chromeExecutablePath }
        : {};

    for (let i = 0; i < generalTests.length; i++) {
      const test = generalTests[i];
      const [testResult, skip] = await test(
        chiliConnector,
        apiTest,
        testOptions,
        debug
      );

      testBar.increment();

      testResult.address = apiTest.baseUrl;
      apiTestResults.results.push(testResult);
      if (!apiTestResults.errors) apiTestResults.errors = testResult.error;

      if (skip) {
        break;
      }
    }

    if (testOptions.apiKey == null) {
      continue;
    }

    for (const documentId of apiTest.documentIds) {
      testOptions.documentId = documentId;

      for (const documentTest of documentTests) {
        const [testResult] = await documentTest(
          chiliConnector,
          apiTest,
          testOptions,
          debug
        );

        testBar.increment();

        testResult.address = apiTest.baseUrl;
        testResult.document = documentId;
        apiTestResults.results.push(testResult);
        if (!apiTestResults.errors) apiTestResults.errors = testResult.error;
      }
    }

    testBar.stop();
  }

  mainBar.stop();

  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
  console.log("\n\n");

  return apiTestResultsArray;
}
