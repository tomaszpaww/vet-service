import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Owner, Pet
} from '../../models';
import {PetRepository} from '../../repositories';

export class PetOwnerController {
  constructor(
    @repository(PetRepository)
    public petRepository: PetRepository,
  ) { }

  @get('/pets/{id}/owner', {
    responses: {
      '200': {
        description: 'Owner belonging to Pet',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Owner)},
          },
        },
      },
    },
  })
  async getOwner(
    @param.path.number('id') id: typeof Pet.prototype.id,
  ): Promise<Owner> {
    return this.petRepository.owner(id);
  }
}
