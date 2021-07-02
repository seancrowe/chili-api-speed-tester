import { ChiliConnector } from "chiliconnector";
import { ApiTest } from "../runtypes";
import { stopwatch } from "durations";
import { useTryAsync } from "no-try";
import createTestResult from "../common/createTestResult";
import { TestResult } from "../types";

export default async function (
  chiliConnector: ChiliConnector,
  apiKey: string
): Promise<[Error, TestResult, Record<string, any>]> {
  const watch = stopwatch();

  watch.start();
  const [error, response] = await useTryAsync(async () =>
    chiliConnector.resourceGetTreeLevelAsync(apiKey, "documents", "/", 1)
  );

  watch.stop();

  return [
    error,
    createTestResult(watch, "ResourceGetTreeLevelTree", error != null),
    response,
  ];
}
