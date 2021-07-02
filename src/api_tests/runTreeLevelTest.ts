import { TestOptions, TestResult } from "../types";
import { ApiTest } from "../runtypes";
import { ChiliConnector } from "chiliconnector";
import getTreeLevelTestResult from "./getTreeLevelTestResult";

export default async function (
  chiliConnector: ChiliConnector,
  apiTest: ApiTest,
  testOptions: TestOptions,
  debug = false
): Promise<[TestResult, boolean]> {
  const [treeLevelError, treeLevelResult] = await getTreeLevelTestResult(
    chiliConnector,
    testOptions.apiKey == null ? "" : testOptions.apiKey
  );

  return [treeLevelResult, false];
}
