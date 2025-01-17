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
    {
      name: 'gulpin'
    },
    {
      name: 'croconaw'
    }
  ]

  listSelecao: any[] = [];

  id: number = 0;

  boo: boolean = false;

  isResultado = false;
  isBoole = false;
  isQuantida = 0;

  hi = true;

  constructor(
    private servicePokemon: PokemonService
  ) {
    // console.log('construtor');
  }

  ngOnInit(): void {
    //console.log('ngOnInit');
    this.buscarPokemom();
  }
  testHidde(value: any) {
    console.log('hidde', value);
    if (value == "") {
      console.log('undefined')
      this.hi = false
    }
  }

  //numro aleatorios Inteiro
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  visualisarNome() {
    this.boo = !this.boo;
  }

  inicio() {
    this.buscarPokemom();

    this.isBoole = true;
    this.isQuantida = this.getRandomInt(3, 7);// quantidade de perguntas
    this.isResultado = false;
    this.listPokemon = [];
  }

  async buscarPokemom() {

    this.id = this.getRandomInt(1, 1010);

    this.pokemon = await this.servicePokemon.getPokemonOne(this.id);


    //console.log('this.pokemon', this.pokemon);

    /*  this.pokemon.id == 0 ? console.log('service Não inicializado') : this.listPokemon.push(this.pokemon);
     console.log('lista pokemon',this.listPokemon); */

    this.pokemon.name == '' ? console.log('return vazio') : this.respostaDinamica(); //monta opocoes aleatorias

  }

  respostaDinamica() {

    if (this.pokemon.sprites.front_default == null) {
      this.pokemon.sprites.front_default = './../../../assets/imgs/sombraPokemon.jpg'
    }

    //console.log('', this.pokemon.sprites.front_default)

    let posicaoSelect = this.getRandomInt(0, 3);

    this.listSelecao = [];

    for (let i = 0; i < 4; i++) {

      let posicaoOpcoes = this.getRandomInt(0, this.listOpcoes.length);

      if (this.listSelecao.length == 0) {
        this.listSelecao.push(this.listOpcoes[posicaoOpcoes]);

      }
      else if (this.verificacaoNome(posicaoOpcoes)) {
        this.listSelecao.push(this.listOpcoes[posicaoOpcoes]);
      }
      else if (this.listSelecao.length == 1) {
        i = i - 1;
      }

      //console.log('procurando nome vazio', this.listSelecao.every((value, index, array) => value.name == ''));

    }

    //maneira de nao repetir o nome correto 
    if (this.listSelecao.length <= 4) {

      this.listSelecao[posicaoSelect].name = this.pokemon.name; //NOME CORRETO, POSICAO ALEATORIA

    };
  }

  respostaSelecionada(name: string) {

    //console.log('antes', this.isQuantida)

    if (this.isQuantida >= 1) {
      this.boo = false;
      this.listPokemon.push(this.pokemon);

      //Inserindo resultado da escolha
      this.listPokemon[this.listPokemon.length - 1].resul = this.verificarResposta(name);


      this.buscarPokemom();

      this.isQuantida = this.isQuantida - 1;

    }

    if (this.isQuantida == 0) {
      this.isResultado = true;
      this.isBoole = false
    }
  }

  verificarResposta(name: string): boolean {
    let bool = false;
    name == this.pokemon.name ? bool = true : bool = false;

    return bool;
  }

  verificacaoNome(num: number): boolean {
    let bool: boolean = true;

    for (const list in this.listSelecao) {
      //analisando
      if (this.listSelecao[list] === this.listOpcoes[num]) {
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
