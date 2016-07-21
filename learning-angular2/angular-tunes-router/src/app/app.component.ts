import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { ArtistService } from './artist/artist.service';
import { AlbumService } from './album/album.service';

@Component({
  selector: 'angular-tunes',
  providers: [ArtistService, AlbumService],
  directives: [
    ROUTER_DIRECTIVES
  ],
  template: `
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent { }
