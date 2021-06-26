import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Species} from './species.model';

@model()
export class Animal extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
  })
  birthday?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  vaccinated?: boolean;

  @belongsTo(() => Species)
  speciesId: number;

  constructor(data?: Partial<Animal>) {
    super(data);
  }
}

export interface AnimalRelations {
  // describe navigational properties here
}

export type AnimalWithRelations = Animal & AnimalRelations;
