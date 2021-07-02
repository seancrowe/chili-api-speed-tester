import { NoTryResult, useTryAsync } from "no-try";
import { ChiliConnector } from "chiliconnector";
import { stopwatch } from "durations";
import { TestResult } from "../types";
import createTestResult from "../common/createTestResult";

export default async function (
  chiliConnector: ChiliConnector
): Promise<[Error, TestResult, Record<string, any>]> {
  const watch = stopwatch();

  watch.start();
  const [error, response] = await useTryAsync(
    async () => await chiliConnector.getServerDateAsync()
  );
  watch.stop();

  return [
    error,
    createTestResult(watch, "GetServerDate", error != null),
    response,
  ];
}
