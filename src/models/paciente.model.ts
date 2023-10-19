import {Entity, model, property, hasMany} from '@loopback/repository';
import {CitaMedica} from './cita-medica.model';
import {HistoriaClinica} from './historia-clinica.model';
import {ExamenFisico} from './examen-fisico.model';
import {Receta} from './receta.model';

@model()
export class Paciente extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'number',
    required: true,
  })
  identificacion: number;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
  })
  estado?: string;

  @hasMany(() => CitaMedica)
  citaMedicas: CitaMedica[];

  @hasMany(() => HistoriaClinica)
  historiaClinicas: HistoriaClinica[];

  @hasMany(() => ExamenFisico)
  examenFisicos: ExamenFisico[];

  @hasMany(() => Receta)
  recetas: Receta[];

  constructor(data?: Partial<Paciente>) {
    super(data);
  }
}

export interface PacienteRelations {
  // describe navigational properties here
}

export type PacienteWithRelations = Paciente & PacienteRelations;
