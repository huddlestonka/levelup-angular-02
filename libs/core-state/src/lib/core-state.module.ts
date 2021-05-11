import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromArtists from './artists/artists.reducer';
import { ArtistsEffects } from './artists/artists.effects';
import { ArtistsFacade } from './artists/artists.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromArtists.ARTISTS_FEATURE_KEY,
      fromArtists.reducer
    ),
    EffectsModule.forFeature([ArtistsEffects]),
  ],
  providers: [ArtistsFacade],
})
export class CoreStateModule {}
