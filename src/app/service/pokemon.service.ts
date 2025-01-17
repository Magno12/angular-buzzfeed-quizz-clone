import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { catchError, Observable, retry, Subscriber, throwError } from 'rxjs';
import { PokemonInterface } from '../models/PokemonInterface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private urlBase: string = environment.pokeApi;
  private listPokemon: PokemonInterface | any = { id: 0, name: '', resul: false, sprites: { front_default: '' } };
  private pokemon: PokemonInterface | any = { id: 0, name: '', resul: false, sprites: { front_default: '' } };


  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<PokemonInterface> {
    this.listPokemon = this.httpClient.get<PokemonInterface>(this.urlBase)
    return this.listPokemon;

  }

  getPokemonOne(id: number) {
    this.httpClient.get<PokemonInterface>(`${this.urlBase}${id}`)
      .subscribe(
        async (data) =>

          this.pokemon = {
            id: await data.id,
            name: await data.name,
            sprites: await data.sprites,
            resul: await false
          }
      );

    return this.pokemon
  }




}
