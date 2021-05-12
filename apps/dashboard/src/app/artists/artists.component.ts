import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '@bba/api-interfaces';
import { ArtistsFacade } from '@bba/core-state';

@Component({
  selector: 'bba-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
})
export class ArtistsComponent implements OnInit {
  artists$: Observable<Artist[]> = this.artistsFacade.allArtists$;
  selectedArtist$ = this.artistsFacade.selectedArtist$;

  constructor(private artistsFacade: ArtistsFacade) {}

  ngOnInit(): void {
    this.loadArtists();
    this.artistsFacade.mutations$.subscribe((_) => this.reset());
  }

  reset() {
    this.loadArtists();
    this.artistsFacade.selectArtist(null);
  }

  resetForm() {
    this.artistsFacade.selectArtist(null);
  }

  loadArtists() {
    this.artistsFacade.loadArtists();
  }

  selectArtist(artist: Artist) {
    this.artistsFacade.selectArtist(artist.id);
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
