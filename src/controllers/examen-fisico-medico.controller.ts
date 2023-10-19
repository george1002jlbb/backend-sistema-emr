import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ExamenFisico,
  Medico,
} from '../models';
import {ExamenFisicoRepository} from '../repositories';

export class ExamenFisicoMedicoController {
  constructor(
    @repository(ExamenFisicoRepository)
    public examenFisicoRepository: ExamenFisicoRepository,
  ) { }

  @get('/examen-fisicos/{id}/medico', {
    responses: {
      '200': {
        description: 'Medico belonging to ExamenFisico',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Medico),
          },
        },
      },
    },
  })
  async getMedico(
    @param.path.string('id') id: typeof ExamenFisico.prototype.id,
  ): Promise<Medico> {
    return this.examenFisicoRepository.medico(id);
  }
}
