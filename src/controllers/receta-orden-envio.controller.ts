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
  Receta,
  OrdenEnvio,
} from '../models';
import {RecetaRepository} from '../repositories';

export class RecetaOrdenEnvioController {
  constructor(
    @repository(RecetaRepository) protected recetaRepository: RecetaRepository,
  ) { }

  @get('/recetas/{id}/orden-envios', {
    responses: {
      '200': {
        description: 'Array of Receta has many OrdenEnvio',
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
    return this.recetaRepository.ordenEnvios(id).find(filter);
  }

  @post('/recetas/{id}/orden-envios', {
    responses: {
      '200': {
        description: 'Receta model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrdenEnvio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Receta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdenEnvio, {
            title: 'NewOrdenEnvioInReceta',
            exclude: ['id'],
            optional: ['recetaId']
          }),
        },
      },
    }) ordenEnvio: Omit<OrdenEnvio, 'id'>,
  ): Promise<OrdenEnvio> {
    return this.recetaRepository.ordenEnvios(id).create(ordenEnvio);
  }

  @patch('/recetas/{id}/orden-envios', {
    responses: {
      '200': {
        description: 'Receta.OrdenEnvio PATCH success count',
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
    return this.recetaRepository.ordenEnvios(id).patch(ordenEnvio, where);
  }

  @del('/recetas/{id}/orden-envios', {
    responses: {
      '200': {
        description: 'Receta.OrdenEnvio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(OrdenEnvio)) where?: Where<OrdenEnvio>,
  ): Promise<Count> {
    return this.recetaRepository.ordenEnvios(id).delete(where);
  }
}
