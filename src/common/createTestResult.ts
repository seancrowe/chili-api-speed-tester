import { TestResult } from "../types";

export default function (watch: Watch, api: string, error = false): TestResult {
  return {
    time: watch.duration().format(),
    timeMS: watch.duration().millis(),
    api: api,
    error: error,
  };
}
