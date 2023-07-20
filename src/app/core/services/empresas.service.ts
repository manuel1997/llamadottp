import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, throwError} from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  public empresa: any = null;

  constructor(private http: HttpClient) { }


  public async getEmpresa(key: any) {
      await this.loadEmpresa();
      try{
          if(this.empresa[key]){
              this.empresa = this.empresa[key];
              return this.empresa;
          }   
          return false;
      } 
      catch(e:any){
          return false;
      } 
  }

  async loadEmpresa() {
      return new Promise((resolve, reject) => {
          this.http.get(environment.empresasJson)
          .pipe(catchError((error: any): any => {
              resolve(true);
              return (error.json().error || 'Server error');
          }))
          .subscribe((responseData) => {
              this.empresa = responseData;
              resolve(true);
          });
      });
  }
}
