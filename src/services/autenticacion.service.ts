import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';

// En el servicio Autenticacion, importar password-generator, luego del import.
const generador = require('password-generator');
// En el servicio Autenticacion, importar crypto-js.
const cryptoJS = require('crypto-js');
// Una vez instalado, se debe importar o asignarlo a una constante donde se vaya a utilizar
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ) { }

  /*
   * Add service methods here
   */
  GenerarClave() {
    let clave = generador(8, false);
    return clave;
  }

  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarUsuario(usuario: string, clave: string) {
    try {
      let user = this.usuarioRepository.findOne({
        where: {
          username: usuario,
          password: clave
        }
      });
      if (user) {
        return user;
      }
      return false;
    } catch {
      return false;
    }
  }

  GenerarTokenJWT(usuario: Usuario) { // se genera JWT sin la firma especifica del servidor
    let token = jwt.sign({
      data: {
        id: usuario.id,
        correo: usuario.correo,
        nombre: usuario.nombre
      }
    },
      Llaves.llaveJWT);
    return token;
  }

  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.llaveJWT);
      return datos;
    } catch {
      return false;
    }
  }

}
