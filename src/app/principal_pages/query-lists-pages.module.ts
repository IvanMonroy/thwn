import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import {QueryListsComponent} from './query-lists/query-lists.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    QueryListsComponent
  ],
  exports: [
    QueryListsComponent,
  ],
  entryComponents:  [
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatTabsModule
  ],
  providers: []
})
export class QueryListsPagesModule { }
