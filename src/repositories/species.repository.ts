import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDbDataSource} from '../datasources';
import {Species, SpeciesRelations} from '../models';

export class SpeciesRepository extends DefaultCrudRepository<
  Species,
  typeof Species.prototype.id,
  SpeciesRelations
> {
  constructor(
    @inject('datasources.postgres_db') dataSource: PostgresDbDataSource,
  ) {
    super(Species, dataSource);
  }
}
