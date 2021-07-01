import {belongsTo, model, property} from '@loopback/repository';
import {Animal} from './animal.model';
import {Species} from './species.model';

@model({
  settings: {
    indexes: {
      uniqueTrackingId: {
        keys: "trackingId",
        options: {unique: true}
      }
    },
    foreignKeys: {
      fk_wildanimal_speciesId: {
        name: 'fk_wildanimal_speciesId',
        entity: 'Species',
        entityKey: 'id',
        foreignKey: 'speciesId',
      },
    }
  }
})
export class WildAnimal extends Animal {
  @property({
    type: 'number',
    index: {
      unique: true,
    },
  })
  trackingId?: number;

  @belongsTo(() => Species, {}, {required: true})
  speciesId: number;

  constructor(data?: Partial<WildAnimal>) {
    super(data);
  }
}

export interface WildAnimalRelations {
  // describe navigational properties here
}

export type WildAnimalWithRelations = WildAnimal & WildAnimalRelations;
