import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CitaMedica, CitaMedicaRelations, Paciente, Medico} from '../models';
import {PacienteRepository} from './paciente.repository';
import {MedicoRepository} from './medico.repository';

export class CitaMedicaRepository extends DefaultCrudRepository<
  CitaMedica,
  typeof CitaMedica.prototype.id,
  CitaMedicaRelations
> {

  public readonly paciente: BelongsToAccessor<Paciente, typeof CitaMedica.prototype.id>;

  public readonly medico: BelongsToAccessor<Medico, typeof CitaMedica.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PacienteRepository') protected pacienteRepositoryGetter: Getter<PacienteRepository>, @repository.getter('MedicoRepository') protected medicoRepositoryGetter: Getter<MedicoRepository>,
  ) {
    super(CitaMedica, dataSource);
    this.medico = this.createBelongsToAccessorFor('medico', medicoRepositoryGetter,);
    this.registerInclusionResolver('medico', this.medico.inclusionResolver);
    this.paciente = this.createBelongsToAccessorFor('paciente', pacienteRepositoryGetter,);
    this.registerInclusionResolver('paciente', this.paciente.inclusionResolver);
  }
}
