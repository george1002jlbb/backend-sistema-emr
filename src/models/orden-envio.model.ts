import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Receta} from './receta.model';
import {Farmacia} from './farmacia.model';

@model()
export class OrdenEnvio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  estado?: string;

  @belongsTo(() => Receta)
  recetaId: string;

  @belongsTo(() => Farmacia)
  farmaciaId: string;

  constructor(data?: Partial<OrdenEnvio>) {
    super(data);
  }
}

export interface OrdenEnvioRelations {
  // describe navigational properties here
}

export type OrdenEnvioWithRelations = OrdenEnvio & OrdenEnvioRelations;
