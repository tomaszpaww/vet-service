import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Address} from './address.model';
import {Pet} from './pet.model';

@model()
export class Owner extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  fullName: string;

  @hasOne(() => Address)
  address: Address;

  @hasMany(() => Pet)
  pets: Pet[];

  constructor(data?: Partial<Owner>) {
    super(data);
  }
}

export interface OwnerRelations {
  // describe navigational properties here
}

export type OwnerWithRelations = Owner & OwnerRelations;
