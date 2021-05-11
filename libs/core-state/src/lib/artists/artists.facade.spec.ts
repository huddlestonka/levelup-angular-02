import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { ArtistsEntity } from './artists.models';
import { ArtistsEffects } from './artists.effects';
import { ArtistsFacade } from './artists.facade';

import * as ArtistsSelectors from './artists.selectors';
import * as ArtistsActions from './artists.actions';
import {
  ARTISTS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './artists.reducer';

interface TestSchema {
  artists: State;
}

describe('ArtistsFacade', () => {
  let facade: ArtistsFacade;
  let store: Store<TestSchema>;
  const createArtistsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ArtistsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(ARTISTS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ArtistsEffects]),
        ],
        providers: [ArtistsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(ArtistsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allArtists$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allArtists$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadArtistsSuccess` to manually update list
     */
    it('allArtists$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allArtists$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          ArtistsActions.loadArtistsSuccess({
            artists: [createArtistsEntity('AAA'), createArtistsEntity('BBB')],
          })
        );

        list = await readFirst(facade.allArtists$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
