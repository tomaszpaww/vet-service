import {Entity, hasMany, model, property} from '@loopback/repository';
import {Pet} from './pet.model';
import {WildAnimal} from './wild-animal.model';

@model()
export class Species extends Entity {
  @property({
    id: true,
    type: 'number',
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  label: string;

  @hasMany(() => Pet)
  pets: Pet[];

  @hasMany(() => WildAnimal)
  wildAnimals: WildAnimal[];

  constructor(data?: Partial<Species>) {
    super(data);
  }
}

export interface SpeciesRelations {
  // describe navigational properties here
}

export type SpeciesWithRelations = Species & SpeciesRelations;
