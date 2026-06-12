import { Character } from "../types/types";

const KEYS = {
    favorites: "rick-morty-favorites",
    search: "rick-morty-search",
    homePage: "rick-morty-home-page",
};

function safeParse<T>(value: string | null, fallback: T): T {
    if (!value) return fallback;
    try {
        return JSON.parse(value) as T;
    } catch {
        return fallback;
    }
}

export const storage = {
    getFavorites(): Character[] {
        if (typeof window === "undefined") return [];
        return safeParse(localStorage.getItem(KEYS.favorites), []);
    },

    setFavorites(favorites: Character[]) {
        localStorage.setItem(KEYS.favorites, JSON.stringify(favorites));
    },

    getSearch(): string | null {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(KEYS.search);
    },

    setSearch(search: string | null) {
        if (search) {
            localStorage.setItem(KEYS.search, search);
        } else {
            localStorage.removeItem(KEYS.search);
        }
    },

    getHomePage(): number {
        if (typeof window === "undefined") return 1;
        const page = Number(localStorage.getItem(KEYS.homePage));
        return page > 0 ? page : 1;
    },

    setHomePage(page: number) {
        localStorage.setItem(KEYS.homePage, String(page));
    },
};
