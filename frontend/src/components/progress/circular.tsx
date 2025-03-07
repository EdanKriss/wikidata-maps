import type { FunctionComponent } from 'react';
import type { SxProps } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import type { CircularProgressProps } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const Spinner: FunctionComponent<
    Omit<CircularProgressProps, 'variant' | 'value'>
    & {
        label?: string;
        boxSx?: SxProps;
    }
> = ({ boxSx, label, ...props }) => {
    return (
        <Box sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            ...boxSx,
        }}>
            {
                label &&
                <Typography
                    variant="subtitle1"
                    component="div"
                    color="text.secondary"
                    fontSize={'1.5rem'}
                    sx={{ marginBottom: '16px' }}
                >
                    {label}
                </Typography>
            }
            <CircularProgress {...props} />
        </Box>
    );
};

export const DeterminateSpinner: FunctionComponent<
    Omit<CircularProgressProps, 'variant'>
    & {
        value: number;
        boxSx?: SxProps;
    }
> = ({ boxSx, ...props }) => {
    return (
        <Box sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...boxSx,
        }}>
            <CircularProgress variant="determinate" {...props} />
            <Typography
                variant="caption"
                component="div"
                color="text.secondary"
                sx={{ position: 'absolute' }}
            >
                {`${Math.round(props.value)}%`}
            </Typography>
        </Box>
    );
};
