import { Paper, Box, CircularProgress, Typography } from "@mui/material";

export const Loader = () => {
    return (
        <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
            <Box sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: 650 },
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                px: 2,
                py: 4,
                mx: 'auto',
                gap: 2,
            }}>
                <CircularProgress color="secondary" />
                <Typography sx={{
                    fontSize: { xs: '1rem', sm: '1.2rem' },
                    fontWeight: 600,
                    color: 'secondary.main',
                    textAlign: 'center',
                }}>
                    Cargando...
                </Typography>
            </Box>
        </Paper>
    );
};
