export interface BaseEntity {
  id: string | null;
  title?: string | null;
}

export interface Artist extends BaseEntity {
  title: string;
  genre: string;
  yearsActive: string;
  labels?: Label[];
  albums?: Album[];
  singles?: Singles[];
  members?: string[];
}

export interface Album extends BaseEntity {
  title: string;
  songs: string[];
  awards?: string[];
  year: string;
}

export interface Singles extends BaseEntity {
  title: string;
  duration: string;
  bpm: string;
  signature: string;
  key: string;
}

export interface Label extends BaseEntity {
  title: string;
}
