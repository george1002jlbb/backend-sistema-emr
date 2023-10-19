import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Receta, RecetaRelations, Paciente, Medico, OrdenEnvio} from '../models';
import {PacienteRepository} from './paciente.repository';
import {MedicoRepository} from './medico.repository';
import {OrdenEnvioRepository} from './orden-envio.repository';

export class RecetaRepository extends DefaultCrudRepository<
  Receta,
  typeof Receta.prototype.id,
  RecetaRelations
> {

  public readonly paciente: BelongsToAccessor<Paciente, typeof Receta.prototype.id>;

  public readonly medico: BelongsToAccessor<Medico, typeof Receta.prototype.id>;

  public readonly ordenEnvios: HasManyRepositoryFactory<OrdenEnvio, typeof Receta.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PacienteRepository') protected pacienteRepositoryGetter: Getter<PacienteRepository>, @repository.getter('MedicoRepository') protected medicoRepositoryGetter: Getter<MedicoRepository>, @repository.getter('OrdenEnvioRepository') protected ordenEnvioRepositoryGetter: Getter<OrdenEnvioRepository>,
  ) {
    super(Receta, dataSource);
    this.ordenEnvios = this.createHasManyRepositoryFactoryFor('ordenEnvios', ordenEnvioRepositoryGetter,);
    this.registerInclusionResolver('ordenEnvios', this.ordenEnvios.inclusionResolver);
    this.medico = this.createBelongsToAccessorFor('medico', medicoRepositoryGetter,);
    this.registerInclusionResolver('medico', this.medico.inclusionResolver);
    this.paciente = this.createBelongsToAccessorFor('paciente', pacienteRepositoryGetter,);
    this.registerInclusionResolver('paciente', this.paciente.inclusionResolver);
  }
}
