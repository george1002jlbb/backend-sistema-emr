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
  Farmacia,
  OrdenEnvio,
} from '../models';
import {FarmaciaRepository} from '../repositories';

export class FarmaciaOrdenEnvioController {
  constructor(
    @repository(FarmaciaRepository) protected farmaciaRepository: FarmaciaRepository,
  ) { }

  @get('/farmacias/{id}/orden-envios', {
    responses: {
      '200': {
        description: 'Array of Farmacia has many OrdenEnvio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrdenEnvio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<OrdenEnvio>,
  ): Promise<OrdenEnvio[]> {
    return this.farmaciaRepository.ordenEnvios(id).find(filter);
  }

  @post('/farmacias/{id}/orden-envios', {
    responses: {
      '200': {
        description: 'Farmacia model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrdenEnvio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Farmacia.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdenEnvio, {
            title: 'NewOrdenEnvioInFarmacia',
            exclude: ['id'],
            optional: ['farmaciaId']
          }),
        },
      },
    }) ordenEnvio: Omit<OrdenEnvio, 'id'>,
  ): Promise<OrdenEnvio> {
    return this.farmaciaRepository.ordenEnvios(id).create(ordenEnvio);
  }

  @patch('/farmacias/{id}/orden-envios', {
    responses: {
      '200': {
        description: 'Farmacia.OrdenEnvio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdenEnvio, {partial: true}),
        },
      },
    })
    ordenEnvio: Partial<OrdenEnvio>,
    @param.query.object('where', getWhereSchemaFor(OrdenEnvio)) where?: Where<OrdenEnvio>,
  ): Promise<Count> {
    return this.farmaciaRepository.ordenEnvios(id).patch(ordenEnvio, where);
  }

  @del('/farmacias/{id}/orden-envios', {
    responses: {
      '200': {
        description: 'Farmacia.OrdenEnvio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(OrdenEnvio)) where?: Where<OrdenEnvio>,
  ): Promise<Count> {
    return this.farmaciaRepository.ordenEnvios(id).delete(where);
  }
}
