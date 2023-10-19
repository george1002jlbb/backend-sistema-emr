import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Receta,
  Medico,
} from '../models';
import {RecetaRepository} from '../repositories';

export class RecetaMedicoController {
  constructor(
    @repository(RecetaRepository)
    public recetaRepository: RecetaRepository,
  ) { }

  @get('/recetas/{id}/medico', {
    responses: {
      '200': {
        description: 'Medico belonging to Receta',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Medico),
          },
        },
      },
    },
  })
  async getMedico(
    @param.path.string('id') id: typeof Receta.prototype.id,
  ): Promise<Medico> {
    return this.recetaRepository.medico(id);
  }
}
