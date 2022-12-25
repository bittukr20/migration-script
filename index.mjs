import { migrate } from "./lib/lib.mjs";

const concurrency = 2;
const destination_api_configs = {
  url: "http://127.0.0.1:8080/url-shortener",
  headers: {},
  method: "POST",
};
const sourceCsvFilePath = "sample.csv";
const succesResutlsFilePath = "success.txt";
const errorResultsFilePath = "error.txt";
const number_of_items = 4;
migrate({
  sourceCsvFilePath,
  succesResutlsFilePath,
  errorResultsFilePath,
  destination_api_configs,
  concurrency,
  number_of_items,
});
