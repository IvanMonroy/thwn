import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './principal_pages/index/index.component'

const routes: Routes = [
{
  path: "",
  component: IndexComponent,
  data: { title: "Inicio" }
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
