import { TestBed } from '@angular/core/testing';
import { ActionsSubject } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ArtistsFacade } from './artists.facade';
import * as ArtistsActions from './artists.actions';
import { initialArtistsState } from './artists.reducer';

import { mockArtist } from '@bba/testing';

describe('ArtistsFacade', () => {
  let facade: ArtistsFacade;
  let actionSubject;
  const mockActionsSubject = new ActionsSubject();
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArtistsFacade,
        provideMockStore({ initialState: initialArtistsState }),
        { provide: ActionsSubject, useValue: mockActionsSubject },
      ],
    });

    facade = TestBed.inject(ArtistsFacade);
    actionSubject = TestBed.inject(ActionsSubject);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should have mutations', (done) => {
    const action = ArtistsActions.createArtist({ artist: mockArtist });
    actionSubject.next(action);

    facade.mutations$.subscribe((result) => {
      expect(result).toBe(action);
      done();
    });
  });

  describe('should dispatch', () => {
    it('select on select(artist.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.selectArtist(mockArtist.id);

      const action = ArtistsActions.selectArtist({ selectedId: mockArtist.id });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('loadArtists on loadArtists()', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadArtists();

      const action = ArtistsActions.loadArtists();

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('loadArtist on loadArtist(artist.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadArtist(mockArtist.id);

      const action = ArtistsActions.loadArtist({ artistId: mockArtist.id });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('createArtist on createArtist(artist)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.createArtist(mockArtist);

      const action = ArtistsActions.createArtist({ artist: mockArtist });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('updateArtist on updateArtist(artist)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.updateArtist(mockArtist);

      const action = ArtistsActions.updateArtist({ artist: mockArtist });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('delete on delete(model)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.deleteArtist(mockArtist);

      const action = ArtistsActions.deleteArtist({ artist: mockArtist });

      expect(spy).toHaveBeenCalledWith(action);
    });
  });
});
