import chromeInterface from "chrome-remote-interface";
import chromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";
import { ChiliConnector } from "chiliconnector";
import { TestResult } from "../types";
import createTestResult from "../common/createTestResult";
import { stopwatch } from "durations";

export default async function (
  apiKey: string,
  editorUrl: string,
  executablePath: string,
  headless = true
): Promise<[Error | null, TestResult, Record<string, any>]> {
  const watch = stopwatch();

  const browser = await puppeteer.launch({
    headless: headless,
    executablePath: executablePath,
  });
  const page = await browser.newPage();
  await page.goto(editorUrl + "&apiKey=" + apiKey);

  watch.start();
  await new Promise((resolve) => {
    const timeoutHanlder = setTimeout(resolve, 240000);

    page.on("console", (msg) => {
      for (let i = 0; i < msg.args().length; ++i) {
        const message = msg.args()[i].toString();
        if (message.includes("Document Fully Rendered")) {
          clearTimeout(timeoutHanlder);
          resolve(true);
        }
      }
    });
  });
  watch.stop();

  await page.close();
  await browser.close();

  return [null, createTestResult(watch, "Editor Load Test", false), {}];
}
