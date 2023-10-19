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
  CitaMedica,
} from '../models';
import {MedicoRepository} from '../repositories';

export class MedicoCitaMedicaController {
  constructor(
    @repository(MedicoRepository) protected medicoRepository: MedicoRepository,
  ) { }

  @get('/medicos/{id}/cita-medicas', {
    responses: {
      '200': {
        description: 'Array of Medico has many CitaMedica',
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
    return this.medicoRepository.citaMedicas(id).find(filter);
  }

  @post('/medicos/{id}/cita-medicas', {
    responses: {
      '200': {
        description: 'Medico model instance',
        content: {'application/json': {schema: getModelSchemaRef(CitaMedica)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Medico.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CitaMedica, {
            title: 'NewCitaMedicaInMedico',
            exclude: ['id'],
            optional: ['medicoId']
          }),
        },
      },
    }) citaMedica: Omit<CitaMedica, 'id'>,
  ): Promise<CitaMedica> {
    return this.medicoRepository.citaMedicas(id).create(citaMedica);
  }

  @patch('/medicos/{id}/cita-medicas', {
    responses: {
      '200': {
        description: 'Medico.CitaMedica PATCH success count',
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
    return this.medicoRepository.citaMedicas(id).patch(citaMedica, where);
  }

  @del('/medicos/{id}/cita-medicas', {
    responses: {
      '200': {
        description: 'Medico.CitaMedica DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CitaMedica)) where?: Where<CitaMedica>,
  ): Promise<Count> {
    return this.medicoRepository.citaMedicas(id).delete(where);
  }
}
