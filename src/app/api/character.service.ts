import { ResponseListCharacter } from "../types/types";
import { apiClient } from "./apiClient"

export const characterService = {
    getAll(page: number) {
        return apiClient.get<ResponseListCharacter>(`/character?page=${page}`);
    }
}