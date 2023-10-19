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
import {ExamenFisico} from '../models';
import {ExamenFisicoRepository} from '../repositories';

@authenticate('admin')
export class ExamenFisicoController {
  constructor(
    @repository(ExamenFisicoRepository)
    public examenFisicoRepository: ExamenFisicoRepository,
  ) { }

  @post('/examen-fisicos')
  @response(200, {
    description: 'ExamenFisico model instance',
    content: {'application/json': {schema: getModelSchemaRef(ExamenFisico)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExamenFisico, {
            title: 'NewExamenFisico',
            exclude: ['id'],
          }),
        },
      },
    })
    examenFisico: Omit<ExamenFisico, 'id'>,
  ): Promise<ExamenFisico> {
    return this.examenFisicoRepository.create(examenFisico);
  }

  @authenticate.skip()
  @get('/examen-fisicos/count')
  @response(200, {
    description: 'ExamenFisico model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ExamenFisico) where?: Where<ExamenFisico>,
  ): Promise<Count> {
    return this.examenFisicoRepository.count(where);
  }

  @get('/examen-fisicos')
  @response(200, {
    description: 'Array of ExamenFisico model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ExamenFisico, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ExamenFisico) filter?: Filter<ExamenFisico>,
  ): Promise<ExamenFisico[]> {
    return this.examenFisicoRepository.find(filter);
  }

  @patch('/examen-fisicos')
  @response(200, {
    description: 'ExamenFisico PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExamenFisico, {partial: true}),
        },
      },
    })
    examenFisico: ExamenFisico,
    @param.where(ExamenFisico) where?: Where<ExamenFisico>,
  ): Promise<Count> {
    return this.examenFisicoRepository.updateAll(examenFisico, where);
  }

  @get('/examen-fisicos/{id}')
  @response(200, {
    description: 'ExamenFisico model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ExamenFisico, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ExamenFisico, {exclude: 'where'}) filter?: FilterExcludingWhere<ExamenFisico>
  ): Promise<ExamenFisico> {
    return this.examenFisicoRepository.findById(id, filter);
  }

  @patch('/examen-fisicos/{id}')
  @response(204, {
    description: 'ExamenFisico PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExamenFisico, {partial: true}),
        },
      },
    })
    examenFisico: ExamenFisico,
  ): Promise<void> {
    await this.examenFisicoRepository.updateById(id, examenFisico);
  }

  @put('/examen-fisicos/{id}')
  @response(204, {
    description: 'ExamenFisico PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() examenFisico: ExamenFisico,
  ): Promise<void> {
    await this.examenFisicoRepository.replaceById(id, examenFisico);
  }

  @del('/examen-fisicos/{id}')
  @response(204, {
    description: 'ExamenFisico DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.examenFisicoRepository.deleteById(id);
  }
}
