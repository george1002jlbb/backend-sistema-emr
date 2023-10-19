import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Farmacia, FarmaciaRelations, OrdenEnvio} from '../models';
import {OrdenEnvioRepository} from './orden-envio.repository';

export class FarmaciaRepository extends DefaultCrudRepository<
  Farmacia,
  typeof Farmacia.prototype.id,
  FarmaciaRelations
> {

  public readonly ordenEnvios: HasManyRepositoryFactory<OrdenEnvio, typeof Farmacia.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OrdenEnvioRepository') protected ordenEnvioRepositoryGetter: Getter<OrdenEnvioRepository>,
  ) {
    super(Farmacia, dataSource);
    this.ordenEnvios = this.createHasManyRepositoryFactoryFor('ordenEnvios', ordenEnvioRepositoryGetter,);
    this.registerInclusionResolver('ordenEnvios', this.ordenEnvios.inclusionResolver);
  }
}
