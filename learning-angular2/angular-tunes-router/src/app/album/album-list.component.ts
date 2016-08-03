import { Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AlbumService } from './album.service';

@Component({
  selector: 'album-list',
  directives: [ROUTER_DIRECTIVES],
  template: require('./album-list.component.html')
})
export class AlbumListComponent {

  albums;

  constructor(albumService: AlbumService) {
    this.albums = albumService.getAlbums();
  }

}
