"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Character, FavoriteContextType } from "../types/types";
import { storage } from "../utils/storage";

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<Character[]>([]);
    const [search, setSearchState] = useState<string | null>(null);
    const [hydrated, setHydrated] = useState<boolean>(false);

    useEffect(() => {
        setFavorites(storage.getFavorites());
        setSearchState(storage.getSearch());
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (!hydrated) return;
        storage.setFavorites(favorites);
    }, [favorites, hydrated]);

    const setSearch = (val: string) => {
        const normalized = val || null;
        setSearchState(normalized);
        storage.setSearch(normalized);
    };

    const addOne = (char: Character) => setFavorites(prev => prev.some(c => c.id === char.id) ? prev : [...prev, char]);
    const removeOne = (char: Character) => setFavorites(prev => prev.filter(c => c.id !== char.id));
    const exists = (char: Character) => favorites.some(c => c.id === char.id);

    return (
        <FavoriteContext.Provider value={{ favorites, addOne, removeOne, exists, search, setSearch }}>
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