import { ChiliConnector } from "chiliconnector";
import { ApiTest } from "../runtypes";
import { TestOptions, TestResult } from "../types";
import getItemDeleteTest from "./getItemDeleteTestResult";
import createTestResult from "../common/createTestResult";
import { stopwatch } from "durations";

export default async function (
  chiliConnector: ChiliConnector,
  apiTest: ApiTest,
  testOptions: TestOptions,
  debug = false
): Promise<[TestResult, boolean]> {
  if (
    testOptions.documentId == null ||
    testOptions.apiKey == null ||
    apiTest.documentIds.includes(testOptions.documentId)
  ) {
    return [createTestResult(stopwatch(), "ResourceItemDelete", true), false];
  }

  const [itemDeleteError, itemDeleteResult] = await getItemDeleteTest(
    chiliConnector,
    testOptions.apiKey,
    "documents",
    testOptions.documentId
  );

  return [itemDeleteResult, false];
}
