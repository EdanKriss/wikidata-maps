import { closeSnackbar, enqueueSnackbar, type SnackbarOrigin, type VariantType } from 'notistack';

export async function showNotification(
    message: string,
    severity: VariantType,
    verticlePosition: SnackbarOrigin['vertical'] = 'top',
) {
    enqueueSnackbar({
        message,
        variant: severity,
        action: (id) => {
            return <span style={{ fontSize: '26px' }} onClick={() => { closeSnackbar(id) }}>✕</span>;
        },
        autoHideDuration: 3000,
        anchorOrigin: { horizontal: 'right', vertical: verticlePosition },
    });
}

export async function catchBlockNotification(error: unknown) {
    console.error(error);
    enqueueSnackbar({
        message: error && typeof error === 'object' && 'message' in error && typeof error['message'] === 'string'
            ? error['message']
            : 'Unknown Error',
        variant: 'error',
        action: (id) => {
            return <span style={{ fontSize: '26px' }} onClick={() => { closeSnackbar(id) }}>✕</span>;
        },
        autoHideDuration: 5000,
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
    });
}
