import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PokemonSpeciesName } from '../interfaces/PokemonSpeciesName.interface';
import { SidenavService } from './sidenav.service';

describe('SidenavService', () => {
  let service: SidenavService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
    service = TestBed.inject(SidenavService);
  });

  it('updates the nodes signal when a Pokémon is added', () => {
    const previousNodes = service.nodes();
    const name: Array<PokemonSpeciesName> = [
      {
        pokemon_species_id: 1,
        local_language_id: 9,
        name: 'Bulbasaur',
        genus: 'Seed Pokémon',
      },
    ];

    service.addNode(name, 'pokemon/bulbasaur');

    expect(service.nodes()).not.toBe(previousNodes);
    expect(service.nodes()).toEqual([{ name, url: 'pokemon/bulbasaur' }]);
  });

  it('keeps only the ten most recently added Pokémon', () => {
    for (let id = 1; id <= 11; id++) {
      service.addNode(
        [
          {
            pokemon_species_id: id,
            local_language_id: 9,
            name: `Pokemon ${id}`,
            genus: 'Pokémon',
          },
        ],
        `pokemon/${id}`,
      );
    }

    expect(service.nodes().length).toBe(10);
    expect(service.nodes()[0].url).toBe('pokemon/2');
  });
});
