import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Paciente} from './paciente.model';

@model()
export class HistoriaClinica extends Entity {
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
  diagnosticos_previos: string;

  @property({
    type: 'string',
    required: true,
  })
  tratamientos: string;

  @property({
    type: 'string',
    required: true,
  })
  alergias: string;

  @property({
    type: 'string',
  })
  estado?: string;

  @belongsTo(() => Paciente)
  pacienteId: string;

  constructor(data?: Partial<HistoriaClinica>) {
    super(data);
  }
}

export interface HistoriaClinicaRelations {
  // describe navigational properties here
}

export type HistoriaClinicaWithRelations = HistoriaClinica & HistoriaClinicaRelations;
