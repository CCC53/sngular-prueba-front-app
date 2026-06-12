import InfoIcon from '@mui/icons-material/Info';
import { Paper, Box, Typography } from "@mui/material"

export const NoData = () => {
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
                py: 2,
                mx: 'auto',
            }}>
                <Typography sx={{
                    fontSize: { xs: '1.2rem', sm: '1.6rem' },
                    fontWeight: 700,
                    color: 'secondary.main',
                    textAlign: 'center',
                    width: '100%'
                }}>
                    No hay registros
                </Typography>
                <InfoIcon sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }} color='secondary' />
            </Box>
        </Paper>
    )
}