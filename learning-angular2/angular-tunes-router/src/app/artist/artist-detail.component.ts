import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from './artist.service';

@Component({
  selector: 'artist-detail',
  directives: [ROUTER_DIRECTIVES],
  template: require('./artist-detail.component.html')
})
export class ArtistDetailComponent implements OnInit, OnDestroy {

  artist;
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private artistService: ArtistService) {
    //not update view when user in this view and change the parameter
    //const artistId = route.snapshot.params['artistId'];
    //this.artist = this.artistService.getArtist(artistId);

    //listen for changes to the parameters value
    // this.paramsSubscription = route.params.subscribe(params => {
    //   this.artist = this.artistService.getArtist(params['artistId']);
    // })
  }

  ngOnInit(){
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.artist = this.artistService.getArtist(params['artistId']);
    })
  }

  ngOnDestroy(){
    //prevent memory leak
    this.paramsSubscription.unsubscribe();
  }

}
