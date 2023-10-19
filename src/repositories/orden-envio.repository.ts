import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {OrdenEnvio, OrdenEnvioRelations, Receta, Farmacia} from '../models';
import {RecetaRepository} from './receta.repository';
import {FarmaciaRepository} from './farmacia.repository';

export class OrdenEnvioRepository extends DefaultCrudRepository<
  OrdenEnvio,
  typeof OrdenEnvio.prototype.id,
  OrdenEnvioRelations
> {

  public readonly receta: BelongsToAccessor<Receta, typeof OrdenEnvio.prototype.id>;

  public readonly farmacia: BelongsToAccessor<Farmacia, typeof OrdenEnvio.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RecetaRepository') protected recetaRepositoryGetter: Getter<RecetaRepository>, @repository.getter('FarmaciaRepository') protected farmaciaRepositoryGetter: Getter<FarmaciaRepository>,
  ) {
    super(OrdenEnvio, dataSource);
    this.farmacia = this.createBelongsToAccessorFor('farmacia', farmaciaRepositoryGetter,);
    this.registerInclusionResolver('farmacia', this.farmacia.inclusionResolver);
    this.receta = this.createBelongsToAccessorFor('receta', recetaRepositoryGetter,);
    this.registerInclusionResolver('receta', this.receta.inclusionResolver);
  }
}
