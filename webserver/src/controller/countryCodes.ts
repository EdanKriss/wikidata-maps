import { type SparqlResults } from "./wikidata.js";

// export interface CountryMap {
//     [name: string]: string; // { "Ireland": "Q27" }
// }

export type CountryMap = Map<string, string | undefined>;

export async function fetchAllCountryCodes(): Promise<CountryMap> {
    const sparqlQuery = `
        SELECT ?country ?countryLabel WHERE {
            ?country wdt:P31 wd:Q6256. # Instance of: sovereign country
            SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        }
    `;

    const encodedQuery = encodeURIComponent(sparqlQuery);
    const url = `https://query.wikidata.org/sparql?query=${encodedQuery}&format=json`;

    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/sparql-results+json',
                'User-Agent': 'YourApp/1.0 (your.email@example.com)',
            },
        });

        if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);

        const data = await response.json() as SparqlResults;
        // console.log('fetchAllCountryCodes() raw result', JSON.stringify(data.results));

        const countryMap: CountryMap = new Map();

        data.results.bindings.forEach(binding => {
            const name = binding.countryLabel.value;
            const qCode = binding.country.value.split('/entity/')[1];
            countryMap.set(name, qCode);
        });

        console.log('fetchAllCountryCodes() parsed results', countryMap.entries());
        return countryMap;
    } catch (error) {
        console.error('ERROR fetchAllCountryCodes():', error);
        throw error;
    }
}
