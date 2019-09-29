import { TestBed } from '@angular/core/testing';

import { PokemonTeamService } from './pokemon-team.service';

describe('PokemonTeamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokemonTeamService = TestBed.get(PokemonTeamService);
    expect(service).toBeTruthy();
  });
});
