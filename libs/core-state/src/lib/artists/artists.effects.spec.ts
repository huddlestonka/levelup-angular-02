import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot, cold } from '@nrwl/angular/testing';

import { Observable } from 'rxjs';

import { ArtistsEffects } from './artists.effects';
import * as ArtistsActions from './artists.actions';
import { ArtistsService } from '@bba/core-data';

import { mockArtistsService, mockArtist } from '@bba/testing';
import { Artist } from '@bba/api-interfaces';

describe('ArtistsEffects', () => {
  let actions: Observable<any>;
  let effects: ArtistsEffects;
  let service: ArtistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ArtistsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        { provide: ArtistsService, useValue: mockArtistsService },
      ],
    });

    effects = TestBed.inject(ArtistsEffects);
    service = TestBed.inject(ArtistsService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadArtists$', () => {
    it('should return loadArtistsSuccess, on success', () => {
      const artists: Artist[] = [];
      const action = ArtistsActions.loadArtists();
      const outcome = ArtistsActions.loadArtistsSuccess({ artists });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: artists });
      const expected = cold('--b', { b: outcome });
      service.all = jest.fn(() => response);

      expect(effects.loadArtists$).toBeObservable(expected);
    });

    it('should return loadArtistsFailure, on failure', () => {
      const action = ArtistsActions.loadArtists();
      const error = new Error();
      const outcome = ArtistsActions.loadArtistsFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.all = jest.fn(() => response);

      expect(effects.loadArtists$).toBeObservable(expected);
    });
  });

  describe('loadArtist$', () => {
    it('should return success with artist', () => {
      const artist = { ...mockArtist };
      const action = ArtistsActions.loadArtist({ artistId: artist.id });
      const outcome = ArtistsActions.loadArtistSuccess({ artist });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: artist });
      const expected = cold('--b', { b: outcome });
      service.find = jest.fn(() => response);

      expect(effects.loadArtist$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const artist = { ...mockArtist };
      const action = ArtistsActions.loadArtist({ artistId: artist.id });
      const error = new Error();
      const outcome = ArtistsActions.loadArtistFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.find = jest.fn(() => response);

      expect(effects.loadArtist$).toBeObservable(expected);
    });
  });

  describe('createArtist$', () => {
    it('should return success with artist', () => {
      const artist = { ...mockArtist };
      const action = ArtistsActions.createArtist({ artist });
      const outcome = ArtistsActions.createArtistSuccess({ artist });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: artist });
      const expected = cold('--b', { b: outcome });
      service.create = jest.fn(() => response);

      expect(effects.createArtist$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const artist = { ...mockArtist };
      const action = ArtistsActions.createArtist({ artist });
      const error = new Error();
      const outcome = ArtistsActions.createArtistFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.create = jest.fn(() => response);

      expect(effects.createArtist$).toBeObservable(expected);
    });
  });

  describe('updateArtist$', () => {
    it('should return success with artist', () => {
      const artist = { ...mockArtist };
      const action = ArtistsActions.updateArtist({ artist });
      const outcome = ArtistsActions.updateArtistSuccess({ artist });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: artist });
      const expected = cold('--b', { b: outcome });
      service.update = jest.fn(() => response);

      expect(effects.updateArtist$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const artist = { ...mockArtist };
      const action = ArtistsActions.updateArtist({ artist });
      const error = new Error();
      const outcome = ArtistsActions.updateArtistFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.update = jest.fn(() => response);

      expect(effects.updateArtist$).toBeObservable(expected);
    });
  });

  describe('deleteArtist$', () => {
    it('should return success with artist', () => {
      const artist = { ...mockArtist };
      const action = ArtistsActions.deleteArtist({ artist });
      const outcome = ArtistsActions.deleteArtistSuccess({ artist });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: artist });
      const expected = cold('--b', { b: outcome });
      service.delete = jest.fn(() => response);

      expect(effects.deleteArtist$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const artist = { ...mockArtist };
      const action = ArtistsActions.deleteArtist({ artist });
      const error = new Error();
      const outcome = ArtistsActions.deleteArtistFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.delete = jest.fn(() => response);

      expect(effects.deleteArtist$).toBeObservable(expected);
    });
  });
});
