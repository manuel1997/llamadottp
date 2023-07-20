import { EventEmitter, Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { environment } from "src/environments/environment";

const apiUrl = environment.apiHub;
@Injectable({
  providedIn: 'root'
})
export class HubService {

  private hubConnection!: signalR.HubConnection; 
  public respuestaRecibirPedido= new EventEmitter<string>();
  public signalReceived = new EventEmitter<string>();

  constructor() { }

 iniciarConexion(tipo:string, idEmpresa:string, idOficina:string) {
  this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${apiUrl}/v2/turno-hub`,{
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
    })
      .withAutomaticReconnect({
      nextRetryDelayInMilliseconds: retryContext => {
          if (retryContext.elapsedMilliseconds < 5000) {
              return Math.random() * 500;
          } else {
              return null;
          }
      }
  })
  .configureLogging(signalR.LogLevel.None)
  .build();

    this.hubConnection
    .start()
    .then(() => console.log('Connection Hub'))
    .catch(err => console.log('Error while starting connection: ' + err));

    let medico = `${tipo}${idOficina}${idEmpresa}`;
      
    this.hubConnection.on(medico, (data: any) => {
      this.signalReceived.emit(data);
    });
  }

  
  stop(){
    this.hubConnection.stop();
  }
}
