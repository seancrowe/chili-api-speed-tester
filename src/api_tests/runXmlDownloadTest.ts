import { TestOptions, TestResult } from "../types";
import { ApiTest } from "../runtypes";
import { ChiliConnector } from "chiliconnector";
import getXmlDownloadTestResult from "./getXmlDownloadTestResult";

export default async function (
  chiliConnector: ChiliConnector,
  apiTest: ApiTest,
  testOptions: TestOptions,
  debug = false
): Promise<[TestResult, boolean]> {
  const [treeLevelError, treeLevelResult] = await getXmlDownloadTestResult(
    chiliConnector,
    testOptions.apiKey == null ? "" : testOptions.apiKey,
    "documents",
    testOptions.documentId == null ? "" : testOptions.documentId
  );

  return [treeLevelResult, false];
}
