import { Artist } from '@bba/api-interfaces';
import { of } from 'rxjs';

export const mockArtistsFacade = {
  loadArtists: () => {},
  selectArtist: () => {},
  deleteArtist: () => {},
  updateArtist: () => {},
  createArtist: () => {},
  mutations$: of(true),
};

export const mockArtistsService = {
  all: () => of([]),
  find: () => of({ ...mockArtist }),
  create: () => of({ ...mockArtist }),
  update: () => of({ ...mockArtist }),
  delete: () => of({ ...mockArtist }),
};

export const mockArtist: Artist = {
  id: '0',
  title: 'mock',
  genre: 'mock',
  yearsActive: 'mock',
  labels: [],
  albums: [],
  singles: [],
  members: [],
};

export const mockEmptyArtist: Artist = {
  id: null,
  title: 'mockEmpty',
  genre: 'mockEmpty',
  yearsActive: 'mockEmpty',
  labels: [],
  albums: [],
  singles: [],
  members: [],
};
