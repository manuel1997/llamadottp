import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom} from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  });


  async obtenerTurno(turnoid:any, tipoId:string): Promise<any>{
    let id = { "id": turnoid };
    try {
      if(tipoId == "P"){
        return await lastValueFrom(this.http.post(`${apiUrl}/Web/v3/seguir`, id, { headers: this.headers}));
      }else{
        return await lastValueFrom(this.http.post(`${apiUrl}/Web/v3/seguirMedic`, id, { headers: this.headers}));
      }
    } catch (error) {
      return { status: false, message: 'Lo sentimos, no podemos realizar el seguimiento de tu turno en este momento.' };
    }
  }




}
