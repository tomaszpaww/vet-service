import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pet,
  Species,
} from '../models';
import {PetRepository} from '../repositories';

export class PetSpeciesController {
  constructor(
    @repository(PetRepository)
    public petRepository: PetRepository,
  ) { }

  @get('/pets/{id}/species', {
    responses: {
      '200': {
        description: 'Species belonging to Pet',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Species)},
          },
        },
      },
    },
  })
  async getSpecies(
    @param.path.number('id') id: typeof Pet.prototype.id,
  ): Promise<Species> {
    return this.petRepository.species(id);
  }
}
