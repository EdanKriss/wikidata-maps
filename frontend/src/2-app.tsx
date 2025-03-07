import { Suspense, lazy, useEffect, useState, type FunctionComponent, type PropsWithChildren } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { Spinner } from './components/progress/circular.js';

const LandingPage = lazy(async () => {
    const { LandingPage } = await import('./pages/landing.js');
    return { default: LandingPage };
});

// const LoginPage = lazy(async () => {
//     const { LoginPage } = await import('./pages/login.js');
//     return { default: LoginPage };
// });

const FullscreenFallback = <Spinner label='Loading...🔜' boxSx={{ height: '100vh', width: '100vw', position: 'absolute' }} />;

export const App: FunctionComponent = () => {
    return (
        <BrowserRouter basename={WEBSERVER_BASE_PATH}>
            <Routes>
                <Route path="/" element={
                    <Suspense fallback={FullscreenFallback}>
                        <LandingPage />
                    </Suspense>
                }/>
            </Routes>
        </BrowserRouter>
    );
}
