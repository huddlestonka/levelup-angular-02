import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
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
  @Output() albumAdded = new EventEmitter();

  checkAlbums() {
    if (this.currentArtist.albums?.length) {
      const albums = this.currentArtist.albums.filter((x) => x !== null);
      if (albums.length) return true;
    }
    return false;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add album title
    if ((value || '').trim()) {
      let newAlbum: Album = { id: uuidv4(), title: value.trim() };
      newAlbum = Object.assign({}, newAlbum);
      this.currentArtist.albums = [...this.currentArtist.albums, newAlbum];
      for (let index = 0; index < this.currentArtist.albums.length; index++) {
        const element = this.currentArtist.albums[index];
      }
      this.albumAdded.emit(this.currentArtist);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(id: string): void {
    if (id === null || id === undefined) return;
    this.currentArtist.albums = this.currentArtist.albums.filter(
      (a) => a.id !== id
    );
  }
}
