import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Artist } from '@bba/api-interfaces';

@Component({
  selector: 'bba-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss'],
})
export class ArtistDetailsComponent {
  currentArtist: Artist;
  originalTitle = '';
  @Input() set artist(value: Artist) {
    if (value) this.originalTitle = `${value.title} `;
    this.currentArtist = { ...value };
  }
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
}
