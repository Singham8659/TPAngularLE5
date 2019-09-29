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

  getPokemons(): Observable<PagedData<Pokemon>>{
    const url = this.apiUrl + "/pokemons?limit=20";
    return this.http.get<PagedData<Pokemon>>(url);
  }

  getPokemon(id: number): Observable<Pokemon>{
    const url = this.apiUrl + "/pokemons/" + id;
    return this.http.get<Pokemon>(url);
  }

  getNextPokemons(offset: number, limit: number): Observable<PagedData<Pokemon>>{
    const url = this.apiUrl + "/pokemons?offset="+ offset + "&limit=" + limit;
    console.log(url);
    return this.http.get<PagedData<Pokemon>>(url);
  }

  getPokemonByName(searchParam: string): Observable<PagedData<Pokemon>>{
    const url = this.apiUrl + "/pokemons?search=" + searchParam;
    if(searchParam != "")
      return this.http.get<PagedData<Pokemon>>(url);
    return this.getPokemons();
  }

  logIn(login: string, password: string): Observable<string>{
    const url = this.apiUrl + "/auth/login";
    return this.http.post<LoginData>(url, {
      email: login,
      password: password
    })
    .pipe(
      map( res => {
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("refresh_token", res.refresh_token);
        return 'success';
      }),
      catchError((error: any): Observable<any> => {
          return of('Error');
        }
      )
    )
  }
}
