import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDbDataSource} from '../datasources';
import {WildAnimal, WildAnimalRelations, Species} from '../models';
import {SpeciesRepository} from './species.repository';

export class WildAnimalRepository extends DefaultCrudRepository<
  WildAnimal,
  typeof WildAnimal.prototype.id,
  WildAnimalRelations
> {

  public readonly species: BelongsToAccessor<Species, typeof WildAnimal.prototype.id>;

  constructor(
    @inject('datasources.postgres_db') dataSource: PostgresDbDataSource, @repository.getter('SpeciesRepository') protected speciesRepositoryGetter: Getter<SpeciesRepository>,
  ) {
    super(WildAnimal, dataSource);
    this.species = this.createBelongsToAccessorFor('species', speciesRepositoryGetter,);
    this.registerInclusionResolver('species', this.species.inclusionResolver);
  }
}
