import { Injectable } from '@angular/core';
import { Artist } from '@bba/api-interfaces';
import { Action, ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import * as ArtistsActions from './artists.actions';
import * as fromArtists from './artists.reducer';
import * as ArtistsSelectors from './artists.selectors';

@Injectable({
  providedIn: 'root',
})
export class ArtistsFacade {
  loaded$ = this.store.pipe(select(ArtistsSelectors.getArtistsLoaded));
  allArtists$ = this.store.pipe(select(ArtistsSelectors.getAllArtists));
  selectedArtist$ = this.store.pipe(select(ArtistsSelectors.getSelectedArtist));

  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type === ArtistsActions.createArtist({} as any).type ||
        action.type === ArtistsActions.updateArtist({} as any).type ||
        action.type === ArtistsActions.deleteArtist({} as any).type
    )
  );

  constructor(
    private store: Store<fromArtists.ArtistsPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectArtist(selectedId: string) {
    this.dispatch(ArtistsActions.selectArtist({ selectedId }));
  }

  loadArtists() {
    this.dispatch(ArtistsActions.loadArtists());
  }

  loadArtist(artistId: string) {
    this.dispatch(ArtistsActions.loadArtist({ artistId }));
  }

  createArtist(artist: Artist) {
    this.dispatch(
      ArtistsActions.createArtist({
        artist: Object.assign({}, artist, { id: uuidv4() }),
      })
    );
  }

  updateArtist(artist: Artist) {
    this.dispatch(ArtistsActions.updateArtist({ artist }));
  }

  deleteArtist(artist: Artist) {
    this.dispatch(ArtistsActions.deleteArtist({ artist }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
