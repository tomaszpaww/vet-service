import {model, property} from '@loopback/repository';
import {Animal} from '.';

@model()
export class WildAnimal extends Animal {
  @property({
    type: 'number',
  })
  trackingId?: number;


  constructor(data?: Partial<WildAnimal>) {
    super(data);
  }
}

export interface WildAnimalRelations {
  // describe navigational properties here
}

export type WildAnimalWithRelations = WildAnimal & WildAnimalRelations;
