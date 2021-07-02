import { ChiliConnector } from "chiliconnector";
import { TestResult } from "../types";
import { stopwatch } from "durations";
import { useTryAsync } from "no-try";
import createTestResult from "../common/createTestResult";

export default async function (
  chiliConnector: ChiliConnector,
  apiKey: string,
  documentId: string
): Promise<[Error, TestResult, Record<string, any>]> {
  const watch = stopwatch();

  watch.start();
  const [error, response] = await useTryAsync(
    async () =>
      await chiliConnector.documentGetHTMLEditorURLAsync(
        apiKey,
        documentId,
        "",
        "",
        "",
        false,
        false
      )
  );
  watch.stop();

  return [
    error,
    createTestResult(watch, "DocumentGetHTMLEditorURLAsync", error != null),
    response,
  ];
}
