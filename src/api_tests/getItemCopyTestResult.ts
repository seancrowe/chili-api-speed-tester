import { ChiliConnector } from "chiliconnector";
import { stopwatch } from "durations";
import { useTryAsync } from "no-try";
import createTestResult from "../common/createTestResult";
import { TestResult } from "../types";
import { v4 as uuid } from "uuid";

export default async function (
  chiliConnector: ChiliConnector,
  apiKey: string,
  resourceName: "documents",
  itemId: string
): Promise<[Error, TestResult, Record<string, any>]> {
  const watch = stopwatch();

  watch.start();
  const [error, response] = await useTryAsync(async () =>
    chiliConnector.resourceItemCopyAsync(
      apiKey,
      resourceName,
      itemId,
      uuid(),
      "api-speed-test-88"
    )
  );

  watch.stop();

  return [
    error,
    createTestResult(watch, "ResourceItemCopy", error != null),
    response,
  ];
}
