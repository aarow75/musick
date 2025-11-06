import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IAlbumRelease } from "../../models/album.model";

@Component({
    selector: 'm-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.scss'],
    standalone: true,
})
export class AlbumComponent {
    @Input() album: IAlbumRelease | undefined;
    @Output() markAsFavorite = new EventEmitter();
}