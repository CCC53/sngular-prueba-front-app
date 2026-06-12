"use client";
import { Alert, Box, Pagination, Typography } from "@mui/material";
import { ListItem } from "./components/ListItem";
import { useEffect, useState } from "react";
import { Character } from "./types/types";
import { characterService } from "./api/character.service";
import { NoData } from "./components/NoData";
import { Loader } from "./components/Loader";
import { DetailsModal } from "./components/DetailsModal";
import { useFavoriteContext } from "./context/FavoriteContext";
import { storage } from "./utils/storage";
import axios from "axios";

export default function Home() {
  const { search } = useFavoriteContext();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageHydrated, setPageHydrated] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCharacters = async() => {
    setLoading(true);
    setError(null);
    try {
      const { data: { results, info: { pages } } } = await characterService.getAll(page, search);
      setCharacters(results);
      setTotalPages(pages);
    } catch (err) {
      const message = axios.isAxiosError(err) ? (err.response?.data as { error?: string })?.error ?? err.message : "Ocurrió un error al cargar los personajes";
      setError(message);
      setCharacters([]);
      setTotalPages(1);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setPage(storage.getHomePage());
    setPageHydrated(true);
  }, []);

  useEffect(() => {
    if (!pageHydrated) return;
    storage.setHomePage(page);
  }, [page, pageHydrated]);

  useEffect(() => {
    getCharacters();
  }, [page, search]);

  return (
    <>
      <Box sx={{ textAlign: 'center', pt: { xs: 3, sm: 4 }, pb: 2, px: 2, maxWidth: 1600, mx: 'auto' }}>
        <Typography
          variant="h3"
          component="h1"
          color="textPrimary"
          sx={{ fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }, fontWeight: 700, mb: 1 }}
        >
          Wubba lubba dub dub
        </Typography>
        <Typography
          variant="h6"
          component="p"
          color="textSecondary"
          sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
        >
          Base de datos de personajes de Rick y Morty
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
        p: { xs: 1.5, sm: 2 },
        maxWidth: 1600,
        mx: 'auto',
        width: '100%',
      }}>
        {
          loading ? (
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Loader/>
            </Box>
          ) : error ? (
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Alert severity="error">{error}</Alert>
            </Box>
          ) : characters.length === 0 ? (
            <Box sx={{ gridColumn: '1 / -1' }}>
              <NoData/>
            </Box>
          ) : (
            characters.map(char => (
              <ListItem key={char.id} char={char} handleClick={setSelectedChar}/>
            ))
          )
        }
      </Box>
      <DetailsModal open={selectedChar !== null} onClose={() => setSelectedChar(null)} char={selectedChar!}/>
      {!loading && !error && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4, px: 2, overflowX: 'auto' }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="secondary"
          />
        </Box>
      )}
    </>
  );
}
