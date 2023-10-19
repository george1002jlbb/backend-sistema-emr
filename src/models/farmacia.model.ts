import {Entity, model, property, hasMany} from '@loopback/repository';
import {OrdenEnvio} from './orden-envio.model';

@model()
export class Farmacia extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
  })
  estado?: string;

  @hasMany(() => OrdenEnvio)
  ordenEnvios: OrdenEnvio[];

  constructor(data?: Partial<Farmacia>) {
    super(data);
  }
}

export interface FarmaciaRelations {
  // describe navigational properties here
}

export type FarmaciaWithRelations = Farmacia & FarmaciaRelations;
