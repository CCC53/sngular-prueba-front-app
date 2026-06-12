"use client";
import { Box, Pagination } from "@mui/material";
import { ListItem } from "./components/ListItem";
import { useEffect, useState } from "react";
import { Character } from "./types/types";
import { characterService } from "./api/character.service";
import { NoData } from "./components/NoData";
import { DetailsModal } from "./components/DetailsModal";
import { useFavoriteContext } from "./context/FavoriteContext";

export default function Home() {
  const { search } = useFavoriteContext();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);

  const getCharacters = async() => {
    const { data: { results, info: { pages } } } = await characterService.getAll(page, search);
    setCharacters(results);
    setTotalPages(pages);
  }

  useEffect(() => {
    getCharacters();
  }, [page, search]);

  return (
    <>
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
          characters.length === 0 ? (
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
      <Box sx={{ display: "flex", justifyContent: "center", py: 4, px: 2, overflowX: 'auto' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="secondary"
        />
      </Box>
    </>
  );
}
