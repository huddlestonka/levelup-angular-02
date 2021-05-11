import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistDetailsComponent } from './artists/artist-details/artist-details.component';
import { ArtistsListComponent } from './artists/artists-list/artists-list.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, ArtistsComponent, ArtistDetailsComponent, ArtistsListComponent, HomeComponent],
  imports: [BrowserModule, BrowserAnimationsModule, StoreModule.forRoot({}, {})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
