import { ResponseListCharacter } from "../types/types";
import { apiClient } from "./apiClient"

export const characterService = {
    getAll(page: number, name: string | null) {
        const endpoint = name ? `/character?page=${page}&name=${name}` : `/character?page=${page}`
        return apiClient.get<ResponseListCharacter>(endpoint);
    }
}