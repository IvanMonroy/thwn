import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './principal_pages/index/index.component'
import {QueryListsComponent} from './principal_pages/query-lists/query-lists.component'
import { GalleryImagesComponent } from './principal_pages/gallery-images/gallery-images.component';
import { WorksPathComponent } from './principal_pages/works-path/works-path.component';
import { NewsPathComponent } from './principal_pages/news-path/news-path.component';
import { AboutUsComponent } from './principal_pages/about-us/about-us.component';
import { NewsIndexComponent } from './principal_pages/news-index/news-index.component';

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
},
{
  path: "news-path/:id",
  component: NewsPathComponent,
  data: { title: "Noticias", items_icon: 'directions_car', model: 'news' }
},
{
  path: "about-us",
  component: AboutUsComponent,
  data: { title: "Acerca de nosotros", items_icon: 'directions_car', model: 'news' }
},
{
  path: "news-index",
  component: NewsIndexComponent,
  data: { title: "Noticias", items_icon: 'directions_car', model: 'news' }
}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
