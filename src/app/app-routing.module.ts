import { HomeComponent } from './pages/home/home.component';
import { QuizzComponent } from './components/quizz/quizz.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPokemonComponent } from './components/card-pokemon/card-pokemon.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'quizz',
    component: QuizzComponent
  },
  {
    path:'cardPokemon',
    component:CardPokemonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
