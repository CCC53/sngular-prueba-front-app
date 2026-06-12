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
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2, p: 2}}>
        {
          characters.length === 0 ? <NoData/> : (
            characters.map(char => (
              <ListItem key={char.id} char={char} handleClick={setSelectedChar}/>
            ))
          )
        }
      </Box>
      <DetailsModal open={selectedChar !== null} onClose={() => setSelectedChar(null)} char={selectedChar!}/>
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
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
