import { ChiliConnector } from "chiliconnector";
import { ApiTest } from "../runtypes";
import { TestOptions, TestResult } from "../types";
import getEditorUrlTestResult from "./getEditorUrlTestResult";

export default async function (
  chiliConnector: ChiliConnector,
  apiTest: ApiTest,
  testOptions: TestOptions,
  debug = false
): Promise<[TestResult, boolean]> {
  const [editorUrlError, editorUrlResult, editorUrlResponse] =
    await getEditorUrlTestResult(
      chiliConnector,
      testOptions.apiKey == null ? "" : testOptions.apiKey,
      testOptions.documentId == null ? "" : testOptions.documentId
    );

  testOptions.editorUrl = editorUrlResponse.urlInfo.attr.url;

  return [editorUrlResult, false];
}
