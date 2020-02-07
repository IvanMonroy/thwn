import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import {IndexComponent} from './index/index.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    IndexComponent
  ],
  exports: [
    IndexComponent,
  ],
  entryComponents:  [
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule
  ],
  providers: []
})
export class PrincipalPagesModule { }
