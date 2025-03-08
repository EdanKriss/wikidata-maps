import { type CountryCodeMap } from "../model/country.js";

import { type WikiPerson } from "../model/wikidata-person.js";
import { type ResponseBody } from "./index.js";

export namespace ResponseBodies {
    export type GET_wikidata_people = ResponseBody<Data.GET_wikidata_people>;
    export type GET_countries = ResponseBody<Data.GET_countries>;

    export namespace Data {
        export type GET_wikidata_people = WikiPerson[];
        export type GET_countries = CountryCodeMap;
    }
}
