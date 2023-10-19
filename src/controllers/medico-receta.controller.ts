import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Medico,
  Receta,
} from '../models';
import {MedicoRepository} from '../repositories';

export class MedicoRecetaController {
  constructor(
    @repository(MedicoRepository) protected medicoRepository: MedicoRepository,
  ) { }

  @get('/medicos/{id}/recetas', {
    responses: {
      '200': {
        description: 'Array of Medico has many Receta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Receta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Receta>,
  ): Promise<Receta[]> {
    return this.medicoRepository.recetas(id).find(filter);
  }

  @post('/medicos/{id}/recetas', {
    responses: {
      '200': {
        description: 'Medico model instance',
        content: {'application/json': {schema: getModelSchemaRef(Receta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Medico.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Receta, {
            title: 'NewRecetaInMedico',
            exclude: ['id'],
            optional: ['medicoId']
          }),
        },
      },
    }) receta: Omit<Receta, 'id'>,
  ): Promise<Receta> {
    return this.medicoRepository.recetas(id).create(receta);
  }

  @patch('/medicos/{id}/recetas', {
    responses: {
      '200': {
        description: 'Medico.Receta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Receta, {partial: true}),
        },
      },
    })
    receta: Partial<Receta>,
    @param.query.object('where', getWhereSchemaFor(Receta)) where?: Where<Receta>,
  ): Promise<Count> {
    return this.medicoRepository.recetas(id).patch(receta, where);
  }

  @del('/medicos/{id}/recetas', {
    responses: {
      '200': {
        description: 'Medico.Receta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Receta)) where?: Where<Receta>,
  ): Promise<Count> {
    return this.medicoRepository.recetas(id).delete(where);
  }
}
