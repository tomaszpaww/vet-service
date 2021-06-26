import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Species} from '../models';
import {SpeciesRepository} from '../repositories';

export class SpeciesController {
  constructor(
    @repository(SpeciesRepository)
    public speciesRepository : SpeciesRepository,
  ) {}

  @post('/species')
  @response(200, {
    description: 'Species model instance',
    content: {'application/json': {schema: getModelSchemaRef(Species)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Species, {
            title: 'NewSpecies',
            exclude: ['id'],
          }),
        },
      },
    })
    species: Omit<Species, 'id'>,
  ): Promise<Species> {
    return this.speciesRepository.create(species);
  }

  @get('/species/count')
  @response(200, {
    description: 'Species model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Species) where?: Where<Species>,
  ): Promise<Count> {
    return this.speciesRepository.count(where);
  }

  @get('/species')
  @response(200, {
    description: 'Array of Species model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Species, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Species) filter?: Filter<Species>,
  ): Promise<Species[]> {
    return this.speciesRepository.find(filter);
  }

  @patch('/species')
  @response(200, {
    description: 'Species PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Species, {partial: true}),
        },
      },
    })
    species: Species,
    @param.where(Species) where?: Where<Species>,
  ): Promise<Count> {
    return this.speciesRepository.updateAll(species, where);
  }

  @get('/species/{id}')
  @response(200, {
    description: 'Species model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Species, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Species, {exclude: 'where'}) filter?: FilterExcludingWhere<Species>
  ): Promise<Species> {
    return this.speciesRepository.findById(id, filter);
  }

  @patch('/species/{id}')
  @response(204, {
    description: 'Species PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Species, {partial: true}),
        },
      },
    })
    species: Species,
  ): Promise<void> {
    await this.speciesRepository.updateById(id, species);
  }

  @put('/species/{id}')
  @response(204, {
    description: 'Species PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() species: Species,
  ): Promise<void> {
    await this.speciesRepository.replaceById(id, species);
  }

  @del('/species/{id}')
  @response(204, {
    description: 'Species DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.speciesRepository.deleteById(id);
  }
}
