import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Address, Owner
} from '../../models';
import {OwnerRepository} from '../../repositories';

export class OwnerAddressController {
  constructor(
    @repository(OwnerRepository) protected ownerRepository: OwnerRepository,
  ) { }

  @get('/owners/{id}/address', {
    responses: {
      '200': {
        description: 'Owner has one Address',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Address),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Address>,
  ): Promise<Address> {
    return this.ownerRepository.address(id).get(filter);
  }

  @post('/owners/{id}/address', {
    responses: {
      '200': {
        description: 'Owner model instance',
        content: {'application/json': {schema: getModelSchemaRef(Address)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Owner.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {
            title: 'NewAddressInOwner',
            exclude: ['id'],
            optional: ['ownerId']
          }),
        },
      },
    }) address: Omit<Address, 'id'>,
  ): Promise<Address> {
    return this.ownerRepository.address(id).create(address);
  }

  @patch('/owners/{id}/address', {
    responses: {
      '200': {
        description: 'Owner.Address PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {partial: true}),
        },
      },
    })
    address: Partial<Address>,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.ownerRepository.address(id).patch(address, where);
  }

  @del('/owners/{id}/address', {
    responses: {
      '200': {
        description: 'Owner.Address DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.ownerRepository.address(id).delete(where);
  }
}
