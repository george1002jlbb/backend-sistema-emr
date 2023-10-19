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
  Paciente,
} from '../models';
import {RecetaRepository} from '../repositories';

export class RecetaPacienteController {
  constructor(
    @repository(RecetaRepository)
    public recetaRepository: RecetaRepository,
  ) { }

  @get('/recetas/{id}/paciente', {
    responses: {
      '200': {
        description: 'Paciente belonging to Receta',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Paciente),
          },
        },
      },
    },
  })
  async getPaciente(
    @param.path.string('id') id: typeof Receta.prototype.id,
  ): Promise<Paciente> {
    return this.recetaRepository.paciente(id);
  }
}
