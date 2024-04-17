import { Routes } from '@angular/router';
import { PokemonResolver } from './resolvers/pokemon.resolver';
import { DetailsComponent } from './views/details/details.component';
import { OverviewComponent } from './views/overview/overview.component';

export const routes: Routes = [
  { path: '', component: OverviewComponent },
  {
    path: 'pokemon/:name',
    component: DetailsComponent,
    resolve: {
      pokemonData: PokemonResolver,
    },
  },
];
