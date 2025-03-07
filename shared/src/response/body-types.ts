import { type WikiPerson } from "../model/wikidata-person.js";
import { type ResponseBody } from "./index.js";

export namespace ResponseBodies {
    export type GET_wikidata_people = ResponseBody<Data.GET_wikidata_people>;

    export namespace Data {
        export type GET_wikidata_people = WikiPerson[];
    }
}
