import { useState } from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from "react-helmet";

export const LandingPage: FunctionComponent = () => {
    return <>
        <Helmet>
            <title>Example Portal</title>
            <meta name="description" content="Home page for Example" />
        </Helmet>
        HOME
    </>;
}