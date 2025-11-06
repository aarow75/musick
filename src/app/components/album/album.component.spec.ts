import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumComponent } from './album.component';

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handleMissingImage should replace image src with base64 placeholder', () => {
    const img = document.createElement('img');
    img.src = 'bad.jpg';
    const evt = { target: img } as unknown as Event;

    component.handleMissingImage(evt);

    expect(img.src).toContain('data:image/jpeg;base64,');
  });
});
