import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '@bba/api-interfaces';
import { ArtistsFacade } from '@bba/core-state';

@Component({
  selector: 'bba-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
  providers: [ArtistsFacade],
})
export class ArtistsComponent implements OnInit {
  artists$: Observable<Artist[]> = this.artistsFacade.currentArtists$;
  selectedArtist$: Observable<Artist> = this.artistsFacade.selectedArtist$;

  constructor(private artistsFacade: ArtistsFacade) {}

  ngOnInit(): void {}

  resetForm() {
    this.artistsFacade.selectArtist(null);
  }

  selectArtist(artist: Artist) {
    this.artistsFacade.selectArtist(artist);
  }

  saveArtist(artist: Artist) {
    if (artist.id) {
      this.artistsFacade.updateArtist(artist);
    } else {
      this.artistsFacade.createArtist(artist);
    }
  }

  deleteArtist(artist: Artist) {
    this.artistsFacade.deleteArtist(artist);
  }
}
