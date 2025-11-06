import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAlbumArtist } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class MusicBrainzService {

    constructor(private readonly http: HttpClient) {}
    
    getAlbums(artist: any): Observable<IAlbumArtist> {
        return this.http.get(`https://musicbrainz.org/ws/2/release/?artist=${artist.id}&inc=recordings&limit=100`) as Observable<IAlbumArtist>;
    }

}