export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    }
    location: {
        name: string;
        url: string;
    }
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export interface ResponseListCharacter {
    info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
    }
    results: Character[];
}

export interface FavoriteContextType {
    favorites: Character[];
    addOne: (char: Character) => void;
    removeOne: (char: Character) => void;
    exists: (char: Character) => boolean;
}