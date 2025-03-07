import { Suspense, lazy, type FunctionComponent } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import { LightTheme } from './store/theme.js';
import { LayoutProvider } from './store/layout.js';

const App = lazy(async () => {
    const { App } = await import('./2-app.js');
    return { default: App };
});

export const Shell: FunctionComponent = () => {
    return (
        <>
            <CssBaseline />
            <SnackbarProvider />

            <ThemeProvider theme={LightTheme}>
                <LayoutProvider>
                    <Suspense>
                        <App />
                    </Suspense>
                </LayoutProvider>
            </ThemeProvider>
        </>
    );
}
