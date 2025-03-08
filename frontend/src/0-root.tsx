import { createRoot, type Root } from 'react-dom/client';

import '@fontsource/roboto/latin-300.css';
import '@fontsource/roboto/latin-400.css';
import '@fontsource/roboto/latin-500.css';
import '@fontsource/roboto/latin-700.css';

import { Shell } from './1-shell.js';

declare global {
    const REST_API_URL: string;
    const WEBSERVER_BASE_PATH: string;
}

const rootElement: HTMLDivElement = document.createElement('div');
const reactRoot: Root = createRoot(rootElement);

rootElement.style.height = '100svh';
rootElement.style.width = '100svw';
document.body.prepend(rootElement);
reactRoot.render(<Shell />);
