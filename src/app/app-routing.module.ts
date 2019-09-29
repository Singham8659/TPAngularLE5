import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonDetailsComponent } from "./pokemon-details/pokemon-details.component"
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { PokemonTeamComponent } from './pokemon-team/pokemon-team.component';


const routes: Routes = [
  {path: '', redirectTo: 'pokedex', pathMatch: 'full'},
  {path: 'pokemon/:id', component: PokemonDetailsComponent},
  {path: 'pokemons' , component: PokemonListComponent},
  {path: 'pokedex', component: PokedexComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'team', component: PokemonTeamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
