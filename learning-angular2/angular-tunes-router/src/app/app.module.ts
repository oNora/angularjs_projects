import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginService } from './login/login.service';
import { LoggedInGuard } from './login/logged-in.guard'
import { LoginFormComponent } from './login/login-form.component';
import { ArtistListComponent } from './artist/artist-list.component';
import { ArtistDetailComponent } from './artist/artist-detail.component';
import { AlbumListComponent } from './album/album-list.component';
import { AlbumDetailComponent } from './album/album-detail.component';
import { ArtistService } from './artist/artist.service';
import { AlbumService } from './album/album.service';

const routerModule = RouterModule.forRoot([
    {
        path: 'login',
        component: LoginFormComponent
    },
    {
        path: '',
        redirectTo: '/artists',
        pathMatch: 'full'
    },
    {
        path: 'artists',
        component: ArtistListComponent
    },
    {
        path: 'artists/:artistId',
        component: ArtistDetailComponent
    },
    {
        path: 'albums',
        component: AlbumListComponent
    },
    {
        path: 'albums/:albumId',
        component: AlbumDetailComponent,
        canActivate: [LoggedInGuard]
    }
]);

@NgModule({
  imports: [BrowserModule, FormsModule, routerModule],
  declarations: [
    LoginFormComponent,
    AlbumDetailComponent,
    AlbumListComponent,
    ArtistDetailComponent,
    ArtistListComponent,
    AppComponent
  ],
  providers: [LoginService, LoggedInGuard, ArtistService, AlbumService],
  bootstrap: [AppComponent]
})
export class AppModule { }