import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDbDataSource} from '../datasources';
import {Address, Owner, OwnerRelations, Pet} from '../models';
import {AddressRepository} from './address.repository';
import {PetRepository} from './pet.repository';

export class OwnerRepository extends DefaultCrudRepository<
  Owner,
  typeof Owner.prototype.id,
  OwnerRelations
> {

  public readonly address: HasOneRepositoryFactory<Address, typeof Owner.prototype.id>;

  public readonly pets: HasManyRepositoryFactory<Pet, typeof Owner.prototype.id>;

  constructor(
    @inject('datasources.postgres_db') dataSource: PostgresDbDataSource, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>, @repository.getter('PetRepository') protected petRepositoryGetter: Getter<PetRepository>,
  ) {
    super(Owner, dataSource);
    this.pets = this.createHasManyRepositoryFactoryFor('pets', petRepositoryGetter,);
    this.address = this.createHasOneRepositoryFactoryFor('address', addressRepositoryGetter);
    this.registerInclusionResolver('address', this.address.inclusionResolver);
    this.registerInclusionResolver('pets', this.pets.inclusionResolver);
  }
}
