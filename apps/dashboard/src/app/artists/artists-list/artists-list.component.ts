import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Artist } from '@bba/api-interfaces';

@Component({
  selector: 'bba-artists-list',
  templateUrl: './artists-list.component.html',
  styleUrls: ['./artists-list.component.scss'],
})
export class ArtistsListComponent {
  @Input() artists: Artist[];
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
