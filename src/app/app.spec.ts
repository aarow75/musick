import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, HttpClientTestingModule, ToastrModule.forRoot()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Musick');
  });

  it('markAsFave should add an album and show success toast', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const toastr = TestBed.inject(ToastrService);
    spyOn(toastr, 'success');

    const album = { id: '1', title: 'My Album', date: '2020-01-01' } as any;

    app.markAsFave(album);

    const faves = app.faves();
    expect(faves.length).toBe(1);
    expect(faves[0].title).toBe('My Album');
    expect(toastr.success).toHaveBeenCalledWith(album.title + ' added to favorites.', 'Success');
  });

  it('markAsFave should not add duplicate and should show error toast', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const toastr = TestBed.inject(ToastrService);
    spyOn(toastr, 'error');

    const album = { id: '2', title: 'Duplicate', date: '2020-01-02' } as any;

    app.markAsFave(album);
    // try to add again
    app.markAsFave(album);

    const faves = app.faves();
    expect(faves.length).toBe(1);
    expect(toastr.error).toHaveBeenCalledWith(album.title + ' already exists as a favorite', 'Error');
  });
});
