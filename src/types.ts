import { ChiliConnector } from "chiliconnector";
import { ApiTest } from "./runtypes";

export type ApiTestResults = {
  results: TestResult[];
  errors: boolean;
};

export type TestResult = {
  time: string;
  timeMS: number;
  api: string;
  error: boolean;
  document?: string;
  address?: string;
};

export type TestOptions = {
  apiKey?: string;
  documentId?: string;
  editorUrl?: string;
  chromePath?: string;
};

export type TestFunction = (
  chiliConnector: ChiliConnector,
  apiTest: ApiTest,
  testOptions: TestOptions,
  debug: boolean
) => Promise<[TestResult, boolean]>;
