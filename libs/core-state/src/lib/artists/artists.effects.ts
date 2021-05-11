import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as ArtistsFeature from './artists.reducer';
import * as ArtistsActions from './artists.actions';

@Injectable()
export class ArtistsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtistsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ArtistsActions.loadArtistsSuccess({ artists: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ArtistsActions.loadArtistsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
