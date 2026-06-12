"use client";
import { Box, Button, Pagination, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from "next/navigation";
import { ListItem } from "../components/ListItem";
import { useFavoriteContext } from "../context/FavoriteContext";
import { useEffect, useState } from "react";
import { Character } from "../types/types";
import { DetailsModal } from "../components/DetailsModal";
import { NoData } from "../components/NoData";
import { Loader } from "../components/Loader";

const PAGE_SIZE = 20;

export default function Favoritos() {
    const router = useRouter();
    const [selectedChar, setSelectedChar] = useState<Character | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const { favorites } = useFavoriteContext();

    const totalPages = Math.max(1, Math.ceil(favorites.length / PAGE_SIZE));
    const paginatedFavorites = favorites.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 200);
        return () => clearTimeout(timer);
    }, [favorites]);

    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages);
        }
    }, [favorites.length, page, totalPages]);

    const goBack = () => {
        router.push('/')
    }

    return (
        <Box sx={{ gap: 2, p: { xs: 1.5, sm: 2 } }}>
            <Button variant="outlined" color="secondary" startIcon={<HomeIcon/>} onClick={goBack}>Volver</Button>
            <Box sx={{ textAlign: 'center', pt: { xs: 2, sm: 3 }, pb: 2, px: 2, maxWidth: 1600, mx: 'auto' }}>
                <Typography
                    variant="h3"
                    component="h1"
                    color="textPrimary"
                    sx={{ fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }, fontWeight: 700 }}
                >
                    Mis favoritos
                </Typography>
            </Box>
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
                  loading ? (
                    <Box sx={{ gridColumn: '1 / -1' }}>
                        <Loader/>
                    </Box>
                  ) : favorites.length === 0 ? (
                    <Box sx={{ gridColumn: '1 / -1' }}>
                        <NoData/>
                    </Box>
                  ) : paginatedFavorites.map(item => (
                    <ListItem key={item.id} char={item} handleClick={setSelectedChar}/>
                  ))
                }
            </Box>
            {!loading && favorites.length > 0 && (
                <Box sx={{ display: "flex", justifyContent: "center", py: 4, px: 2, overflowX: 'auto' }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        color="secondary"
                    />
                </Box>
            )}
            <DetailsModal open={selectedChar !== null} onClose={() => setSelectedChar(null)} char={selectedChar!}/>
        </Box>
    )
}