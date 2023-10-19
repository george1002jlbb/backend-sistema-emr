import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Llaves} from '../config/llaves';
import {OrdenEnvio} from '../models';
import {FarmaciaRepository, OrdenEnvioRepository, PacienteRepository, RecetaRepository} from '../repositories';
const fetch = require('node-fetch');

@authenticate('admin')
export class OrdenEnvioController {
  constructor(
    @repository(OrdenEnvioRepository)
    public ordenEnvioRepository: OrdenEnvioRepository,
    @repository(FarmaciaRepository)
    public farmaciaRepository: FarmaciaRepository,
    @repository(RecetaRepository)
    public recetaRepository: RecetaRepository,
    @repository(PacienteRepository)
    public pacienteRepository: PacienteRepository,
  ) { }

  @post('/orden-envios')
  @response(200, {
    description: 'OrdenEnvio model instance',
    content: {'application/json': {schema: getModelSchemaRef(OrdenEnvio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdenEnvio, {
            title: 'NewOrdenEnvio',
            exclude: ['id'],
          }),
        },
      },
    })
    ordenEnvio: Omit<OrdenEnvio, 'id'>,
  ): Promise<OrdenEnvio> {
    //return this.ordenEnvioRepository.create(ordenEnvio);
    let orden = this.ordenEnvioRepository.create(ordenEnvio);

    /*
     Notificar a la farmacia via correo electronico
    */
    let farmacia = this.farmaciaRepository.findById((await orden).farmaciaId);
    let receta = this.recetaRepository.findById((await orden).recetaId);
    let paciente = this.pacienteRepository.findById((await receta).pacienteId);

    let destino = (await farmacia).correo;
    let asunto = 'Notificacion de Receta Medica Plataforma EMR';
    let contenido = `Hola Sres. Farmacia ${(await farmacia).nombre}, se le envia receta medica ${(await orden).recetaId} del paciente ${(await paciente).nombre} ${(await paciente).apellido} numero de ID ${(await paciente).identificacion}, no responder este correo`;

    fetch(`${Llaves.urlServicioCorreo}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      });

    return orden;
  }

  @authenticate.skip()
  @get('/orden-envios/count')
  @response(200, {
    description: 'OrdenEnvio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OrdenEnvio) where?: Where<OrdenEnvio>,
  ): Promise<Count> {
    return this.ordenEnvioRepository.count(where);
  }

  @get('/orden-envios')
  @response(200, {
    description: 'Array of OrdenEnvio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrdenEnvio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OrdenEnvio) filter?: Filter<OrdenEnvio>,
  ): Promise<OrdenEnvio[]> {
    return this.ordenEnvioRepository.find(filter);
  }

  @patch('/orden-envios')
  @response(200, {
    description: 'OrdenEnvio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdenEnvio, {partial: true}),
        },
      },
    })
    ordenEnvio: OrdenEnvio,
    @param.where(OrdenEnvio) where?: Where<OrdenEnvio>,
  ): Promise<Count> {
    return this.ordenEnvioRepository.updateAll(ordenEnvio, where);
  }

  @get('/orden-envios/{id}')
  @response(200, {
    description: 'OrdenEnvio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrdenEnvio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OrdenEnvio, {exclude: 'where'}) filter?: FilterExcludingWhere<OrdenEnvio>
  ): Promise<OrdenEnvio> {
    return this.ordenEnvioRepository.findById(id, filter);
  }

  @patch('/orden-envios/{id}')
  @response(204, {
    description: 'OrdenEnvio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdenEnvio, {partial: true}),
        },
      },
    })
    ordenEnvio: OrdenEnvio,
  ): Promise<void> {
    await this.ordenEnvioRepository.updateById(id, ordenEnvio);
  }

  @put('/orden-envios/{id}')
  @response(204, {
    description: 'OrdenEnvio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ordenEnvio: OrdenEnvio,
  ): Promise<void> {
    await this.ordenEnvioRepository.replaceById(id, ordenEnvio);
  }

  @del('/orden-envios/{id}')
  @response(204, {
    description: 'OrdenEnvio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ordenEnvioRepository.deleteById(id);
  }
}
