import { TestFunction } from "../types";
import getApiKeyTestResult from "./getApiKeyTestResult";

const runApiKeyTest: TestFunction = async (
  chiliConnector,
  apiTest,
  testOptions,
  debug
) => {
  const [apiKeyError, apiKeyTestResult, apiKeyResponse] =
    await getApiKeyTestResult(chiliConnector, apiTest);

  if (
    apiKeyTestResult.error ||
    apiKeyResponse.apiKey == null ||
    apiKeyResponse.apiKey.attr == null
  ) {
    console.log("ERROR! - there was an error getting the API key");
    console.log("Skipping test for " + apiTest.baseUrl);
    if (debug) console.log(apiKeyError);
  }

  const apiKey = apiKeyResponse.apiKey.attr as {
    succeeded: "true" | "false";
    key?: string;
  };

  if (apiKey.succeeded == "false" || apiKey.key == null) {
    console.log(
      "ERROR! - there was an error getting the API key, which is probably caused by wrong credentials or environment"
    );
    console.log("Skipping test for " + apiTest.baseUrl);
  }

  testOptions.apiKey = apiKey.key;

  return [apiKeyTestResult, apiKeyTestResult.error];
};

export default runApiKeyTest;
