import {
  Boolean,
  Number,
  String,
  Literal,
  Array,
  Tuple,
  Record,
  Union,
  Static,
  Optional,
} from "runtypes";
import { ChiliConnector } from "chiliconnector";

export const ApiTest = Record({
  baseUrl: String,
  username: String,
  password: String,
  environment: String,
  reruns: Optional(Number),
  documentIds: Array(String),
});

export type ApiTest = Static<typeof ApiTest>;

export const ChiliConfig = Record({
  apiTests: Array(ApiTest),
  chromeExecutablePath: Optional(String),
});

export type ChiliConfig = Static<typeof ChiliConfig>;
