import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/core/services/turno.service';
import { HubService } from 'src/app/core/services/hub.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetalertService } from 'src/app/core/misc/sweetalert.service';
import { EncryptService } from 'src/app/core/misc/encrypt.service';
import { ValidaRutService } from 'src/app/core/misc/valida-rut.service';
import { EmpresasService } from 'src/app/core/services/empresas.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-llamado',
  templateUrl: './llamado.component.html',
  styleUrls: ['./llamado.component.css']
})
export class LlamadoComponent implements OnInit {

  loading:boolean = false;
  empresa!:any
  tipoId:string = "";
  rut:any;
  turno:any = {};
  poolTurno:any = [];
  id:any;

  constructor(
    private route: ActivatedRoute,
    private appComponent:AppComponent,
    private turnoService:TurnoService,
    private hubService:HubService,
    public empresas:EmpresasService,
    private sweetAlert:SweetalertService,
    private _encryptService: EncryptService,
    private validateRut:ValidaRutService
    ) { }

  async ngOnInit() {
     this.loading = true;
      let guId  = this.route.snapshot.paramMap.get('id');
      this.empresa =  await this.empresas.getEmpresa(guId);

      if(this.empresa){
        this.appComponent.loadEmpresa(this.empresa.color, this.empresa.logo)
        this.atencion();
      }else{
        this.loading = false;
        this.sweetAlert.swalConfirm("Lo sentimos, la empresa no se encuentra configurada").then(resolve =>{
          return resolve;
         });
      }
     
  }


  atencion(){
    if(this.route.snapshot.queryParamMap.get('IDT')){
      this.id = this.route.snapshot.queryParamMap.get('IDT');
      this.rut = this.validateRut.formatearRut(this.route.snapshot.queryParamMap.get('IDU'));
      this.tipoId = "P"
    }else if(this.route.snapshot.queryParamMap.get('IDM')){
      this.id = this.route.snapshot.queryParamMap.get('IDM');
      this.tipoId = "M"
    }

    if(this.id){
      this.verTurno(this.id);
    }else{
      this.sweetAlert.swalConfirm("Lo sentimos, no podemos realizar el seguimiento de tu turno en este momento.").then(resolve =>{
       return resolve;
      });
    }
  }

  async verTurno(idParam:string){
    this.loading = true;

  await this.turnoService.obtenerTurno(idParam,this.tipoId).then(res => {

   if(this.tipoId == "P"){
    if(res.listaTurno && res.listaTurno?.length !== 0 ){
      this.turno = res.listaTurno[0];
      this.llamadoHub();
      this.loading = false;
      if(this.turno.estado == 'I' || this.turno.estado == 'L'){
        this.sweetAlert.swalBienvenido().then(resolve =>{
          return resolve;
         });
      }
    }else if(res.status == false){
      this.loading = false;
      this.sweetAlert.swalConfirm(res.message).then(resolve =>{
        if(resolve)
        this.verTurno(idParam);
       });
    } else{
      throw('Error')
    }
   }else{
    if(res.listaMedic && res.listaMedic?.length !== 0){
      res.listaMedic[0].nombremedico = this._encryptService.getDataForDecrypt(res.listaMedic[0].nombremedico);
      this.turno = res.listaMedic[0];
  
      this.llamadoHub();
      this.loading = false;

      if(this.turno.estado == 'I' || this.turno.estado == 'L'){
        this.sweetAlert.swalBienvenido().then(resolve =>{
          return resolve;
        });
      }

    }else if(res.info?.coderr == "W02"){
      this.loading = false;
      this.sweetAlert.swalConfirm(res.info.deserr).then(resolve =>{
        if(resolve)
        this.verTurno(idParam);
       });
    }else if(res.status == false){
      this.loading = false;
      this.sweetAlert.swalConfirm(res.message).then(resolve =>{
        if(resolve)
        this.verTurno(idParam);
       });
    }else{
      throw('Error')
    }
  }
}).catch((error) => {
  this.loading = false;
  this.sweetAlert.swalConfirm("Lo sentimos, no podemos realizar el seguimiento de tu turno en este momento.").then(resolve =>{
    if(resolve)
    this.verTurno(idParam);
   });
});
}

  async llamadoHub(){    
    let tipo:string;
    this.tipoId ==  "P" ? tipo = "oficina" :  tipo = "medico";

    this.hubService.iniciarConexion(tipo, this.empresa.idEmpresa, this.empresa.idOficina);

       if (this.turno != {} && this.turno.estado == 'A' || this.turno.estado == 'O') {
         localStorage.clear();
         this.hubService.stop()
       }else{
          if(tipo == "oficina"){
            this.getPaciente();
          }else{
            this.getMedic();
          }
       }
  }
  
  getPaciente() {
    this.hubService.signalReceived.subscribe({
      next:  (message: any) => {
        
        if(this.turno.idTurno == message.idTurno){
          this.turno.estado = message.estado;
          this.turno.modulo = message.modulo;
          new Audio('assets/mp3/notifica.mp3').play();

          if (this.turno.estado == 'A' || this.turno.estado == 'O') {
            localStorage.clear();
            this.hubService.stop();
          }
        }
    }});
  }


  getMedic() {
    this.hubService.signalReceived.subscribe({
      next:  (message: any) => {
        if(this.turno.idMedic == message.idMedic){
          this.turno.estado = message.estado;
          new Audio('assets/mp3/notifica.mp3').play();

          if (this.turno.estado == 'A' || this.turno.estado == 'O') {
            localStorage.clear();
            this.hubService.stop();
          }
        }
    }});
  }



}
