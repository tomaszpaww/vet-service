import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDbDataSource} from '../datasources';
import {Pet, Species, SpeciesRelations, WildAnimal} from '../models';
import {PetRepository} from './pet.repository';
import {WildAnimalRepository} from './wild-animal.repository';

export class SpeciesRepository extends DefaultCrudRepository<
  Species,
  typeof Species.prototype.id,
  SpeciesRelations
> {

  public readonly pets: HasManyRepositoryFactory<Pet, typeof Species.prototype.id>;

  public readonly wildAnimals: HasManyRepositoryFactory<WildAnimal, typeof Species.prototype.id>;

  constructor(
    @inject('datasources.postgres_db') dataSource: PostgresDbDataSource, @repository.getter('PetRepository') protected petRepositoryGetter: Getter<PetRepository>, @repository.getter('WildAnimalRepository') protected wildAnimalRepositoryGetter: Getter<WildAnimalRepository>,
  ) {
    super(Species, dataSource);
    this.wildAnimals = this.createHasManyRepositoryFactoryFor('wildAnimals', wildAnimalRepositoryGetter,);
    this.pets = this.createHasManyRepositoryFactoryFor('pets', petRepositoryGetter,);
    this.registerInclusionResolver('pets', this.pets.inclusionResolver);
    this.registerInclusionResolver('wildAnimals', this.wildAnimals.inclusionResolver);
  }
}
