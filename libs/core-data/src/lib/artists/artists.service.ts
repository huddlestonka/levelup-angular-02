import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Artist } from '@bba/api-interfaces';
import { environment } from '@env/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  model = 'artists';

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<Artist[]>(this.getUrl());
  }

  find(id: string) {
    return this.http.get<Artist>(this.getUrlWithId(id));
  }

  create(artist: Artist) {
    return this.http.post(this.getUrl(), artist, { headers: headers });
  }

  update(artist: Artist) {
    return this.http.put(this.getUrlWithId(artist.id), artist, {
      headers: headers,
    });
  }

  delete(artist: Artist) {
    return this.http.delete(this.getUrlWithId(artist.id));
  }

  private getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  private getUrlWithId(id) {
    return `${this.getUrl()}/${id}`;
  }
}
