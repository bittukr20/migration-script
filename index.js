import { migrate } from "./lib/lib.mjs";

const concurrency = 2;
const destination_api_configs = {
  url: "",
  headers: {},
};
const sourceCsvFilePath = "sample.csv";
const succesResutlsFilePath = "success.txt";
const errorResultsFilePath = "error.txt";

migrate({
  sourceCsvFilePath,
  succesResutlsFilePath,
  errorResultsFilePath,
  destination_api_configs,
  concurrency,
});
