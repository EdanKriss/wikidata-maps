import { createContext, useEffect, useState } from 'react';
import type { FunctionComponent, PropsWithChildren } from 'react';
import debounce from '@mui/material/utils/debounce';

export interface LayoutObject {
    height: number;
    width: number;
}

export const LayoutContext = createContext<LayoutObject>({
    height: 0,
    width: 0,
});

export const LayoutProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const [layout, setLayout] = useState<LayoutObject>(getLayoutDimensions);

    useEffect(() => {
        const callback = debounce(() => setLayout(getLayoutDimensions()), 200);
        window.addEventListener('resize', callback);
        return () => {
            window.removeEventListener('resize', callback);
        };
    }, [ setLayout ]);

    return (
        <LayoutContext.Provider value={layout} {...props} />
    );
};

function getLayoutDimensions (): LayoutObject {
    const { innerHeight = 0, innerWidth = 0 } = window;
    return { 
        height: innerHeight, 
        width : innerWidth,
    };
}
