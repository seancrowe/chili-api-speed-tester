import { ChiliConnector } from "chiliconnector";
import { stopwatch } from "durations";
import { useTryAsync } from "no-try";
import createTestResult from "../common/createTestResult";
import { TestResult } from "../types";

export default async function (
  chiliConnector: ChiliConnector,
  apiKey: string,
  resourceName: "documents",
  itemId: string
): Promise<[Error, TestResult, Record<string, any>]> {
  const watch = stopwatch();

  watch.start();
  const [error, response] = await useTryAsync(async () =>
    chiliConnector.resourceItemDeleteAsync(apiKey, resourceName, itemId)
  );

  watch.stop();

  return [
    error,
    createTestResult(watch, "ResourceItemDelete", error != null),
    response,
  ];
}
