const d3 = require('d3-sparql')
const util = require('util')

const cubeAttributes = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX schema: <http://schema.org/>
SELECT * WHERE { GRAPH ?g {

    VALUES ?class {
        qb:DimensionProperty
        qb:AttributeProperty
        qb:MeasureProperty 
    }
    
    ?measure a ?class ;
    OPTIONAL { ?measure rdfs:label|skos:prefLabel|schema:name ?label }    
    
}} 
`

const endpoints = [
  'https://ld.stadt-zuerich.ch/query',
  'http://gss-data.org.uk/sparql',
  'http://semantic.eea.europa.eu/sparql',
  'http://id.insee.fr/sparql',
  'http://data.cso.io/sparql'
]

Promise.all(endpoints.map(endpoint => {
  return util.promisify(d3.sparql)(endpoint, cubeAttributes)
})).then(results => {
  const data = [].concat(results)

  console.log(data)
}).catch(err => {
  console.error(err)
})
