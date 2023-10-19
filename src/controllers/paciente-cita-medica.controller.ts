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
  CitaMedica,
} from '../models';
import {PacienteRepository} from '../repositories';

export class PacienteCitaMedicaController {
  constructor(
    @repository(PacienteRepository) protected pacienteRepository: PacienteRepository,
  ) { }

  @get('/pacientes/{id}/cita-medicas', {
    responses: {
      '200': {
        description: 'Array of Paciente has many CitaMedica',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CitaMedica)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CitaMedica>,
  ): Promise<CitaMedica[]> {
    return this.pacienteRepository.citaMedicas(id).find(filter);
  }

  @post('/pacientes/{id}/cita-medicas', {
    responses: {
      '200': {
        description: 'Paciente model instance',
        content: {'application/json': {schema: getModelSchemaRef(CitaMedica)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Paciente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CitaMedica, {
            title: 'NewCitaMedicaInPaciente',
            exclude: ['id'],
            optional: ['pacienteId']
          }),
        },
      },
    }) citaMedica: Omit<CitaMedica, 'id'>,
  ): Promise<CitaMedica> {
    return this.pacienteRepository.citaMedicas(id).create(citaMedica);
  }

  @patch('/pacientes/{id}/cita-medicas', {
    responses: {
      '200': {
        description: 'Paciente.CitaMedica PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CitaMedica, {partial: true}),
        },
      },
    })
    citaMedica: Partial<CitaMedica>,
    @param.query.object('where', getWhereSchemaFor(CitaMedica)) where?: Where<CitaMedica>,
  ): Promise<Count> {
    return this.pacienteRepository.citaMedicas(id).patch(citaMedica, where);
  }

  @del('/pacientes/{id}/cita-medicas', {
    responses: {
      '200': {
        description: 'Paciente.CitaMedica DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CitaMedica)) where?: Where<CitaMedica>,
  ): Promise<Count> {
    return this.pacienteRepository.citaMedicas(id).delete(where);
  }
}
