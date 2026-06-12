import Image from "next/image";
import { Character } from "../types/types";
import StarIcon from '@mui/icons-material/Star';
import { Box, IconButton, Typography } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useFavoriteContext } from "../context/FavoriteContext";

export const ListItem = ({ char, handleClick }: { char: Character, handleClick: (char: Character) => void }) => {
    const { addOne, exists, removeOne } = useFavoriteContext();

    return (
        <Box sx={{ backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)'}}>
            <Image onClick={() => handleClick(char)} src={char.image} alt="Nombre" width={300} height={300} style={{ width: '100%', height: 'auto', display: 'block', cursor: 'pointer' }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
                <Typography variant="subtitle1" noWrap>
                    { char.name }
                </Typography>
                {
                    exists(char) ? (
                        <IconButton size="small" onClick={() => removeOne(char)}>
                            <StarIcon color="secondary"/>
                        </IconButton>
                    ) : (
                        <IconButton size="small" onClick={() => addOne(char)}>
                            <StarBorderIcon color="secondary"/>
                        </IconButton>
                    )
                }
            </Box>
        </Box>
    )
}