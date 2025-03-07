import { type ComponentProps, type FunctionComponent } from 'react';
import {
    Button,
    CircularProgress,
} from "@mui/material";

export const LoadingButton: FunctionComponent<
    { loading: boolean; } & ComponentProps<typeof Button>
> = ({
    loading,
    ...rest
}) => {
    return (
        <Button
            color='primary'
            variant='contained'
            {...rest}
            disabled={rest.disabled || loading}
        >
            {
                loading
                ? <CircularProgress size={20} />
                : rest.children
            }
        </Button>
    );
};
