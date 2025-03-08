import { useState } from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from "react-helmet";

import { SimpleMap } from '../components/simple-map';

export const LandingPage: FunctionComponent = () => {
    return <>
        <Helmet>
            <title>Wikidata Maps</title>
            <meta name="description" content="" />
        </Helmet>

        <SimpleMap />
    </>;
}