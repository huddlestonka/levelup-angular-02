import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as ArtistsActions from './artists.actions';
import * as ArtistsFeature from './artists.reducer';
import * as ArtistsSelectors from './artists.selectors';

@Injectable()
export class ArtistsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ArtistsSelectors.getArtistsLoaded));
  allArtists$ = this.store.pipe(select(ArtistsSelectors.getAllArtists));
  selectedArtists$ = this.store.pipe(select(ArtistsSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ArtistsActions.init());
  }
}
