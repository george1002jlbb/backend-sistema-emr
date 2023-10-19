import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CitaMedica,
  Medico,
} from '../models';
import {CitaMedicaRepository} from '../repositories';

export class CitaMedicaMedicoController {
  constructor(
    @repository(CitaMedicaRepository)
    public citaMedicaRepository: CitaMedicaRepository,
  ) { }

  @get('/cita-medicas/{id}/medico', {
    responses: {
      '200': {
        description: 'Medico belonging to CitaMedica',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Medico),
          },
        },
      },
    },
  })
  async getMedico(
    @param.path.string('id') id: typeof CitaMedica.prototype.id,
  ): Promise<Medico> {
    return this.citaMedicaRepository.medico(id);
  }
}
