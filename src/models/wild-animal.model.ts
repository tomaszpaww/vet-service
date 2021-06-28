import {model, property, belongsTo} from '@loopback/repository';
import {Animal} from '.';
import {Species} from './species.model';

@model()
export class WildAnimal extends Animal {
  @property({
    type: 'number',
  })
  trackingId?: number;

  @belongsTo(() => Species)
  speciesId: number;

  constructor(data?: Partial<WildAnimal>) {
    super(data);
  }
}

export interface WildAnimalRelations {
  // describe navigational properties here
}

export type WildAnimalWithRelations = WildAnimal & WildAnimalRelations;
