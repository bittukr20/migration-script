import PQueue from "p-queue";
import fs from "fs";
import csv from "csv-parser";
import objectMapper from "object-mapper";

import { request } from "./httpClient.mjs";
import mapperConfig from "../mapper-config.json" assert { type: "json" };

function handler({ url, headers, method, body }) {
  return async () => {
    const { status, response, success } = await request({
      url,
      method,
      body,
      headers,
    });
    return Promise.resolve({ status, response, success });
  };
}

export function migrate({
  sourceCsvFilePath,
  succesResutlsFilePath,
  errorResultsFilePath,
  destination_api_configs,
  concurrency = 2,
  number_of_items,
  max_items_in_queue_at_a_time,
}) {
  const queue = new PQueue({ concurrency });
  const sourceCsvReadStream = fs.createReadStream(sourceCsvFilePath);
  const successWriteStream = fs.createWriteStream(succesResutlsFilePath);
  const errorWriteStream = fs.createWriteStream(errorResultsFilePath);
  let counter = 0;
  queue.on("completed", ({ status_code, response, success }) => {
    counter++;
    if (success) {
      successWriteStream.write(`${JSON.stringify(response)} \n`);
    } else {
      errorWriteStream.write(`${JSON.stringify(response)} \n`);
    }

    if (number_of_items === counter) {
      console.log("All Items Migration Done");
      successWriteStream.end();
      errorWriteStream.end();
    }
  });

  queue.on("error", (error) => {
    console.log("Items in Queue Throws Error");
    errorWriteStream.write(`${error} \n`);
  });

  const onError = (err) => {
    successWriteStream.end();
    errorWriteStream.end();
    console.log("Error While reading file", err);
  };

  const onComplete = () => {
    console.log("File Reading Completed");
  };

  const csvStream = sourceCsvReadStream.pipe(csv());

  csvStream
    .on("data", async (obj) => {
      const transformedInfo = objectMapper(obj, mapperConfig);
      const queueSize = queue.size;
      if (queueSize >= max_items_in_queue_at_a_time) {
        csvStream.pause();
        await queue.onSizeLessThan(max_items_in_queue_at_a_time);
        csvStream.resume();
      }
      queue.add(handler({ ...destination_api_configs, body: transformedInfo }));
    })
    .on("end", onComplete)
    .on("error", onError);
}
