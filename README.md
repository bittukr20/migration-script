# Asyncronous High Volume of Data CSV-File-Migration-script Using Node.js Streams

This is a script which is very useful to migrate huge volume of data from CSV file to a Destination System using HTTP/HTTPs calls. 
It uses Streaming of data which will make sure, that your system memory will not get blocked and the processing of data will be faster.
It gives you options for Concurrency, which will help to achieve multiple HTTP/HTTPs request at a time.

How it works:
-----------------------------
1. Reads each row at a time using streams 
2. Transforms the row using object-mapper
3. create Promise for the desination system HTTP/HTTPs calls
4. Put the Promise in the queue of Library (p-queue npm: https://www.npmjs.com/package/p-queue)
5. on completion of each item, write the results in respective files using streams.


CONFIGURATIONS MANDATORY FOR MIGRATION
--------------------------------------
1. CONCURRENCY
2. DESTINATION_END_POINT_CONFIGS
3. SOURCE_CSV_FILE_PATH
4. SUCCESS_RESULTS_CSV_FILE_PATH
6. ERROR_RESULTS_CSV_FILE_PATH
7. TOTAL_NUMBER_OF_ITEMS


Above Fields Description
------------------------
CONCURRENCY --> It's an Ingeger field which says Number of Active HTTP requests at a time
DESTINATION_END_POINT_CONFIGS --> It's a object having 3 keys,(url, headers, method) which should contain destination system request configuration
SOURCE_CSV_FILE_PATH --> It's a string field, which contains the path to the CSV that needs to be processed/read for Migration
SUCCESS_RESULTS_CSV_FILE_PATH --> It's a string field, where success results will be written. File should be a .txt file
ERROR_RESULTS_CSV_FILE_PATH --> It's a string field, where error results will be written. File should be a .txt file
TOTAL_NUMBER_OF_ITEMS --> It's a Integer field which contains number of items present in the Source CSV Path


Pre-Requisites
--------------
1. Latest version of node.js should be there 

Steps To Run The Script
-----------------------
1. npm i
2. Edit the mapper-config.json as per the Library object-mapper, which will help to transform the data in the CSV Row to the request body of Destination System
   object-mapper npm url: https://www.npmjs.com/package/object-mapper
3. Provide all the information in index.mjs file
4. node index.mjs

