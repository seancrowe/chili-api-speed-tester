import { ChiliConnector } from "chiliconnector";
import { ApiTest } from "../runtypes";
import { TestOptions, TestResult } from "../types";
import getEditorLoadTimeTestResult from "./getEditorLoadTimeTestResult";

export default async function (
  chiliConnector: ChiliConnector,
  apiTest: ApiTest,
  testOptions: TestOptions,
  debug = false
): Promise<[TestResult, boolean]> {
  const [editorUrlError, editorUrlResult, editorUrlResponse] =
    await getEditorLoadTimeTestResult(
      testOptions.apiKey == null ? "" : testOptions.apiKey,
      testOptions.editorUrl == null ? "" : testOptions.editorUrl,
      testOptions.chromePath == null ? "" : testOptions.chromePath
    );

  return [editorUrlResult, false];
}
