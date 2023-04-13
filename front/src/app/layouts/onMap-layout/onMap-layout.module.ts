import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnMapLayoutRoutingModule } from './onMap-layout-routing.module';
import { OnMapLayoutComponent } from './onMap-layout.component';
import {NgxSidebarControlModule} from '@runette/ngx-leaflet-sidebar';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [OnMapLayoutComponent],
    imports: [
        CommonModule,
        OnMapLayoutRoutingModule,
        NgxSidebarControlModule,
        FontAwesomeModule,
        RouterModule
    ],
  exports: [OnMapLayoutComponent],
})
export class OnMapLayoutModule { }
