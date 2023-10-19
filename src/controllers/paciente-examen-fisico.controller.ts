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
  ExamenFisico,
} from '../models';
import {PacienteRepository} from '../repositories';

export class PacienteExamenFisicoController {
  constructor(
    @repository(PacienteRepository) protected pacienteRepository: PacienteRepository,
  ) { }

  @get('/pacientes/{id}/examen-fisicos', {
    responses: {
      '200': {
        description: 'Array of Paciente has many ExamenFisico',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ExamenFisico)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ExamenFisico>,
  ): Promise<ExamenFisico[]> {
    return this.pacienteRepository.examenFisicos(id).find(filter);
  }

  @post('/pacientes/{id}/examen-fisicos', {
    responses: {
      '200': {
        description: 'Paciente model instance',
        content: {'application/json': {schema: getModelSchemaRef(ExamenFisico)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Paciente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExamenFisico, {
            title: 'NewExamenFisicoInPaciente',
            exclude: ['id'],
            optional: ['pacienteId']
          }),
        },
      },
    }) examenFisico: Omit<ExamenFisico, 'id'>,
  ): Promise<ExamenFisico> {
    return this.pacienteRepository.examenFisicos(id).create(examenFisico);
  }

  @patch('/pacientes/{id}/examen-fisicos', {
    responses: {
      '200': {
        description: 'Paciente.ExamenFisico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExamenFisico, {partial: true}),
        },
      },
    })
    examenFisico: Partial<ExamenFisico>,
    @param.query.object('where', getWhereSchemaFor(ExamenFisico)) where?: Where<ExamenFisico>,
  ): Promise<Count> {
    return this.pacienteRepository.examenFisicos(id).patch(examenFisico, where);
  }

  @del('/pacientes/{id}/examen-fisicos', {
    responses: {
      '200': {
        description: 'Paciente.ExamenFisico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ExamenFisico)) where?: Where<ExamenFisico>,
  ): Promise<Count> {
    return this.pacienteRepository.examenFisicos(id).delete(where);
  }
}
