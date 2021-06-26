import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDbDataSource} from '../datasources';
import {WildAnimal, WildAnimalRelations} from '../models';

export class WildAnimalRepository extends DefaultCrudRepository<
  WildAnimal,
  typeof WildAnimal.prototype.id,
  WildAnimalRelations
> {
  constructor(
    @inject('datasources.postgres_db') dataSource: PostgresDbDataSource,
  ) {
    super(WildAnimal, dataSource);
  }
}
