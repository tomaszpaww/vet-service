import {belongsTo, model} from '@loopback/repository';
import {Animal} from './animal.model';
import {Owner} from './owner.model';
import {Species} from './species.model';

@model({
  settings: {
    foreignKeys: {
      fk_pet_ownerId: {
        name: 'fk_pet_ownerId',
        entity: 'Owner',
        entityKey: 'id',
        foreignKey: 'ownerId',
      },
      fk_pet_speciedId: {
        name: 'fk_pet_speciedId',
        entity: 'Species',
        entityKey: 'id',
        foreignKey: 'speciesId',
      },
    }
  }
})
export class Pet extends Animal {

  @belongsTo(() => Owner, {}, {required: true})
  ownerId: number;

  @belongsTo(() => Species, {}, {required: true})
  speciesId: number;

  constructor(data?: Partial<Pet>) {
    super(data);
  }
}

export interface PetRelations {
  // describe navigational properties here
}

export type PetWithRelations = Pet & PetRelations;
