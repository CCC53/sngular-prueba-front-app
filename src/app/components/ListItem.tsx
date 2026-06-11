import Image from "next/image";
import { Box, IconButton, Typography } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export const ListItem = () => {
    return (
        <Box sx={{ backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)'}}>
            <Image
                src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                alt="Nombre"
                width={300}
                height={300}
                style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
                <Typography variant="subtitle1" noWrap>
                    Rick Sanchez
                </Typography>
                <IconButton size="small">
                    <StarBorderIcon color="secondary"/>
                </IconButton>
            </Box>
        </Box>
    )
}