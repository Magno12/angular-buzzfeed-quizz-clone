import { PokemonInterface } from './../../models/PokemonInterface';
import { PokemonService } from './../../service/pokemon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.css']
})
export class CardPokemonComponent implements OnInit {

  pokemon: PokemonInterface | any = {};
  listPokemon: PokemonInterface[] = [];

  listOpcoes = [
    {
      name: 'kakuna'
    },
    {
      name: 'weedle'
    },
    {
      name: 'wartortle'
    },
    {
      name: 'squirtle'
    },
    {
      name: 'charmeleon'
    },
    {
      name: 'bulbasaur'
    },
    {
      name: 'ivysaur'
    },
  ]

  listSelecao: any[] = [{ name: '' }]

  nameGeral: string = '';
  imgSrc: string = '';
  id: number = 0;
  boo: boolean = false;
  isBoole = false;
  isQuantida = 0;

  constructor(private servicePokemon: PokemonService) {
    console.log('construtor');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.Pokemom();
  }

  //numro aleatorioInteiro
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  inicio() {
    this.Pokemom();
    this.isBoole = true;
    this.isQuantida = this.getRandomInt(5, 10);// quantidade de perguntas
  }

  Pokemom() {

    this.id = this.getRandomInt(1, 1010);

    this.pokemon = this.servicePokemon.getPokemonOne(this.id);
    //this.respostaStatic();
    this.respostaDinamica(); //monta opocoes aleatorias

    console.log('pokemon', this.pokemon);
    this.pokemon.id === 0 || this.pokemon.sprites.front_default == null ? console.log('vasio') : this.listPokemon.push(this.pokemon);

    //verificar pokemon.sprites.front_default
  }


  respostaDinamica() {
    let posicaoSelect = this.getRandomInt(0, 3);

    this.listSelecao = [];

    for (let i = 0; i < 4; i++) {

      let posicaoOpcoes = this.getRandomInt(0, this.listOpcoes.length);

      if (this.listSelecao.length == 0) {
        this.listSelecao.push(this.listOpcoes[posicaoOpcoes]);
      } else if (this.verificacaoNome(posicaoOpcoes)) {
        this.listSelecao.push(this.listOpcoes[posicaoOpcoes])
      }

    }

    if (this.listSelecao.length <= 4) {
      this.listSelecao[posicaoSelect].name = this.pokemon.name; //NOME CORRETO
    };

  }

  respostaSelecionada(name: string) {

    console.log('Opcao escolhida', name);
    console.log('certo ou errado', this.verificarResposta(name));

    if (this.isQuantida > 0) {
      this.Pokemom();

      this.isQuantida--;
    } else {
      this.isBoole = !this.isBoole;
    }


  }

  verificarResposta(name: string): boolean {
    let bool = false;
    name == this.pokemon.name ? bool = true : bool = false;
    this.boo = bool;
    return bool;
  }

  respostaStatic() {

    let posicao = this.getRandomInt(0, this.listOpcoes.length);

    this.pokemon.name != '' ? this.listOpcoes[posicao].name = this.pokemon.name : console.log('vazio');

    this.listSelecao = this.listOpcoes;
  }

  verificacaoNome(num: number): boolean {
    let bool: boolean = true;

    for (const list in this.listSelecao) {

      if (this.listSelecao[list] == this.listOpcoes[num]) {
        console.log('false', this.listSelecao[list])
        return false;
      }
    }
    return bool;
  }


  getListaPokemon() {
    console.log('Lista de Pokemons', this.listPokemon);
    console.log('List Selecao', this.listSelecao);
  }


}
