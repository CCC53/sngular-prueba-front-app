"use client";
import { Box, Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from "next/navigation";
import { ListItem } from "../components/ListItem";
import { useFavoriteContext } from "../context/FavoriteContext";
import { useState } from "react";
import { Character } from "../types/types";
import { DetailsModal } from "../components/DetailsModal";
import { NoData } from "../components/NoData";

export default function Favoritos() {
    const router = useRouter();
    const [selectedChar, setSelectedChar] = useState<Character | null>(null);
    const { favorites } = useFavoriteContext();
    const goBack = () => {
        router.push('/')
    }

    return (
        <Box sx={{ gap: 2, p: { xs: 1.5, sm: 2 } }}>
            <Button variant="outlined" color="secondary" startIcon={<HomeIcon/>} onClick={goBack}>Volver</Button>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                    xl: 'repeat(5, 1fr)',
                },
                gap: 2,
                p: { xs: 1, sm: 3 },
                maxWidth: 1600,
                mx: 'auto',
                width: '100%',
            }}>
                {
                  favorites.length === 0 ? (
                    <Box sx={{ gridColumn: '1 / -1' }}>
                        <NoData/>
                    </Box>
                  ) : favorites.map(item => (
                    <ListItem key={item.id} char={item} handleClick={setSelectedChar}/>
                  ))
                }
            </Box>
            <DetailsModal open={selectedChar !== null} onClose={() => setSelectedChar(null)} char={selectedChar!}/>
        </Box>
    )
}