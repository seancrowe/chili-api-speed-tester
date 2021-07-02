import { ChiliConnector } from "chiliconnector";
import { ApiTest } from "../runtypes";
import { TestOptions, TestResult } from "../types";
import getItemCopyTestResult from "./getItemCopyTestResult";

export default async function (
  chiliConnector: ChiliConnector,
  apiTest: ApiTest,
  testOptions: TestOptions,
  debug = false
): Promise<[TestResult, boolean]> {
  const [itemCopyError, itemCopyResult, itemCopyResponse] =
    await getItemCopyTestResult(
      chiliConnector,
      testOptions.apiKey == null ? "" : testOptions.apiKey,
      "documents",
      testOptions.documentId == null ? "" : testOptions.documentId
    );

  if (
    itemCopyResponse.item == null ||
    itemCopyResponse.item.attr == null ||
    itemCopyResponse.item.attr.id == null
  ) {
    if (debug)
      console.log("ERROR! - document " + testOptions.documentId + " not found");
    return [itemCopyResult, true];
  }

  testOptions.documentId = itemCopyResponse.item.attr.id;

  return [itemCopyResult, itemCopyResult.error];
}
