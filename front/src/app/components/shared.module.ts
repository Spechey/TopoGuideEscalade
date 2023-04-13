import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiComponent } from './si/si.component';
import { ScComponent } from './sc/sc.component';
import { SpComponent } from './sp/sp.component';
import { WComponent } from './w/w.component';
import { PiComponent } from './pi/pi.component';
import { TopoElementComponent } from './topo-element/topo-element.component';
import { ComplementComponent } from './complement/complement.component';
import {ToolsElementComponent} from './tools-element/tools-element.component';
import {MapComponent} from './map/map.component';
import {TopoImageComponent} from './topo-image/topoImage.component';
import {CustomControleComponent} from './custom-controle/custom-controle.component';
import {SafeUrlPipe} from '../../shared/pipe/safe-url';
import { FormsModule } from '@angular/forms';
import { NgxSidebarControlModule } from '@runette/ngx-leaflet-sidebar';
import {MarkdownToHtmlModule} from 'markdown-to-html-pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    SiComponent,
    ScComponent,
    SpComponent,
    WComponent,
    PiComponent,
    TopoElementComponent,
    ToolsElementComponent,
    ComplementComponent,
    SafeUrlPipe,
    TopoImageComponent,
    MapComponent,
    CustomControleComponent,
  ],
    imports: [CommonModule,
      FormsModule,
      NgxSidebarControlModule,
      MarkdownToHtmlModule,
      FontAwesomeModule  ],
  exports: [        
    SiComponent,
    ScComponent,
    SpComponent,
    WComponent,
    PiComponent,
    TopoElementComponent,
    ToolsElementComponent,
    ComplementComponent,
    SafeUrlPipe,
    TopoImageComponent,
    MapComponent,
    CustomControleComponent,



    FormsModule,
    NgxSidebarControlModule,
    MarkdownToHtmlModule,
    FontAwesomeModule,    
  ],
})
export class Shared { }
