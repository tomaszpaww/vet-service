import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Owner} from './owner.model';

@model({
  settings: {
    foreignKeys: {
      fk_address_ownerId: {
        name: 'fk_address_ownerId',
        entity: 'Owner',
        entityKey: 'id',
        foreignKey: 'ownerId',
      },
    }
  }
})
export class Address extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  street?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
  })
  country?: string;

  @property({
    type: 'string',
  })
  zipCode?: string;

  @belongsTo(() => Owner, {}, {required: true})
  ownerId: number;

  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {
  // describe navigational properties here
}

export type AddressWithRelations = Address & AddressRelations;
