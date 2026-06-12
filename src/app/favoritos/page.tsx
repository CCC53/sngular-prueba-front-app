"use client";
import { Box, Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from "next/navigation";
import { ListItem } from "../components/ListItem";
import { useFavoriteContext } from "../context/FavoriteContext";

export default function Favoritos() {
    const router = useRouter();
    const { removeOne, favorites } = useFavoriteContext();
    const goBack = () => {
        router.push('/')
    }

    return (
        <Box sx={{ gap: 2, p: 2 }}>
            <Button variant="outlined" color="secondary" startIcon={<HomeIcon/>} onClick={goBack}>Volver</Button>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2, p: 3}}>
                {
                  favorites.map(item => (
                    <ListItem key={item.id} char={item}/>
                  ))
                }
            </Box>
        </Box>
    )
}