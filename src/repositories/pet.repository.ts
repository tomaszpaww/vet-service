import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDbDataSource} from '../datasources';
import {Pet, PetRelations, Owner, Species} from '../models';
import {OwnerRepository} from './owner.repository';
import {SpeciesRepository} from './species.repository';

export class PetRepository extends DefaultCrudRepository<
  Pet,
  typeof Pet.prototype.id,
  PetRelations
> {

  public readonly owner: BelongsToAccessor<Owner, typeof Pet.prototype.id>;

  public readonly species: BelongsToAccessor<Species, typeof Pet.prototype.id>;

  constructor(
    @inject('datasources.postgres_db') dataSource: PostgresDbDataSource, @repository.getter('OwnerRepository') protected ownerRepositoryGetter: Getter<OwnerRepository>, @repository.getter('SpeciesRepository') protected speciesRepositoryGetter: Getter<SpeciesRepository>,
  ) {
    super(Pet, dataSource);
    this.species = this.createBelongsToAccessorFor('species', speciesRepositoryGetter,);
    this.registerInclusionResolver('species', this.species.inclusionResolver);
    this.owner = this.createBelongsToAccessorFor('owner', ownerRepositoryGetter,);
    this.registerInclusionResolver('owner', this.owner.inclusionResolver);
  }
}
