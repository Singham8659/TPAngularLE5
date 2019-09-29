import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import {MatDividerModule} from '@angular/material/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { ConnexionComponent } from './connexion/connexion.component';

import { AuthInterceptor } from './interceptors/auth-interceptor';
import { AuthenticationService } from './services/authentication.service';
import { PokemonTeamComponent } from './pokemon-team/pokemon-team.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailsComponent,
    PokedexComponent,
    ConnexionComponent,
    PokemonTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    InfiniteScrollModule,
    MatSidenavModule,
    MatInputModule,
    FormsModule,
    MatMenuModule,
    MatDividerModule,
    JwtModule.forRoot({
      config: {
          tokenGetter: () => {
            return localStorage.getItem('token');
          }
      }
    }),
  ],
  providers: [
    JwtHelperService,
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true},
    AuthenticationService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
