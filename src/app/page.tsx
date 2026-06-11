"use client";
import { Box } from "@mui/material";
import { ListItem } from "./components/ListItem";

export default function Home() {
  const arr = [1, 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2, p: 2}}>
    {
      arr.map(item => (
        <ListItem key={item}/>
      ))
    }
    </Box>
  );
}
