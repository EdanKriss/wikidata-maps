export const UI_SPA_ROUTES = [
    '/',
    '/about',
] as const;

export type UiSpaRoute = typeof UI_SPA_ROUTES[number];
