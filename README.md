# RDF Data Cube: ComponentProperty assembler

This is a simple node.js-script that connects to the list of specified SPARQL endpoints and tries to collect a list of all [RDF Data Cube](https://www.w3.org/TR/vocab-data-cube/#dsd-dimensions) `qb:ComponentProperties`. This is usually `qb:DimensionProperty`, `qb:AttributeProperty` and `qb:MeasureProperty`.

## Usage

This script requires [node.js](https://nodejs.org/en/). Once you have node running execute `npm install`, which will fetch the dependencies. Once this is done run `node index.js`. The script writes the result to `stdout`, you can pipe it into a file or alike. Error messages are logged to `stderr`.

## Contribute

If you have any datacubes in a SPARQL endpoint, we need you! Please check if the script works as expected and either create a pull-request or an issue. Both in case it works or in case it does not, would be great if you could debug a bit what is going wrong. We will then merge and add your endpoint to the list.
