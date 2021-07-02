import createTestResult from "../common/createTestResult";
import { ChiliConnector } from "chiliconnector";
import { TestOptions, TestResult } from "../types";
import { stopwatch } from "durations";
import { useTryAsync } from "no-try";
import { ApiTest } from "../runtypes";

export default async function (
  chiliConnector: ChiliConnector,
  apiKey: string,
  resourceName: "documents",
  itemId: string
): Promise<[Error, TestResult, Record<string, any>]> {
  const watch = stopwatch();

  watch.start();
  const [error, response] = await useTryAsync(
    async () =>
      await chiliConnector.resourceItemGetXMLAsync(apiKey, resourceName, itemId)
  );
  watch.stop();

  return [
    error,
    createTestResult(watch, "downloadXml", error != null),
    response,
  ];
}
