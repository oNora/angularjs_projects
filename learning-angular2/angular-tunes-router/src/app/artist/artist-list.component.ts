import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ArtistService } from './artist.service';

@Component({
  selector: 'artist-list',
  directives: [ROUTER_DIRECTIVES],
  template: require('./artist-list.component.html')
})
export class ArtistListComponent {

  artists;

  constructor(artistService: ArtistService) {
    this.artists = artistService.getArtists();
  }

}

