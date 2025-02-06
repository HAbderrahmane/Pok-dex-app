import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailsComponent } from './component/pokemon-details/pokemon-details.component';
import { PokemonsListComponent } from './component/pokemons-list/pokemons-list.component';

const routes: Routes = [
  { path: 'pokemons', component: PokemonsListComponent },
  { path: 'pokemon-details/:id', component: PokemonDetailsComponent,runGuardsAndResolvers: 'always' },
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
