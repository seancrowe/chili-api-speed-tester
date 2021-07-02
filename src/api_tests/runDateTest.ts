import { TestFunction } from "../types";
import { ChiliConnector } from "chiliconnector";
import getDateTestResult from "./getDateTestResult";

const runDateTest: TestFunction = async (
  chiliConnector,
  apiTest,
  testOptions,
  debug
) => {
  const [dateError, dateTestResult] = await getDateTestResult(chiliConnector);

  if (dateTestResult.error) {
    console.log(
      "ERROR! - there was an error getting the server date, which is probably caused by wrong URL"
    );
    console.log("Skipping test for " + apiTest.baseUrl);
    if (debug) console.log(dateError);
  }

  return [dateTestResult, dateTestResult.error];
};

export default runDateTest;
