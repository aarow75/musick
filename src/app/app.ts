import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { AlbumComponent } from './components/album/album.component';
import { ArtistComponent } from './components/artist/artist.component';
import { MusicBrainzService } from './services/musicbrainz.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { IAlbumArtist, IAlbumRelease } from './models/album.model';
import { AsyncPipe } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, AlbumComponent, ArtistComponent, ToastrModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  // Using actual artist names works but the API returns some inacurrate results, so I'm using the Artist ID instead
  artists = [
    { name: 'The Beatles', id: 'b10bbbfc-cf9e-42e0-be17-e2c3e1d2600d' },
    { name: 'Legendary Pink Dots', id: '38f0dd4f-bcbb-4e7a-afae-a41a2bbf9d74' },
    { name: 'King Crimson', id: 'b38225b8-8e5f-42aa-bcdc-7bae5b5bdab3' },
    { name: 'Pink Floyd', id: '83d91898-7763-47d7-b03b-b92132375c47' },
    { name: 'Sky Cries Mary', id: 'fac20eaa-297c-4d54-a84f-e7c845a7d184' },
    { name: 'Sparks', id: 'f319b57a-a494-40f6-a467-3d196d3484e6' },
  ];

  albums: IAlbumArtist | undefined;
  currentArtist: string = '';

  faves = signal<IAlbumRelease[]>([]);

  readonly unsub$ = new Subject<void>();

  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();

  constructor(
    private readonly mbService: MusicBrainzService,
    private readonly toastr: ToastrService,
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  getAlbums(artist: any) {
    this.loadingSubject.next(true);
    this.currentArtist = artist.name;
    this.mbService
      .getAlbums(artist)
      .pipe(takeUntil(this.unsub$))
      .subscribe((r: any) => {
        this.albums = r;
        this.loadingSubject.next(false);
      });
  }

  markAsFave(album: any) {
    const index = this.faves().findIndex((item) => item.title === album.title);
    // Only add to the faves list if it's not already there
    if (index === -1) {
      this.faves.update((values) => [...values, album]);
      this.toastr.success(album.title + ' added to favorites.', 'Success');
    } else {
      this.toastr.error(album.title + ' already exists as a favorite', 'Error');
    }
  }
}
