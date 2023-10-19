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
  HistoriaClinica,
} from '../models';
import {PacienteRepository} from '../repositories';

export class PacienteHistoriaClinicaController {
  constructor(
    @repository(PacienteRepository) protected pacienteRepository: PacienteRepository,
  ) { }

  @get('/pacientes/{id}/historia-clinicas', {
    responses: {
      '200': {
        description: 'Array of Paciente has many HistoriaClinica',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(HistoriaClinica)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<HistoriaClinica>,
  ): Promise<HistoriaClinica[]> {
    return this.pacienteRepository.historiaClinicas(id).find(filter);
  }

  @post('/pacientes/{id}/historia-clinicas', {
    responses: {
      '200': {
        description: 'Paciente model instance',
        content: {'application/json': {schema: getModelSchemaRef(HistoriaClinica)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Paciente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaClinica, {
            title: 'NewHistoriaClinicaInPaciente',
            exclude: ['id'],
            optional: ['pacienteId']
          }),
        },
      },
    }) historiaClinica: Omit<HistoriaClinica, 'id'>,
  ): Promise<HistoriaClinica> {
    return this.pacienteRepository.historiaClinicas(id).create(historiaClinica);
  }

  @patch('/pacientes/{id}/historia-clinicas', {
    responses: {
      '200': {
        description: 'Paciente.HistoriaClinica PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaClinica, {partial: true}),
        },
      },
    })
    historiaClinica: Partial<HistoriaClinica>,
    @param.query.object('where', getWhereSchemaFor(HistoriaClinica)) where?: Where<HistoriaClinica>,
  ): Promise<Count> {
    return this.pacienteRepository.historiaClinicas(id).patch(historiaClinica, where);
  }

  @del('/pacientes/{id}/historia-clinicas', {
    responses: {
      '200': {
        description: 'Paciente.HistoriaClinica DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(HistoriaClinica)) where?: Where<HistoriaClinica>,
  ): Promise<Count> {
    return this.pacienteRepository.historiaClinicas(id).delete(where);
  }
}
