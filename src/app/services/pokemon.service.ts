import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemons';
import { PagedData } from '../models/pageddata';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginData } from '../models/logindata';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //renvoie les 20 premiers pokemons
  getPokemons(): Observable<PagedData<Pokemon>>{
    const url = this.apiUrl + "/pokemons?limit=20";
    return this.http.get<PagedData<Pokemon>>(url);
  }

  //renvoie un pokemon selon son id
  getPokemon(id: number): Observable<Pokemon>{
    const url = this.apiUrl + "/pokemons/" + id;
    return this.http.get<Pokemon>(url);
  }

  //renvoie un nombre de donné de pokemon en partant d'une borne dans le pokédex
  getNextPokemons(offset: number, limit: number): Observable<PagedData<Pokemon>>{
    const url = this.apiUrl + "/pokemons?offset="+ offset + "&limit=" + limit;
    return this.http.get<PagedData<Pokemon>>(url);
  }

  //fonction servant à récupérer un pokemon par son nom
  getPokemonByName(searchParam: string): Observable<PagedData<Pokemon>>{
    const url = this.apiUrl + "/pokemons?search=" + searchParam;
    if(searchParam != "")
      return this.http.get<PagedData<Pokemon>>(url);
    return this.getPokemons();
  }
}
