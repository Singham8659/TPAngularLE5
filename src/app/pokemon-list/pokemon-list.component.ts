import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import {Pokemon} from '../models/pokemons'
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  constructor(private pokemonService: PokemonService) { }

  @Output() select = new EventEmitter<number>();
  pokemonList: Pokemon[];

  getPokemons(){
    this.pokemonService.getPokemons().subscribe(result => {
      this.pokemonList = result.data;
      console.log(this.pokemonList);
    });
  }

  ngOnInit() {
    this.getPokemons();
  }

  onScroll() {
    console.log("scroll");
    this.pokemonService.getNextPokemons(this.pokemonList.length, 10).subscribe(result => {
      this.pokemonList.push(...result.data);
    })
  }

  onKeyUp(searchBar: string){
    console.log(searchBar);
    this.pokemonList = [];
    this.pokemonService.getPokemonByName(searchBar).subscribe(result => {
      this.pokemonList.push(...result.data);
    })
  }

  selectPokemon(id: number) {
    this.select.emit(id);
  }
}
