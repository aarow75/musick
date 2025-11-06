import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistComponent } from './artist.component';

describe('ArtistComponent', () => {
  let component: ArtistComponent;
  let fixture: ComponentFixture<ArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit artistSelected when emitter is used', (done) => {
    const payload = { id: 'x', name: 'Test' };
    component.artistSelected.subscribe((value: any) => {
      expect(value).toBe(payload);
      done();
    });

    component.artistSelected.emit(payload);
  });
});
