import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Medico, MedicoRelations, CitaMedica, ExamenFisico, Receta} from '../models';
import {CitaMedicaRepository} from './cita-medica.repository';
import {ExamenFisicoRepository} from './examen-fisico.repository';
import {RecetaRepository} from './receta.repository';

export class MedicoRepository extends DefaultCrudRepository<
  Medico,
  typeof Medico.prototype.id,
  MedicoRelations
> {

  public readonly citaMedicas: HasManyRepositoryFactory<CitaMedica, typeof Medico.prototype.id>;

  public readonly examenFisicos: HasManyRepositoryFactory<ExamenFisico, typeof Medico.prototype.id>;

  public readonly recetas: HasManyRepositoryFactory<Receta, typeof Medico.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CitaMedicaRepository') protected citaMedicaRepositoryGetter: Getter<CitaMedicaRepository>, @repository.getter('ExamenFisicoRepository') protected examenFisicoRepositoryGetter: Getter<ExamenFisicoRepository>, @repository.getter('RecetaRepository') protected recetaRepositoryGetter: Getter<RecetaRepository>,
  ) {
    super(Medico, dataSource);
    this.recetas = this.createHasManyRepositoryFactoryFor('recetas', recetaRepositoryGetter,);
    this.registerInclusionResolver('recetas', this.recetas.inclusionResolver);
    this.examenFisicos = this.createHasManyRepositoryFactoryFor('examenFisicos', examenFisicoRepositoryGetter,);
    this.registerInclusionResolver('examenFisicos', this.examenFisicos.inclusionResolver);
    this.citaMedicas = this.createHasManyRepositoryFactoryFor('citaMedicas', citaMedicaRepositoryGetter,);
    this.registerInclusionResolver('citaMedicas', this.citaMedicas.inclusionResolver);
  }
}
