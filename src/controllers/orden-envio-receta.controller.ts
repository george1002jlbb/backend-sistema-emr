import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OrdenEnvio,
  Receta,
} from '../models';
import {OrdenEnvioRepository} from '../repositories';

export class OrdenEnvioRecetaController {
  constructor(
    @repository(OrdenEnvioRepository)
    public ordenEnvioRepository: OrdenEnvioRepository,
  ) { }

  @get('/orden-envios/{id}/receta', {
    responses: {
      '200': {
        description: 'Receta belonging to OrdenEnvio',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Receta),
          },
        },
      },
    },
  })
  async getReceta(
    @param.path.string('id') id: typeof OrdenEnvio.prototype.id,
  ): Promise<Receta> {
    return this.ordenEnvioRepository.receta(id);
  }
}
