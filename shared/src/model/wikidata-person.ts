// a person who is the subject of a dedicated wikipedia article,
// sourced from the Wikidata query service
export type WikiPerson = {
    article: string; // ?article
    name: string; // ?personLabel
    description: string; // ?personDescription
    birthPlace: string; // ?birthPlace
};
