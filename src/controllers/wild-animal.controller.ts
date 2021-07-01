import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response,
  RestHttpErrors
} from '@loopback/rest';
import {WildAnimalRepository} from '../repositories';
import {WildAnimal} from './../models/wild-animal.model';

export class WildAnimalController {
  constructor(
    @repository(WildAnimalRepository)
    public wildAnimalRepository: WildAnimalRepository,
  ) { }

  @post('/wild-animals')
  @response(200, {
    description: 'WildAnimal model instance',
    content: {'application/json': {schema: getModelSchemaRef(WildAnimal)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WildAnimal, {
            title: 'NewWildAnimal',
            exclude: ['id'],
          }),
        },
      },
    })
    wildAnimal: Omit<WildAnimal, 'id'>,
  ): Promise<WildAnimal> {
    if (await this.wildAnimalRepository.validateUniqunessOfTrackingId(wildAnimal)) {
      return this.wildAnimalRepository.create(wildAnimal);
    } else {
      throw RestHttpErrors.invalidRequestBody([{message: 'is not unique!', code: 'index', path: 'trackingId', info: {}}]);
    }
  }

  @get('/wild-animals/count')
  @response(200, {
    description: 'WildAnimal model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(WildAnimal) where?: Where<WildAnimal>,
  ): Promise<Count> {
    return this.wildAnimalRepository.count(where);
  }

  @get('/wild-animals')
  @response(200, {
    description: 'Array of WildAnimal model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(WildAnimal, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(WildAnimal) filter?: Filter<WildAnimal>,
  ): Promise<WildAnimal[]> {
    return this.wildAnimalRepository.find(filter);
  }

  @patch('/wild-animals')
  @response(200, {
    description: 'WildAnimal PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WildAnimal, {partial: true}),
        },
      },
    })
    wildAnimal: WildAnimal,
    @param.where(WildAnimal) where?: Where<WildAnimal>,
  ): Promise<Count> {
    return this.wildAnimalRepository.updateAll(wildAnimal, where);
  }

  @get('/wild-animals/{id}')
  @response(200, {
    description: 'WildAnimal model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(WildAnimal, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(WildAnimal, {exclude: 'where'}) filter?: FilterExcludingWhere<WildAnimal>
  ): Promise<WildAnimal> {
    return this.wildAnimalRepository.findById(id, filter);
  }

  @patch('/wild-animals/{id}')
  @response(204, {
    description: 'WildAnimal PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WildAnimal, {partial: true}),
        },
      },
    })
    wildAnimal: WildAnimal,
  ): Promise<void> {
    return this.wildAnimalRepository.updateById(id, wildAnimal);
  }

  @put('/wild-animals/{id}')
  @response(204, {
    description: 'WildAnimal PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() wildAnimal: WildAnimal,
  ): Promise<void> {
    if (await this.wildAnimalRepository.validateUniqunessOfTrackingId(wildAnimal)) {
      return this.wildAnimalRepository.replaceById(id, wildAnimal);
    } else {
      throw RestHttpErrors.invalidRequestBody([{message: 'is not unique!', code: 'index', path: 'trackingId', info: {}}])
    }
  }

  @del('/wild-animals/{id}')
  @response(204, {
    description: 'WildAnimal DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.wildAnimalRepository.deleteById(id);
  }
}
