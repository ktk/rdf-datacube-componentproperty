const d3 = require('d3-sparql')

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

function runQuery (endpoint, query) {
  return new Promise((resolve, reject) => {
    d3.sparql(endpoint, query, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data || [])
      }
    })
  })
}

Promise.all(endpoints.map(endpoint => {
  return runQuery(endpoint, cubeAttributes).then(data => {
    data = data || []

    console.error(`fetched ${data.length} properties from ${endpoint}`)

    return data
  }).catch(err => {
    console.error(`error fetching properties from ${endpoint}: ${err.message.slice(0, 100)}`)

    return []
  })
})).then(results => {
  const data = results.reduce((data, result) => data.concat(result))

  if (data.length === 0) {
    return Promise.reject(new Error('no properties found'))
  }

  // CSV header
  process.stdout.write(`${Object.keys(data[0]).join(',')}\n`)

  // CSV values
  process.stdout.write(data.map(row => Object.values(row).join(',')).join('\n'))
}).catch(err => {
  console.error(err)
})
