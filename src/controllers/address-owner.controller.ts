import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Address,
  Owner,
} from '../models';
import {AddressRepository} from '../repositories';

export class AddressOwnerController {
  constructor(
    @repository(AddressRepository)
    public addressRepository: AddressRepository,
  ) { }

  @get('/addresses/{id}/owner', {
    responses: {
      '200': {
        description: 'Owner belonging to Address',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Owner)},
          },
        },
      },
    },
  })
  async getOwner(
    @param.path.number('id') id: typeof Address.prototype.id,
  ): Promise<Owner> {
    return this.addressRepository.owner(id);
  }
}
