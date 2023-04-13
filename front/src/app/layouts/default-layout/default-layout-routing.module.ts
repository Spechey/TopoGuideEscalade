import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent} from './default-layout.component';
import { SiComponent } from '../../components/si/si.component';
import { ScComponent } from '../../components/sc/sc.component';
import { SpComponent } from '../../components/sp/sp.component';
import { WComponent } from '../../components/w/w.component';
import { PiComponent } from '../../components/pi/pi.component';
import {ToolsElementComponent} from '../../components/tools-element/tools-element.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {path: '',
        children: [
          {path: '', component: ToolsElementComponent,  data: { view: 'listsi'}, outlet: 'details'},
          {path: '', component: ToolsElementComponent,  data: { view: 'clean'} },
          {path: '', component: ToolsElementComponent,  data: { view: 'clean'}, outlet: 'routes'},
          {path: '', component: ToolsElementComponent,  data: { view: 'clean'}, outlet: 'pi'}
        ]
      },
      {path: 'si/:id/:name',
        children: [
          {path: '', component: SiComponent,  data: {type: 'si', view: 'infos'} },
          {path: '', component: SiComponent,  data: {type: 'si', view: 'details'}, outlet: 'details'},
          {path: '', component: SiComponent,  data: {type: 'si', view: 'complements'}, outlet: 'complements'},
          {path: '', component: SiComponent,  data: {type: 'si', view: 'topoImage'}, outlet: 'topoImage'},
          {path: '', component: SiComponent,  data: {type: 'si', view: 'routes'}, outlet: 'routes'},
          {path: '', component: SiComponent,  data: {type: 'si', view: 'pi'}, outlet: 'pi'}
        ]
      },
      {path: 'sc/:id/:name',  children: [
          {path: '', component: ScComponent,  data: {type: 'sc', view: 'infos'} },
          {path: '', component: ScComponent,  data: {type: 'sc', view: 'details'}, outlet: 'details'},
          {path: '', component: ScComponent,  data: {type: 'sc', view: 'complements'}, outlet: 'complements'},
          {path: '', component: ScComponent,  data: {type: 'sc', view: 'topoImage'}, outlet: 'topoImage'},          
          {path: '', component: ScComponent,  data: {type: 'sc', view: 'routes'}, outlet: 'routes'},
          {path: '', component: ScComponent,  data: {type: 'sc', view: 'pi'}, outlet: 'pi'}
        ]
      },
      {path: 'sp/:id/:name', children: [
          {path: '', component: SpComponent,  data: {type: 'sp', view: 'infos'} },
          {path: '', component: SpComponent,  data: {type: 'sp', view: 'details'}, outlet: 'details'},
          {path: '', component: SpComponent,  data: {type: 'sp', view: 'complements'}, outlet: 'complements'},
          {path: '', component: SpComponent,  data: {type: 'sp', view: 'topoImage'}, outlet: 'topoImage'},            
          {path: '', component: SpComponent,  data: {type: 'sp', view: 'routes'}, outlet: 'routes'},
          {path: '', component: SpComponent,  data: {type: 'sp', view: 'pi'}, outlet: 'pi'}
        ]
      },
      {path: 'w/:id/:name', children: [
          {path: '', component: WComponent,  data: {type: 'w', view: 'infos'} },
          {path: '', component: WComponent,  data: {type: 'w', view: 'details'}, outlet: 'details'},
          {path: '', component: WComponent,  data: {type: 'w', view: 'complements'}, outlet: 'complements'},
          {path: '', component: WComponent,  data: {type: 'w', view: 'topoImage'}, outlet: 'topoImage'},            
          {path: '', component: WComponent,  data: {type: 'w', view: 'routes'}, outlet: 'routes'},
          {path: '', component: WComponent,  data: {type: 'w', view: 'pi'}, outlet: 'pi'}
        ]
      },
      {path: 'pi/:id/:name', children: [
          {path: '', component: PiComponent,  data: {type: 'pi', view: 'infos'} },
          {path: '', component: PiComponent,  data: {type: 'pi', view: 'details'}, outlet: 'details'},
          {path: '', component: PiComponent,  data: {type: 'w', view: 'complements'}, outlet: 'complements'},
          {path: '', component: PiComponent,  data: {type: 'w', view: 'topoImage'}, outlet: 'topoImage'}, 
          {path: '', component: PiComponent,  data: {type: 'pi', view: 'routes'}, outlet: 'routes'},
          {path: '', component: PiComponent,  data: {type: 'pi', view: 'pi'}, outlet: 'pi'}
        ]
      },
   ]
  }
];

@NgModule({
  imports: [CommonModule,
            RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultLayoutRoutingModule { }
