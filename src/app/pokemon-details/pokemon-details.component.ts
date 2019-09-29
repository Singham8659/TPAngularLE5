import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemons';
import { Input } from '@angular/core';
import { PokemonTeamService } from '../services/pokemon-team.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  constructor(private pokemonService: PokemonService,private pokemonTeamService: PokemonTeamService ,private route: ActivatedRoute) { }
  
  @Input() pokemonId: number = 1;
  pokemon: Pokemon = undefined;
  pokemonIds: number[] = [];

  getPokemon(){
    this.pokemonService.getPokemon(this.pokemonId).subscribe(result => {
      console.log(result);
      this.pokemon = result;
    });
  }

  addPokemonInTeam(){
    console.log("ajout du pokemon");
    if(this.pokemonIds.length<6)
      this.pokemonIds.push(this.pokemonId);
    var response = this.pokemonTeamService.setTeam(this.pokemonIds).subscribe(res => {
      console.log(res);
    });
  }

  ngOnInit() {
    this.pokemonId = +this.route.snapshot.paramMap.get("id");
    if(this.pokemonId == undefined || this.pokemonId == 0){
      this.pokemonId=1;
    }
    this.getPokemon();
    console.log(this.pokemonId);
    this.pokemonTeamService.getPokemonTeamIds().subscribe(res => {
      this.pokemonIds = res;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getPokemon();
  }

  isConnected():boolean{
    var connected = localStorage.getItem("connected");
    if(!connected || connected == null){
      return false;
    }
    return true;
  }

}
