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
  Farmacia,
} from '../models';
import {OrdenEnvioRepository} from '../repositories';

export class OrdenEnvioFarmaciaController {
  constructor(
    @repository(OrdenEnvioRepository)
    public ordenEnvioRepository: OrdenEnvioRepository,
  ) { }

  @get('/orden-envios/{id}/farmacia', {
    responses: {
      '200': {
        description: 'Farmacia belonging to OrdenEnvio',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Farmacia),
          },
        },
      },
    },
  })
  async getFarmacia(
    @param.path.string('id') id: typeof OrdenEnvio.prototype.id,
  ): Promise<Farmacia> {
    return this.ordenEnvioRepository.farmacia(id);
  }
}
