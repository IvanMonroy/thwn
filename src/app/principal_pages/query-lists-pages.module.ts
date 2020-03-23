import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import {QueryListsComponent} from './query-lists/query-lists.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from "@angular/material/icon";
import {RouterModule} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { GalleryImagesComponent } from './gallery-images/gallery-images.component';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GallerizeModule } from '@ngx-gallery/gallerize';
import { WorksPathComponent } from './works-path/works-path.component';
import { NewsPathComponent } from './news-path/news-path.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NewsIndexComponent } from './news-index/news-index.component';
import { FindUsComponent, PizzaPartyComponent } from './find-us/find-us.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    QueryListsComponent,
    GalleryImagesComponent,
    WorksPathComponent,
    NewsPathComponent,
    AboutUsComponent,
    NewsIndexComponent,
    FindUsComponent,
    PizzaPartyComponent
    ],
  exports: [
    QueryListsComponent,
    GalleryImagesComponent,
    WorksPathComponent,
    NewsPathComponent,
    AboutUsComponent,
    NewsIndexComponent,
    FindUsComponent,
    PizzaPartyComponent
  ],
  entryComponents:  [
    PizzaPartyComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatTabsModule,
    RouterModule,
    MatFormFieldModule,FormsModule, ReactiveFormsModule,MatInputModule,MatSnackBarModule,
    GalleryModule,
    LightboxModule,
    GallerizeModule,
  ],
  providers: []
})
export class QueryListsPagesModule { }
