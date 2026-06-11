import Image from "next/image";
import { Box, Typography } from "@mui/material";

export const Footer = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 5, py: 2, backgroundColor: '#ffffff', borderTop: '1px solid #e0e0e0'}}>
            <Image src={"https://www.drupal.org/files/Logo-Restyled_Positive_Navy.png"} width={150} height={30} alt='Logo' />
            <Typography variant="h5" color="text.secondary">
                Carlos Calette
            </Typography>
            <Typography variant="h5" color="text.secondary">
                © {new Date().getFullYear()}
            </Typography>
        </Box>
    )
}