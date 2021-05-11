import { ArtistsEntity } from './artists.models';
import * as ArtistsActions from './artists.actions';
import { State, initialState, reducer } from './artists.reducer';

describe('Artists Reducer', () => {
  const createArtistsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ArtistsEntity);

  beforeEach(() => {});

  describe('valid Artists actions', () => {
    it('loadArtistsSuccess should return set the list of known Artists', () => {
      const artists = [
        createArtistsEntity('PRODUCT-AAA'),
        createArtistsEntity('PRODUCT-zzz'),
      ];
      const action = ArtistsActions.loadArtistsSuccess({ artists });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
