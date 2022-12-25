import PQueue from "p-queue";
import fs from "fs";
import csv from "csvtojson";
import objectMapper from "object-mapper";

import { request } from "./httpClient.mjs";
import mapperConfig from "../mapper-config.json";

function handler({ url, headers, body}) {
  return async () => {
    const { status, response, success } = await request({ url, body, headers });
    if (success) {
      return Promise.resolve({ status, response, success });
    }
    return Promise.reject({ status, response, success });
  };
}

export function migrate({
  sourceCsvFilePath,
  succesResutlsFilePath,
  errorResultsFilePath,
  destination_api_configs,
  concurrency = 2
}) {
  const queue = new PQueue({ concurrency});
  const successWriteStream = fs.createWriteStream(succesResutlsFilePath);
  const errorWriteStream = fs.createWriteStream(errorResultsFilePath);
  queue.on("completed", ({ status, response, success }) => {
    if (success) {
      successWriteStream.write(`${JSON.stringify(response)} \n`);
    }else{
      errorWriteStream.write(`${response} \n`);
    }
  });

  queue.on("error", (error) => {
    errorWriteStream.write(`${error} \n`);
  });

  const onError = (err) => {
    successWriteStream.end();
    errorWriteStream.end();
    console.log("Error While reading file", err);
  };

  const onComplete = () => {
    successWriteStream.end();
    errorWriteStream.end();
    console.log("File Processing Completed");
  };

  csv()
    .fromFile(sourceCsvFilePath)
    .subscribe(
      (obj) => {
        const transformedInfo = objectMapper(obj, mapperConfig);
        queue.add(
          handler({ ...destination_api_configs, body: transformedInfo})
        );
      },
      onError,
      onComplete
    );
}
