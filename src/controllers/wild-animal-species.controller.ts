import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  WildAnimal,
  Species,
} from '../models';
import {WildAnimalRepository} from '../repositories';

export class WildAnimalSpeciesController {
  constructor(
    @repository(WildAnimalRepository)
    public wildAnimalRepository: WildAnimalRepository,
  ) { }

  @get('/wild-animals/{id}/species', {
    responses: {
      '200': {
        description: 'Species belonging to WildAnimal',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Species)},
          },
        },
      },
    },
  })
  async getSpecies(
    @param.path.number('id') id: typeof WildAnimal.prototype.id,
  ): Promise<Species> {
    return this.wildAnimalRepository.species(id);
  }
}
