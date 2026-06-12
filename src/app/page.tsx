"use client";
import { Box } from "@mui/material";
import { ListItem } from "./components/ListItem";
import { useEffect, useState } from "react";
import { Character } from "./types/types";
import { characterService } from "./api/character.service";
import { NoData } from "./components/NoData";
import { DetailsModal } from "./components/DetailsModal";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);

  const getCharacters = async() => {
    const { data } = await characterService.getAll(1);
    const { results } = data;
    setCharacters(results);
  }

  useEffect(() => {
    getCharacters();
  }, []);

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
    </>
  );
}
