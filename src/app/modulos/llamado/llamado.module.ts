import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { LlamadoComponent } from './llamado.component';

const routes: Routes = [
  { path: '', component: LlamadoComponent },

];

@NgModule({
  declarations: [
    LlamadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class LlamadoModule { }
