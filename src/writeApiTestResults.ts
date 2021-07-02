import fs from "fs-extra";
import { ApiTestResults } from "./types";
import { Parser } from "json2csv";
import { v4 as uuidv4 } from "uuid";

export default function (
  apiTestResults: Array<ApiTestResults>,
  outputPath: string
) {
  fs.ensureDirSync(outputPath);

  for (const apiTestResult of apiTestResults) {
    const csvResults = new Parser().parse(apiTestResult.results);

    const date = new Date();

    const filename = `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getHours()}_test${uuidv4()}.csv`;

    fs.writeFileSync(outputPath + "/" + filename, csvResults);
  }

  console.log("Tests are written to: " + outputPath);
}
