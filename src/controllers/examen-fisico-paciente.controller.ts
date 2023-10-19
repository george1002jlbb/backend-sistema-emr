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
  Paciente,
} from '../models';
import {ExamenFisicoRepository} from '../repositories';

export class ExamenFisicoPacienteController {
  constructor(
    @repository(ExamenFisicoRepository)
    public examenFisicoRepository: ExamenFisicoRepository,
  ) { }

  @get('/examen-fisicos/{id}/paciente', {
    responses: {
      '200': {
        description: 'Paciente belonging to ExamenFisico',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Paciente),
          },
        },
      },
    },
  })
  async getPaciente(
    @param.path.string('id') id: typeof ExamenFisico.prototype.id,
  ): Promise<Paciente> {
    return this.examenFisicoRepository.paciente(id);
  }
}
