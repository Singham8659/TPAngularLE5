import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from './pokemon.service';
import { forkJoin } from 'rxjs/index';
import { mergeMap, defaultIfEmpty, map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Pokemon} from '../models/pokemons';

@Injectable({
  providedIn: 'root'
})
export class PokemonTeamService {

  constructor(private http: HttpClient, private pokemonService: PokemonService) { }

  apiUrl: String = environment.apiUrl;

  getPokemons(pokemonIds: number[]): Observable<Pokemon[]> {
    return forkJoin(pokemonIds.map(id => this.pokemonService.getPokemon(id)));
  }

  getPokemonTeam(){
    const url = this.apiUrl + "/trainers/me/team";

    return this.http.get<number[]>(url).pipe(
      mergeMap(ids => this.getPokemons(ids)),
      defaultIfEmpty([])
    );
  }

  getPokemonTeamIds(): Observable<number[]>{
    const url = this.apiUrl + "/trainers/me/team";
    return this.http.get<number[]>(url);
  }

  setTeam(pokemonIds: number[]): Observable<any>{
    console.log(pokemonIds);
    const url = this.apiUrl + "/trainers/me/team";
    return this.http.put(url, pokemonIds);
  }
}
