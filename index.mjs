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
const MAX_ITEMS_IN_QUEUE_AT_A_TIME = 1;
migrate({
  sourceCsvFilePath: SOURCE_CSV_FILE_PATH,
  succesResutlsFilePath: SUCCESS_RESULTS_CSV_FILE_PATH,
  errorResultsFilePath: ERROR_RESULTS_CSV_FILE_PATH,
  destination_api_configs: DESTINATION_END_POINT_CONFIGS,
  concurrency: CONCURRENCY,
  max_items_in_queue_at_a_time: MAX_ITEMS_IN_QUEUE_AT_A_TIME,
});
