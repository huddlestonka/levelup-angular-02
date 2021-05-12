import * as ArtistsActions from './artists.actions';
import {
  ArtistsState,
  initialArtistsState,
  artistsReducer,
} from './artists.reducer';
import { mockArtist, mockEmptyArtist } from '@bba/testing';

describe('Artists Reducer', () => {
  let artists;

  beforeEach(() => {
    artists = [
      { ...mockArtist, id: '0' },
      { ...mockArtist, id: '1' },
      { ...mockArtist, id: '2' },
    ];
  });

  describe('valid Artists actions', () => {
    it('loadArtists should set loaded to false', () => {
      const action = ArtistsActions.loadArtists();
      const expectedState = {
        ...initialArtistsState,
        error: null,
      };

      const result: ArtistsState = artistsReducer(initialArtistsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadArtistsSuccess should set the list of known Artists', () => {
      const action = ArtistsActions.loadArtistsSuccess({ artists });
      const expectedState = {
        ...initialArtistsState,
        loaded: true,
        entities: {
          0: artists[0],
          1: artists[1],
          2: artists[2],
        },
        ids: artists.map((artist) => artist.id),
      };

      const result: ArtistsState = artistsReducer(initialArtistsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadArtistsFailure should set error to error', () => {
      const error = new Error();
      const action = ArtistsActions.loadArtistsFailure({ error });
      const expectedState = {
        ...initialArtistsState,
        error,
      };

      const result: ArtistsState = artistsReducer(initialArtistsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadArtist should set loaded to false', () => {
      const action = ArtistsActions.loadArtist({ artistId: mockArtist.id });
      const expectedState = {
        ...initialArtistsState,
        loaded: false,
        error: null,
      };

      const result: ArtistsState = artistsReducer(initialArtistsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadArtistSuccess should set loaded to true', () => {
      const action = ArtistsActions.loadArtistSuccess({ artist: mockArtist });
      const expectedState = {
        ...initialArtistsState,
        loaded: true,
        entities: {
          0: mockArtist,
        },
        ids: [mockArtist.id],
      };

      const result: ArtistsState = artistsReducer(initialArtistsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadArtistFailure should set error to error', () => {
      const error = new Error();
      const action = ArtistsActions.loadArtistFailure({ error });
      const expectedState = {
        ...initialArtistsState,
        error,
      };

      const result: ArtistsState = artistsReducer(initialArtistsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('updateArtistSuccess should modify artist', () => {
      const prepAction = ArtistsActions.loadArtistSuccess({
        artist: { ...mockEmptyArtist, id: mockArtist.id },
      });
      const prepState: ArtistsState = artistsReducer(
        initialArtistsState,
        prepAction
      );

      const expectedState = {
        ...initialArtistsState,
        loaded: true,
        entities: {
          0: mockArtist,
        },
        ids: [mockArtist.id],
      };

      const action = ArtistsActions.updateArtistSuccess({ artist: mockArtist });
      const result: ArtistsState = artistsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('updateArtistFailure should set error to error', () => {
      const error = new Error();
      const action = ArtistsActions.updateArtistFailure({ error });
      const expectedState = {
        ...initialArtistsState,
        error,
      };

      const result: ArtistsState = artistsReducer(initialArtistsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('createArtistSuccess should add artist', () => {
      const action = ArtistsActions.createArtistSuccess({ artist: mockArtist });
      const expectedState = {
        ...initialArtistsState,
        loaded: false,
        entities: {
          0: mockArtist,
        },
        ids: [mockArtist.id],
      };

      const result: ArtistsState = artistsReducer(initialArtistsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('createArtistFailure should set error to error', () => {
      const error = new Error();
      const action = ArtistsActions.createArtistFailure({ error });
      const expectedState = {
        ...initialArtistsState,
        error,
      };

      const result: ArtistsState = artistsReducer(initialArtistsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('deleteArtistSuccess should add artist', () => {
      const prepAction = ArtistsActions.loadArtistSuccess({
        artist: mockArtist,
      });
      const prepState: ArtistsState = artistsReducer(
        initialArtistsState,
        prepAction
      );

      const expectedState = {
        ...initialArtistsState,
        loaded: true,
      };

      const action = ArtistsActions.deleteArtistSuccess({ artist: mockArtist });
      const result: ArtistsState = artistsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('deleteArtistFailure should set error to error', () => {
      const error = new Error();
      const action = ArtistsActions.deleteArtistFailure({ error });
      const expectedState = {
        ...initialArtistsState,
        error,
      };

      const result: ArtistsState = artistsReducer(initialArtistsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('selectArtist should set selectedId', () => {
      const action = ArtistsActions.selectArtist({ selectedId: mockArtist.id });
      const expectedState = {
        ...initialArtistsState,
        selectedId: mockArtist.id,
      };

      const result: ArtistsState = artistsReducer(initialArtistsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('resetSelectedArtist should reset selectedId', () => {
      const prepAction = ArtistsActions.selectArtist({
        selectedId: mockArtist.id,
      });
      const prepState = artistsReducer(initialArtistsState, prepAction);

      const action = ArtistsActions.resetSelectedArtist();
      const expectedState = {
        ...initialArtistsState,
        selectedId: null,
      };

      const result: ArtistsState = artistsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('resetArtists should reset artists', () => {
      const prepAction = ArtistsActions.loadArtistsSuccess({ artists });
      const prepState: ArtistsState = artistsReducer(
        initialArtistsState,
        prepAction
      );

      const expectedState = {
        ...initialArtistsState,
        loaded: true,
      };

      const action = ArtistsActions.resetArtists();
      const result: ArtistsState = artistsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result: ArtistsState = artistsReducer(initialArtistsState, action);

      expect(result).toBe(initialArtistsState);
    });
  });
});
