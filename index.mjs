import { migrate } from "./lib/lib.mjs";

const CONCURRENCY = 2;
const DESTINATION_END_POINT_CONFIGS = {
  url: "http://127.0.0.1:8080/url-shortener",
  headers: {},
  method: "POST",
};
const SOURCE_CSV_FILE_PATH = "sample.csv";
const SUCCESS_RESULTS_CSV_FILE_PATH = "success.txt";
const ERROR_RESULTS_CSV_FILE_PATH = "error.txt";
const TOTAL_NUMBER_OF_ITEMS = 4;

migrate({
  sourceCsvFilePath: SOURCE_CSV_FILE_PATH,
  succesResutlsFilePath: SUCCESS_RESULTS_CSV_FILE_PATH,
  errorResultsFilePath: ERROR_RESULTS_CSV_FILE_PATH,
  destination_api_configs: DESTINATION_END_POINT_CONFIGS,
  concurrency: CONCURRENCY,
  number_of_items: TOTAL_NUMBER_OF_ITEMS,
});
