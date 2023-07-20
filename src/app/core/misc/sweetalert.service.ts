import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { EmpresasService } from '../services/empresas.service';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor(private empresa:EmpresasService){}

  swalBienvenido(): Promise<any> {
    return new Promise<boolean>(async resolve => {
      Swal.fire({
        title: 'Bienvenido/a al Sistema de Llamado Web',
        text: `Presione Continuar para ingresar y gestionar sus turnos de manera eficiente.`,
        confirmButtonText:'Continuar',
        confirmButtonColor: this.empresa.empresa.color ?? "#BDBBBB"
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
          }else{
            resolve(false);
          }
      })
    }) 
  } 

  swalConfirm(text:string): Promise<any> {
    return new Promise<boolean>(async resolve => {
      Swal.fire({
        title: 'Estimado/a Paciente',
        text: `${text}`,
        confirmButtonText:'Reintentar!',
        confirmButtonColor:this.empresa.empresa.color ?? "#BDBBBB"
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
          }else{
            resolve(false);
          }
      })
    }) 
  } 

  toast(text:string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'error',
      title: text
    })
  }

  swalClose(): void {
    Swal.close();
  }

}
