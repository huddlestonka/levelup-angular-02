import { Injectable } from '@angular/core';
import { Artist } from '@bba/api-interfaces';
import { ArtistsService } from '@bba/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import * as ArtistsActions from './artists.actions';

@Injectable()
export class ArtistsEffects {
  @Effect() loadArtists$ = this.actions$.pipe(
    ofType(ArtistsActions.loadArtists),
    fetch({
      run: (action) =>
        this.artistsService
          .all()
          .pipe(
            map((artists: Artist[]) =>
              ArtistsActions.loadArtistsSuccess({ artists })
            )
          ),
      onError: (action, error) => ArtistsActions.loadArtistsFailure({ error }),
    })
  );

  @Effect() loadArtist$ = this.actions$.pipe(
    ofType(ArtistsActions.loadArtist),
    fetch({
      run: (action) =>
        this.artistsService
          .find(action.artistId)
          .pipe(
            map((artist: Artist) =>
              ArtistsActions.loadArtistSuccess({ artist })
            )
          ),
      onError: (action, error) => ArtistsActions.loadArtistFailure({ error }),
    })
  );

  @Effect() createArtist$ = this.actions$.pipe(
    ofType(ArtistsActions.createArtist),
    pessimisticUpdate({
      run: (action) =>
        this.artistsService
          .create(action.artist)
          .pipe(
            map((artist: Artist) =>
              ArtistsActions.createArtistSuccess({ artist })
            )
          ),
      onError: (action, error) => ArtistsActions.createArtistFailure({ error }),
    })
  );

  @Effect() updateArtist$ = this.actions$.pipe(
    ofType(ArtistsActions.updateArtist),
    pessimisticUpdate({
      run: (action) =>
        this.artistsService
          .update(action.artist)
          .pipe(
            map((artist: Artist) =>
              ArtistsActions.updateArtistSuccess({ artist })
            )
          ),
      onError: (action, error) => ArtistsActions.updateArtistFailure({ error }),
    })
  );

  @Effect() deleteArtist$ = this.actions$.pipe(
    ofType(ArtistsActions.deleteArtist),
    pessimisticUpdate({
      run: (action) =>
        this.artistsService
          .delete(action.artist)
          .pipe(
            map((artist: Artist) =>
              ArtistsActions.deleteArtistSuccess({ artist })
            )
          ),
      onError: (action, error) => ArtistsActions.deleteArtistFailure({ error }),
    })
  );

  constructor(
    private actions$: Actions,
    private artistsService: ArtistsService
  ) {}
}
