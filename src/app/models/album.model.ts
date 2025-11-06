export interface IAlbumArtist {
    releases: IAlbumRelease[];
}

export interface IAlbumRelease {
    id: string;
    title: string;
    date: string;
}