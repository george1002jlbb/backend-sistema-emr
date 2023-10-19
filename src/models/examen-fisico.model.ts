import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Paciente} from './paciente.model';
import {Medico} from './medico.model';

@model()
export class ExamenFisico extends Entity {
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
  plan_tratamientos: string;

  @property({
    type: 'string',
    required: true,
  })
  prescripcion_medicamentos: string;

  @property({
    type: 'string',
  })
  estado?: string;

  @belongsTo(() => Paciente)
  pacienteId: string;

  @belongsTo(() => Medico)
  medicoId: string;

  constructor(data?: Partial<ExamenFisico>) {
    super(data);
  }
}

export interface ExamenFisicoRelations {
  // describe navigational properties here
}

export type ExamenFisicoWithRelations = ExamenFisico & ExamenFisicoRelations;
