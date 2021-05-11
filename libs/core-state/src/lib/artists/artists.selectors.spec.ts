import { ArtistsEntity } from './artists.models';
import { State, artistsAdapter, initialState } from './artists.reducer';
import * as ArtistsSelectors from './artists.selectors';

describe('Artists Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getArtistsId = (it) => it['id'];
  const createArtistsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ArtistsEntity);

  let state;

  beforeEach(() => {
    state = {
      artists: artistsAdapter.setAll(
        [
          createArtistsEntity('PRODUCT-AAA'),
          createArtistsEntity('PRODUCT-BBB'),
          createArtistsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
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
      const result = ArtistsSelectors.getSelected(state);
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
