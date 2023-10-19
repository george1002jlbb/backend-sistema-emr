import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Paciente, PacienteRelations, CitaMedica, HistoriaClinica, ExamenFisico, Receta} from '../models';
import {CitaMedicaRepository} from './cita-medica.repository';
import {HistoriaClinicaRepository} from './historia-clinica.repository';
import {ExamenFisicoRepository} from './examen-fisico.repository';
import {RecetaRepository} from './receta.repository';

export class PacienteRepository extends DefaultCrudRepository<
  Paciente,
  typeof Paciente.prototype.id,
  PacienteRelations
> {

  public readonly citaMedicas: HasManyRepositoryFactory<CitaMedica, typeof Paciente.prototype.id>;

  public readonly historiaClinicas: HasManyRepositoryFactory<HistoriaClinica, typeof Paciente.prototype.id>;

  public readonly examenFisicos: HasManyRepositoryFactory<ExamenFisico, typeof Paciente.prototype.id>;

  public readonly recetas: HasManyRepositoryFactory<Receta, typeof Paciente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CitaMedicaRepository') protected citaMedicaRepositoryGetter: Getter<CitaMedicaRepository>, @repository.getter('HistoriaClinicaRepository') protected historiaClinicaRepositoryGetter: Getter<HistoriaClinicaRepository>, @repository.getter('ExamenFisicoRepository') protected examenFisicoRepositoryGetter: Getter<ExamenFisicoRepository>, @repository.getter('RecetaRepository') protected recetaRepositoryGetter: Getter<RecetaRepository>,
  ) {
    super(Paciente, dataSource);
    this.recetas = this.createHasManyRepositoryFactoryFor('recetas', recetaRepositoryGetter,);
    this.registerInclusionResolver('recetas', this.recetas.inclusionResolver);
    this.examenFisicos = this.createHasManyRepositoryFactoryFor('examenFisicos', examenFisicoRepositoryGetter,);
    this.registerInclusionResolver('examenFisicos', this.examenFisicos.inclusionResolver);
    this.historiaClinicas = this.createHasManyRepositoryFactoryFor('historiaClinicas', historiaClinicaRepositoryGetter,);
    this.registerInclusionResolver('historiaClinicas', this.historiaClinicas.inclusionResolver);
    this.citaMedicas = this.createHasManyRepositoryFactoryFor('citaMedicas', citaMedicaRepositoryGetter,);
    this.registerInclusionResolver('citaMedicas', this.citaMedicas.inclusionResolver);
  }
}
