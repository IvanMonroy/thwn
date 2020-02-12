import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './principal_pages/index/index.component'
import {QueryListsComponent} from './principal_pages/query-lists/query-lists.component'

const routes: Routes = [
{
  path: "",
  component: IndexComponent,
  data: { title: "Inicio" }
},
{
  path: "products",
  component: QueryListsComponent,
  data: { title: "Productos" }
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
