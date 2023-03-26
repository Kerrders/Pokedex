import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonResolver } from './resolvers/pokemon.resolver';
import { DetailsComponent } from './views/details/details.component';
import { OverviewComponent } from './views/overview/overview.component';

const routes: Routes = [
  { path: '', component: OverviewComponent },
  {
    path: 'pokemon/:name',
    component: DetailsComponent,
    resolve: {
      pokemonData: PokemonResolver,
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
