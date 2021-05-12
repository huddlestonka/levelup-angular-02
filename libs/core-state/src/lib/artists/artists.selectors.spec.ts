import {
  ArtistsState,
  artistsAdapter,
  initialArtistsState,
} from './artists.reducer';
import * as ArtistsSelectors from './artists.selectors';

import { Artist } from '@bba/api-interfaces';
import { mockArtist } from '@bba/testing';

describe('Artists Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getArtistsId = (it) => it['id'];
  const createArtist = (id: string, name = '') =>
    ({ ...mockArtist, id: id } as Artist);

  let state;

  beforeEach(() => {
    state = {
      artists: artistsAdapter.setAll(
        [
          createArtist('PRODUCT-AAA'),
          createArtist('PRODUCT-BBB'),
          createArtist('PRODUCT-CCC'),
        ],
        {
          ...initialArtistsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Artists Selectors', () => {
    it('getAllArtists() should return the list of Artists', () => {
      const results = ArtistsSelectors.getAllArtists(state);
      const selId = getArtistsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ArtistsSelectors.getSelectedArtist(state);
      const selId = getArtistsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getArtistsLoaded() should return the current 'loaded' status", () => {
      const result = ArtistsSelectors.getArtistsLoaded(state);

      expect(result).toBe(true);
    });

    it("getArtistsError() should return the current 'error' state", () => {
      const result = ArtistsSelectors.getArtistsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
