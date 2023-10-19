import {Entity, model, property, hasMany} from '@loopback/repository';
import {CitaMedica} from './cita-medica.model';
import {ExamenFisico} from './examen-fisico.model';
import {Receta} from './receta.model';

@model()
export class Medico extends Entity {
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
  tarjeta_profesional: string;

  @property({
    type: 'string',
  })
  estado?: string;

  @hasMany(() => CitaMedica)
  citaMedicas: CitaMedica[];

  @hasMany(() => ExamenFisico)
  examenFisicos: ExamenFisico[];

  @hasMany(() => Receta)
  recetas: Receta[];

  constructor(data?: Partial<Medico>) {
    super(data);
  }
}

export interface MedicoRelations {
  // describe navigational properties here
}

export type MedicoWithRelations = Medico & MedicoRelations;
