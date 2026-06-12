"use client";
import { createContext, useContext, useState } from "react";
import { Character, FavoriteContextType } from "../types/types";

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<Character[]>([]);

    const addOne = (char: Character) => setFavorites(prev => [...prev, char]);
    const removeOne = (char: Character) => setFavorites(prev => prev.filter(c => c.id !== char.id));
    const exists = (char: Character) => favorites.includes(char);

    return (
        <FavoriteContext.Provider value={{ favorites, addOne, removeOne, exists }}>
            { children }
        </FavoriteContext.Provider>
    );
}

export const useFavoriteContext = () => {
    const context = useContext(FavoriteContext);
    if (!context) {
        throw new Error("Context fuera de provider");
    }
    return context;
}