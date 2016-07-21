import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { AlbumService } from './album.service';

@Component({
  selector: 'album-detail',
  directives: [ROUTER_DIRECTIVES],
  template: require('./album-detail.component.html')
})
export class AlbumDetailComponent implements OnInit, OnDestroy {

  album;
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private albumService: AlbumService) {
  }

  ngOnInit(){
    this.paramsSubscription = this.route.params.subscribe(params => {
     //console.log('params: ', params);
     this.album = this.albumService.getAlbum(params['albumId']);
    })
  }

  ngOnDestroy(){
    //prevent memory leak
    this.paramsSubscription.unsubscribe();
  }

}
