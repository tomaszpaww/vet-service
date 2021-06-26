import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Animal,
  Species,
} from '../models';
import {AnimalRepository} from '../repositories';

export class AnimalSpeciesController {
  constructor(
    @repository(AnimalRepository)
    public animalRepository: AnimalRepository,
  ) { }

  @get('/animals/{id}/species', {
    responses: {
      '200': {
        description: 'Species belonging to Animal',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Species)},
          },
        },
      },
    },
  })
  async getSpecies(
    @param.path.number('id') id: typeof Animal.prototype.id,
  ): Promise<Species> {
    return this.animalRepository.species(id);
  }
}
