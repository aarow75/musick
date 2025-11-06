import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'm-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.scss'],
    standalone: true,
})
export class ArtistComponent {
    @Input() artist: any;
    @Output() artistSelected = new EventEmitter();
}