import {model, property, belongsTo} from '@loopback/repository';
import {Animal} from '.';
import {Owner} from './owner.model';
import {Species} from './species.model';

@model()
export class Pet extends Animal {

  @belongsTo(() => Owner)
  ownerId: number;

  @belongsTo(() => Species)
  speciesId: number;

  constructor(data?: Partial<Pet>) {
    super(data);
  }
}

export interface PetRelations {
  // describe navigational properties here
}

export type PetWithRelations = Pet & PetRelations;
