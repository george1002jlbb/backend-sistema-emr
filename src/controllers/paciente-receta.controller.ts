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
  Paciente,
  Receta,
} from '../models';
import {PacienteRepository} from '../repositories';

export class PacienteRecetaController {
  constructor(
    @repository(PacienteRepository) protected pacienteRepository: PacienteRepository,
  ) { }

  @get('/pacientes/{id}/recetas', {
    responses: {
      '200': {
        description: 'Array of Paciente has many Receta',
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
    return this.pacienteRepository.recetas(id).find(filter);
  }

  @post('/pacientes/{id}/recetas', {
    responses: {
      '200': {
        description: 'Paciente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Receta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Paciente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Receta, {
            title: 'NewRecetaInPaciente',
            exclude: ['id'],
            optional: ['pacienteId']
          }),
        },
      },
    }) receta: Omit<Receta, 'id'>,
  ): Promise<Receta> {
    return this.pacienteRepository.recetas(id).create(receta);
  }

  @patch('/pacientes/{id}/recetas', {
    responses: {
      '200': {
        description: 'Paciente.Receta PATCH success count',
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
    return this.pacienteRepository.recetas(id).patch(receta, where);
  }

  @del('/pacientes/{id}/recetas', {
    responses: {
      '200': {
        description: 'Paciente.Receta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Receta)) where?: Where<Receta>,
  ): Promise<Count> {
    return this.pacienteRepository.recetas(id).delete(where);
  }
}
