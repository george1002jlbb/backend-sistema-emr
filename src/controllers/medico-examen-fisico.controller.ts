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
  ExamenFisico,
} from '../models';
import {MedicoRepository} from '../repositories';

export class MedicoExamenFisicoController {
  constructor(
    @repository(MedicoRepository) protected medicoRepository: MedicoRepository,
  ) { }

  @get('/medicos/{id}/examen-fisicos', {
    responses: {
      '200': {
        description: 'Array of Medico has many ExamenFisico',
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
    return this.medicoRepository.examenFisicos(id).find(filter);
  }

  @post('/medicos/{id}/examen-fisicos', {
    responses: {
      '200': {
        description: 'Medico model instance',
        content: {'application/json': {schema: getModelSchemaRef(ExamenFisico)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Medico.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExamenFisico, {
            title: 'NewExamenFisicoInMedico',
            exclude: ['id'],
            optional: ['medicoId']
          }),
        },
      },
    }) examenFisico: Omit<ExamenFisico, 'id'>,
  ): Promise<ExamenFisico> {
    return this.medicoRepository.examenFisicos(id).create(examenFisico);
  }

  @patch('/medicos/{id}/examen-fisicos', {
    responses: {
      '200': {
        description: 'Medico.ExamenFisico PATCH success count',
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
    return this.medicoRepository.examenFisicos(id).patch(examenFisico, where);
  }

  @del('/medicos/{id}/examen-fisicos', {
    responses: {
      '200': {
        description: 'Medico.ExamenFisico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ExamenFisico)) where?: Where<ExamenFisico>,
  ): Promise<Count> {
    return this.medicoRepository.examenFisicos(id).delete(where);
  }
}
