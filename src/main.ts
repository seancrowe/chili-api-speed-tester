import getDateTestResult from "./api_tests/getDateTestResult";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { ChiliConfig } from "./runtypes";
import { ChiliConnector } from "chiliconnector";
import { program } from "commander";
import chalk from "chalk";
import stringify from "json-stringify-safe";
import fs from "fs";
import { useTry } from "no-try";
import path from "path";
import runTestsFromConfig from "./runTestsFromConfig";
import writeApiTestResults from "./writeApiTestResults";

const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);

program.option("-u --url <type>", "URL to the main.asmx of CHILI");
program.option("-c --config <type>", "config for running test");
program.option("-o --output <type>", "output folder path for the results");
program.option("--init", "Creates a ChiliConfig for testing");

program.parse();

const {
  url,
  config: configPath,
  init,
  output: outputPath = basePath + "/tests",
} = program.opts();

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    export interface Process {
      pkg: any;
    }
  }
}

(async () => {
  if (init) {
    const chiliConfig: ChiliConfig = {
      apiTests: [
        {
          baseUrl: "http://dev1.chili-publish.com/chili/",
          username: "name",
          password: "1234",
          environment: "admin",
          documentIds: ["94267ab1-6d04-422b-941b-5bdec37b5e58"],
        },
      ],
    };

    fs.writeFileSync(
      basePath + "/config-speed.json",
      JSON.stringify(chiliConfig, null, 4)
    );
    console.log("Config file written to " + basePath + "/config-speed.json");
    return;
  }

  if (url != null && configPath == null) {
    runUrlOnly(url);
    return;
  }

  if (configPath != null) {
    if (!fs.existsSync(configPath)) {
      console.log("ERROR! - config does not exist on path: " + configPath);
    }

    const [parseError, config] = useTry(() =>
      ChiliConfig.check(JSON.parse(fs.readFileSync(configPath, "utf8")))
    );

    if (parseError != null) {
      console.log(
        "ERROR! - parsing error",
        "Maybe create a new config with --init",
        parseError
      );
    }

    const apiTestResults = await runTestsFromConfig(config, url, true);
    writeApiTestResults(apiTestResults, outputPath);
    return;
  }

  console.log("no url, please provide URL with the -u parameter");
})();

async function runUrlOnly(url: string) {
  const chiliConnector = new ChiliConnector(url);

  console.log("starting test\n\n");

  try {
    console.log("Date request");
    console.time("date-time");
    const serverDateResponse = await chiliConnector.getServerDateAsync();
    console.timeEnd("date-time");

    console.log("API request");
    console.time("api-time");
    console.log(new Date().toISOString());
    const generateApiResponse = await chiliConnector.generateApiKeyAsync(
      "admin",
      "ChiliAdmin",
      "test"
    );
    console.timeEnd("api-time");
    console.log(new Date().toISOString());

    if (
      serverDateResponse.date != null &&
      generateApiResponse.apiKey?.attr?.succeeded != null
    ) {
      if (generateApiResponse.apiKey.attr.errorMessage == "Invalid login") {
        console.log(chalk.green("passed test"));
      } else {
        console.log(chalk.red("test failed to get date or api key"));
      }
    } else {
      console.log(chalk.red("test failed to get date or api key"));
    }
  } catch (e) {
    console.log(chalk.red("there was an error"));

    fs.writeFileSync("./error.json", stringify(e));
  }
}
