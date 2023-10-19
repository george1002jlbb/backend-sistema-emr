import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Paciente} from './paciente.model';
import {Medico} from './medico.model';

@model()
export class CitaMedica extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_cita: string;

  @property({
    type: 'string',
  })
  estado?: string;

  @belongsTo(() => Paciente)
  pacienteId: string;

  @belongsTo(() => Medico)
  medicoId: string;

  constructor(data?: Partial<CitaMedica>) {
    super(data);
  }
}

export interface CitaMedicaRelations {
  // describe navigational properties here
}

export type CitaMedicaWithRelations = CitaMedica & CitaMedicaRelations;
