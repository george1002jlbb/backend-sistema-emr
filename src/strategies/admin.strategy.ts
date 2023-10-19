import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';
export class EstrategiaAdministrador implements AuthenticationStrategy {
  name: string = 'admin';

  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) { }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    // cuando se haga la autenticacion se obtiene el token
    let token = parseBearerToken(request);
    if (token) {
      // se valida el token con el metodo
      let datos = this.servicioAutenticacion.ValidarTokenJWT(token);
      if (datos) {
        let perfil: UserProfile = Object.assign({nombre: datos.data.nombre});
        return perfil;
      } else {
        throw new HttpErrors[401]('El token incluido no es valido');
      }
    } else {
      throw new HttpErrors[401]('No se ha incluido un token en la solicitud');
    }
  }
}
