export interface BaseEntity {
  id: string | null;
  title?: string | null;
}

export interface Artist extends BaseEntity {
  title: string;
  genre: string;
  description: string;
  yearsActive: string;
  labels?: Label[];
  albums?: Album[];
  songs: Song[];
  members?: string;
}

export interface Album extends BaseEntity {
  title: string;
  songs: Song[];
  awards?: string;
}

export interface Song extends BaseEntity {
  title: string;
  duration: string;
  bpm: string;
  signature: string;
  key: string;
}

export interface Label extends BaseEntity {
  title: string;
}
