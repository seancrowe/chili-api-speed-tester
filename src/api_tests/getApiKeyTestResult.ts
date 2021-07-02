import { ChiliConnector } from "chiliconnector";
import { NoTryResult, useTryAsync } from "no-try";
import { ApiTest } from "../runtypes";
import { stopwatch } from "durations";
import createTestResult from "../common/createTestResult";
import { TestResult } from "../types";

export default async function (
  chiliConnector: ChiliConnector,
  apiTest: ApiTest
): Promise<[Error, TestResult, Record<string, any>]> {
  const watch = stopwatch();

  watch.start();
  const [error, response] = await useTryAsync(async () =>
    chiliConnector.generateApiKeyAsync(
      apiTest.environment,
      apiTest.username,
      apiTest.password
    )
  );

  watch.stop();

  return [
    error,
    createTestResult(watch, "GenerateApiKey", error != null),
    response,
  ];
}
