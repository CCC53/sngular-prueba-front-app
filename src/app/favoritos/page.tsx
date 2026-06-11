"use client";
import { Box, Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from "next/navigation";
import { ListItem } from "../components/ListItem";

export default function Favoritos() {
    const router = useRouter();

    const arr = [1,2,3,4,5,6];
    const goBack = () => {
        router.push('/')
    }

    return (
        <Box sx={{ gap: 2, p: 2 }}>
            <Button variant="outlined" color="secondary" startIcon={<HomeIcon/>} onClick={goBack}>Volver</Button>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2, p: 3}}>
                {
                  arr.map(item => (
                    <ListItem key={item}/>
                  ))
                }
            </Box>
        </Box>
    )
}