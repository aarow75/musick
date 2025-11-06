import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MusicBrainzService } from './musicbrainz.service';

describe('MusicBrainzService', () => {
  let service: MusicBrainzService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MusicBrainzService],
    });

    service = TestBed.inject(MusicBrainzService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should request releases with artist id', () => {
    const artist = { id: 'abc-123' } as any;

    service.getAlbums(artist).subscribe((res) => {
      expect(res).toBeTruthy();
      expect((res as any).releases.length).toBe(1);
    });

    const req = httpMock.expectOne((r) => r.url.includes('release') && r.url.includes(`artist=${artist.id}`));
    expect(req.request.method).toBe('GET');

    // respond with mock data
    req.flush({ releases: [{ id: '1', title: 'One', date: '2020' }] });
  });
});
