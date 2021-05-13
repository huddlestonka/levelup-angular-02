import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Album, Artist } from '@bba/api-interfaces';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'bba-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss'],
})
export class ArtistDetailsComponent {
  currentArtist: Artist;
  originalTitle = '';
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() set artist(value: Artist) {
    if (value) this.originalTitle = `${value.title} `;
    this.currentArtist = { ...value };
  }
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  checkAlbums() {
    return (
      [null, undefined, ''].includes(this.currentArtist.id) ||
      this.currentArtist.albums?.length > 0
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add album title
    if (value) {
      let newAlbum: Album = { id: uuidv4(), title: value.trim() };
      newAlbum = Object.assign({}, newAlbum);
      if (this.currentArtist.albums?.length > 0) {
        this.currentArtist.albums = [...this.currentArtist.albums, newAlbum];
      } else {
        this.currentArtist.albums = [newAlbum];
      }
    }

    // Reset the input value
    if (event.input) {
      event.input.value = '';
    }
  }

  remove(id: string): void {
    if (id === null || id === undefined) return;
    this.currentArtist.albums = this.currentArtist.albums.filter(
      (a) => a.id !== id
    );
  }
}
