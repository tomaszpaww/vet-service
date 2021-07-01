import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {PostgresDbDataSource} from '../datasources';
import {Species, WildAnimalRelations} from '../models';
import {WildAnimal} from './../models/wild-animal.model';
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

  async validateUniqunessOfTrackingId(wildAnimal: WildAnimal): Promise<boolean> {
    return (await this.find({where: {trackingId: wildAnimal.trackingId}})).length == 0
  }
}
