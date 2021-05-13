import { Component, OnInit } from '@angular/core';
import { ArtistsFacade } from '@bba/core-state';

@Component({
  selector: 'bba-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  artists$ = this.artistsFacade.allArtists$;

  constructor(private artistsFacade: ArtistsFacade) {}

  ngOnInit(): void {
    this.artistsFacade.loadArtists();
  }
}
