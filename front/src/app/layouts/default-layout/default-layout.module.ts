import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultLayoutRoutingModule } from './default-layout-routing.module';
import { DefaultLayoutComponent } from './default-layout.component';
import {NgxSidebarControlModule} from '@runette/ngx-leaflet-sidebar';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule} from '@angular/router';

import { Shared } from '../../components/shared.module'

@NgModule({
  declarations: [DefaultLayoutComponent, ],
    imports: [
        CommonModule,
        DefaultLayoutRoutingModule,
        NgxSidebarControlModule,
        FontAwesomeModule,
        RouterModule,
        Shared
    ],
  exports: [DefaultLayoutComponent],
})
export class DefaultLayoutModule { }
