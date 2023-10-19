import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ExamenFisico, ExamenFisicoRelations, Paciente, Medico} from '../models';
import {PacienteRepository} from './paciente.repository';
import {MedicoRepository} from './medico.repository';

export class ExamenFisicoRepository extends DefaultCrudRepository<
  ExamenFisico,
  typeof ExamenFisico.prototype.id,
  ExamenFisicoRelations
> {

  public readonly paciente: BelongsToAccessor<Paciente, typeof ExamenFisico.prototype.id>;

  public readonly medico: BelongsToAccessor<Medico, typeof ExamenFisico.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PacienteRepository') protected pacienteRepositoryGetter: Getter<PacienteRepository>, @repository.getter('MedicoRepository') protected medicoRepositoryGetter: Getter<MedicoRepository>,
  ) {
    super(ExamenFisico, dataSource);
    this.medico = this.createBelongsToAccessorFor('medico', medicoRepositoryGetter,);
    this.registerInclusionResolver('medico', this.medico.inclusionResolver);
    this.paciente = this.createBelongsToAccessorFor('paciente', pacienteRepositoryGetter,);
    this.registerInclusionResolver('paciente', this.paciente.inclusionResolver);
  }
}
