import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemons'
import {PokemonTeamService} from '../services/pokemon-team.service';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-team',
  templateUrl: './pokemon-team.component.html',
  styleUrls: ['./pokemon-team.component.scss']
})
export class PokemonTeamComponent implements OnInit {

  constructor(private pokemonTeamService: PokemonTeamService, private pokemonService: PokemonService) { }

  pokemonTeam: Pokemon[]; 

  deletePokemon(id: number){

    var idTab = [];
    var i = 0;
    this.pokemonTeam.map(value => {
      if(value.id != id)
        idTab.push(value.id);
      else {
        this.pokemonTeam.splice(i, 1);
      }
      i++;
    })

    this.pokemonTeamService.setTeam(idTab).subscribe(res => {
      console.log(res);
    })
  }

  ngOnInit() {
    this.pokemonTeamService.getPokemonTeam().subscribe(res => {
      this.pokemonTeam = res;
    })
  }
}
