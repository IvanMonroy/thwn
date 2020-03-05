import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './principal_pages/index/index.component'
import {QueryListsComponent} from './principal_pages/query-lists/query-lists.component'
import { GalleryImagesComponent } from './principal_pages/gallery-images/gallery-images.component';
import { WorksPathComponent } from './principal_pages/works-path/works-path.component';

const routes: Routes = [
{
  path: "",
  component: IndexComponent,
  data: { title: "Inicio" }
},
{
  path: "products",
  component: QueryListsComponent,
  data: { title: "Productos", items_icon: 'directions_car', model: 'products' }
},
{
  path: "images/:id",
  component: GalleryImagesComponent,
  data: { title: "Imagenes", items_icon: 'directions_car', model: 'works' }
},
{
  path: "works-path",
  component: WorksPathComponent,
  data: { title: "Nuestros trabajos", items_icon: 'directions_car', model: 'works' }
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
