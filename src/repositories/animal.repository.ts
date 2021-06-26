import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDbDataSource} from '../datasources';
import {Animal, AnimalRelations, Species} from '../models';
import {SpeciesRepository} from './species.repository';

export class AnimalRepository extends DefaultCrudRepository<
  Animal,
  typeof Animal.prototype.id,
  AnimalRelations
> {

  public readonly species: BelongsToAccessor<Species, typeof Animal.prototype.id>;

  constructor(
    @inject('datasources.postgres_db') dataSource: PostgresDbDataSource, @repository.getter('SpeciesRepository') protected speciesRepositoryGetter: Getter<SpeciesRepository>,
  ) {
    super(Animal, dataSource);
    this.species = this.createBelongsToAccessorFor('species', speciesRepositoryGetter,);
  }
}
