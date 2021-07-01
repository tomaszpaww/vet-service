import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {PostgresDbDataSource} from '../datasources';
import {Address, AddressRelations, Owner} from '../models';
import {OwnerRepository} from './owner.repository';

export class AddressRepository extends DefaultCrudRepository<
  Address,
  typeof Address.prototype.id,
  AddressRelations
> {

  public readonly owner: BelongsToAccessor<Owner, typeof Address.prototype.id>;

  constructor(
    @inject('datasources.postgres_db') dataSource: PostgresDbDataSource, @repository.getter('OwnerRepository') protected ownerRepositoryGetter: Getter<OwnerRepository>,
  ) {
    super(Address, dataSource);
    this.owner = this.createBelongsToAccessorFor('owner', ownerRepositoryGetter,);
    this.registerInclusionResolver('owner', this.owner.inclusionResolver);
  }
}
