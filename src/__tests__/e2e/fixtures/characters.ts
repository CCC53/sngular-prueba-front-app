import { Character, ResponseListCharacter } from '@/app/types/types';

export const mockRick: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
  location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
};

export const mockMorty: Character = {
  id: 2,
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'unknown', url: '' },
  location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: 'https://rickandmortyapi.com/api/character/2',
  created: '2017-11-04T18:50:21.651Z',
};

export const mockSummer: Character = {
  id: 3,
  name: 'Summer Smith',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Female',
  origin: { name: 'Earth (Replacement Dimension)', url: 'https://rickandmortyapi.com/api/location/20' },
  location: { name: 'Earth (Replacement Dimension)', url: 'https://rickandmortyapi.com/api/location/20' },
  image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/6'],
  url: 'https://rickandmortyapi.com/api/character/3',
  created: '2017-11-04T19:09:56.428Z',
};

export const pageOneResponse: ResponseListCharacter = {
  info: { count: 3, pages: 2, next: 'https://rickandmortyapi.com/api/character?page=2', prev: '' },
  results: [mockRick, mockMorty],
};

export const pageTwoResponse: ResponseListCharacter = {
  info: { count: 3, pages: 2, next: '', prev: 'https://rickandmortyapi.com/api/character?page=1' },
  results: [mockSummer],
};

export const searchRickResponse: ResponseListCharacter = {
  info: { count: 1, pages: 1, next: '', prev: '' },
  results: [mockRick],
};

export const emptySearchResponse: ResponseListCharacter = {
  info: { count: 0, pages: 0, next: '', prev: '' },
  results: [],
};
