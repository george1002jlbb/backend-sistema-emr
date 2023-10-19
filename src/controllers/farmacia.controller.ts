import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Farmacia} from '../models';
import {FarmaciaRepository} from '../repositories';

@authenticate('admin')
export class FarmaciaController {
  constructor(
    @repository(FarmaciaRepository)
    public farmaciaRepository: FarmaciaRepository,
  ) { }

  @post('/farmacias')
  @response(200, {
    description: 'Farmacia model instance',
    content: {'application/json': {schema: getModelSchemaRef(Farmacia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Farmacia, {
            title: 'NewFarmacia',
            exclude: ['id'],
          }),
        },
      },
    })
    farmacia: Omit<Farmacia, 'id'>,
  ): Promise<Farmacia> {
    return this.farmaciaRepository.create(farmacia);
  }

  @authenticate.skip()
  @get('/farmacias/count')
  @response(200, {
    description: 'Farmacia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Farmacia) where?: Where<Farmacia>,
  ): Promise<Count> {
    return this.farmaciaRepository.count(where);
  }

  @get('/farmacias')
  @response(200, {
    description: 'Array of Farmacia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Farmacia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Farmacia) filter?: Filter<Farmacia>,
  ): Promise<Farmacia[]> {
    return this.farmaciaRepository.find(filter);
  }

  @patch('/farmacias')
  @response(200, {
    description: 'Farmacia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Farmacia, {partial: true}),
        },
      },
    })
    farmacia: Farmacia,
    @param.where(Farmacia) where?: Where<Farmacia>,
  ): Promise<Count> {
    return this.farmaciaRepository.updateAll(farmacia, where);
  }

  @get('/farmacias/{id}')
  @response(200, {
    description: 'Farmacia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Farmacia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Farmacia, {exclude: 'where'}) filter?: FilterExcludingWhere<Farmacia>
  ): Promise<Farmacia> {
    return this.farmaciaRepository.findById(id, filter);
  }

  @patch('/farmacias/{id}')
  @response(204, {
    description: 'Farmacia PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Farmacia, {partial: true}),
        },
      },
    })
    farmacia: Farmacia,
  ): Promise<void> {
    await this.farmaciaRepository.updateById(id, farmacia);
  }

  @put('/farmacias/{id}')
  @response(204, {
    description: 'Farmacia PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() farmacia: Farmacia,
  ): Promise<void> {
    await this.farmaciaRepository.replaceById(id, farmacia);
  }

  @del('/farmacias/{id}')
  @response(204, {
    description: 'Farmacia DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.farmaciaRepository.deleteById(id);
  }
}
