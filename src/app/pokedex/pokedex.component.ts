import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  constructor() { }

  pokemonId: number = 1;
  ngOnInit() {
  }

  setPokemonId(id: number){
    this.pokemonId = id;
  }
}
