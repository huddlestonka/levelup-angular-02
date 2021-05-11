import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { ArtistsEffects } from './artists.effects';
import * as ArtistsActions from './artists.actions';

describe('ArtistsEffects', () => {
  let actions: Observable<any>;
  let effects: ArtistsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ArtistsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ArtistsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ArtistsActions.init() });

      const expected = hot('-a-|', {
        a: ArtistsActions.loadArtistsSuccess({ artists: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
