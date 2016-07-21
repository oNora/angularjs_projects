import { provideRouter } from '@angular/router';
import { LoginService } from './login/login.service';
import { LoggedInGuard } from './login/logged-in.guard'
import { LoginFormComponent } from './login/login-form.component';
import { ArtistListComponent } from './artist/artist-list.component';
import { ArtistDetailComponent } from './artist/artist-detail.component';
import { AlbumListComponent } from './album/album-list.component';
import { AlbumDetailComponent } from './album/album-detail.component';

export const APP_ROUTER_PROVIDER = [
    LoginService,
    LoggedInGuard,
    provideRouter([
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
        },
    ])
];