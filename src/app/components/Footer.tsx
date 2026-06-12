import Image from "next/image";
import { Box, Typography } from "@mui/material";

export const Footer = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                justifyContent: { xs: 'center', sm: 'space-between' },
                gap: { xs: 1, sm: 0 },
                px: { xs: 2, sm: 5 },
                py: 2,
                backgroundColor: '#ffffff',
                borderTop: '1px solid #e0e0e0',
                textAlign: 'center',
            }}
        >
            <Image src={"https://www.drupal.org/files/Logo-Restyled_Positive_Navy.png"} width={150} height={30} alt='Logo' style={{ maxWidth: '100%', height: 'auto' }} />
            <Typography variant="h5" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.5rem' } }}>
                Carlos Calette
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.5rem' } }}>
                © {new Date().getFullYear()}
            </Typography>
        </Box>
    )
}