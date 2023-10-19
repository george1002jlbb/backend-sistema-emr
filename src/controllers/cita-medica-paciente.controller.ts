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
  Paciente,
} from '../models';
import {CitaMedicaRepository} from '../repositories';

export class CitaMedicaPacienteController {
  constructor(
    @repository(CitaMedicaRepository)
    public citaMedicaRepository: CitaMedicaRepository,
  ) { }

  @get('/cita-medicas/{id}/paciente', {
    responses: {
      '200': {
        description: 'Paciente belonging to CitaMedica',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Paciente),
          },
        },
      },
    },
  })
  async getPaciente(
    @param.path.string('id') id: typeof CitaMedica.prototype.id,
  ): Promise<Paciente> {
    return this.citaMedicaRepository.paciente(id);
  }
}
