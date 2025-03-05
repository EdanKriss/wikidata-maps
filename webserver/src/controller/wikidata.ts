export interface SparqlResults {
    head: { vars: string[] };
    results: { bindings: SparqlBinding[] };
}

export interface SparqlBinding {
    [key: string]: { type: string; value: string };
}
