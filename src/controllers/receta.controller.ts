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
import {Receta} from '../models';
import {RecetaRepository} from '../repositories';

@authenticate('admin')
export class RecetaController {
  constructor(
    @repository(RecetaRepository)
    public recetaRepository: RecetaRepository,
  ) { }

  @post('/recetas')
  @response(200, {
    description: 'Receta model instance',
    content: {'application/json': {schema: getModelSchemaRef(Receta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Receta, {
            title: 'NewReceta',
            exclude: ['id'],
          }),
        },
      },
    })
    receta: Omit<Receta, 'id'>,
  ): Promise<Receta> {
    return this.recetaRepository.create(receta);
  }

  @authenticate.skip()
  @get('/recetas/count')
  @response(200, {
    description: 'Receta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Receta) where?: Where<Receta>,
  ): Promise<Count> {
    return this.recetaRepository.count(where);
  }

  @get('/recetas')
  @response(200, {
    description: 'Array of Receta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Receta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Receta) filter?: Filter<Receta>,
  ): Promise<Receta[]> {
    return this.recetaRepository.find(filter);
  }

  @patch('/recetas')
  @response(200, {
    description: 'Receta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Receta, {partial: true}),
        },
      },
    })
    receta: Receta,
    @param.where(Receta) where?: Where<Receta>,
  ): Promise<Count> {
    return this.recetaRepository.updateAll(receta, where);
  }

  @get('/recetas/{id}')
  @response(200, {
    description: 'Receta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Receta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Receta, {exclude: 'where'}) filter?: FilterExcludingWhere<Receta>
  ): Promise<Receta> {
    return this.recetaRepository.findById(id, filter);
  }

  @patch('/recetas/{id}')
  @response(204, {
    description: 'Receta PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Receta, {partial: true}),
        },
      },
    })
    receta: Receta,
  ): Promise<void> {
    await this.recetaRepository.updateById(id, receta);
  }

  @put('/recetas/{id}')
  @response(204, {
    description: 'Receta PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() receta: Receta,
  ): Promise<void> {
    await this.recetaRepository.replaceById(id, receta);
  }

  @del('/recetas/{id}')
  @response(204, {
    description: 'Receta DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.recetaRepository.deleteById(id);
  }
}
