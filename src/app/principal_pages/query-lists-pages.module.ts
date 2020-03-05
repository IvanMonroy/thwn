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


@NgModule({
  declarations: [
    QueryListsComponent,
    GalleryImagesComponent,
    WorksPathComponent
  ],
  exports: [
    QueryListsComponent,
    GalleryImagesComponent,
    WorksPathComponent
  ],
  entryComponents:  [
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatTabsModule,
    RouterModule,
    MatFormFieldModule,FormsModule, ReactiveFormsModule,MatInputModule,
    GalleryModule,
    LightboxModule,
    GallerizeModule,
  ],
  providers: []
})
export class QueryListsPagesModule { }
