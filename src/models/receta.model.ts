import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Paciente} from './paciente.model';
import {Medico} from './medico.model';
import {OrdenEnvio} from './orden-envio.model';

@model()
export class Receta extends Entity {
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
  descripcion: string;

  @property({
    type: 'string',
  })
  estado?: string;

  @belongsTo(() => Paciente)
  pacienteId: string;

  @belongsTo(() => Medico)
  medicoId: string;

  @hasMany(() => OrdenEnvio)
  ordenEnvios: OrdenEnvio[];

  constructor(data?: Partial<Receta>) {
    super(data);
  }
}

export interface RecetaRelations {
  // describe navigational properties here
}

export type RecetaWithRelations = Receta & RecetaRelations;
