import { ChiliConnector } from "chiliconnector";
import { ApiTest } from "../runtypes";
import { TestOptions, TestResult } from "../types";
import getItemMoveTestResult from "./getItemMoveTestResult";

export default async function (
  chiliConnector: ChiliConnector,
  apiTest: ApiTest,
  testOptions: TestOptions,
  debug = false
): Promise<[TestResult, boolean]> {
  const [itemMoveError, itemMoveResult, itemMoveResponse] =
    await getItemMoveTestResult(
      chiliConnector,
      testOptions.apiKey == null ? "" : testOptions.apiKey,
      "documents",
      testOptions.documentId == null ? "" : testOptions.documentId
    );

  return [itemMoveResult, itemMoveResult.error];
}
