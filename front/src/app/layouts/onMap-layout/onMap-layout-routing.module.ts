import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OnMapLayoutComponent} from './onMap-layout.component';
import { SiComponent } from '../../components/si/si.component';
import { ScComponent } from '../../components/sc/sc.component';
import { SpComponent } from '../../components/sp/sp.component';
import { WComponent } from '../../components/w/w.component';
import { PiComponent } from '../../components/pi/pi.component';


const routes: Routes = [
  {
    path: '',
    component: OnMapLayoutComponent,
    children: [
      {path: 'si/:id/:name',
        children: [
          {path: '', component: SiComponent,  data: {type: 'si', view: 'infos'} },
          {path: '', component: SiComponent,  data: {type: 'si', view: 'details'}, outlet: 'details'},
          {path: '', component: SiComponent,  data: {type: 'si', view: 'routes'}, outlet: 'routes'},
          {path: '', component: SiComponent,  data: {type: 'si', view: 'pi'}, outlet: 'pi'}
        ]
      },
      {path: 'sc/:id/:name',  children: [
          {path: '', component: ScComponent,  data: {type: 'sc', view: 'infos'} },
          {path: '', component: ScComponent,  data: {type: 'sc', view: 'details'}, outlet: 'details'},
          {path: '', component: ScComponent,  data: {type: 'sc', view: 'routes'}, outlet: 'routes'},
          {path: '', component: ScComponent,  data: {type: 'sc', view: 'pi'}, outlet: 'pi'}
        ]
      },
      {path: 'sp/:id/:name', children: [
          {path: '', component: SpComponent,  data: {type: 'sp', view: 'infos'} },
          {path: '', component: SpComponent,  data: {type: 'sp', view: 'details'}, outlet: 'details'},
          {path: '', component: SpComponent,  data: {type: 'sp', view: 'routes'}, outlet: 'routes'},
          {path: '', component: SpComponent,  data: {type: 'sp', view: 'pi'}, outlet: 'pi'}
        ]
      },
      {path: 'w/:id/:name', children: [
          {path: '', component: WComponent,  data: {type: 'w', view: 'infos'} },
          {path: '', component: WComponent,  data: {type: 'w', view: 'details'}, outlet: 'details'},
          {path: '', component: WComponent,  data: {type: 'w', view: 'routes'}, outlet: 'routes'},
          {path: '', component: WComponent,  data: {type: 'w', view: 'pi'}, outlet: 'pi'}
        ]
      },
      {path: 'pi/:id/:name', children: [
          {path: '', component: PiComponent,  data: {type: 'pi', view: 'infos'} },
          {path: '', component: PiComponent,  data: {type: 'pi', view: 'details'}, outlet: 'details'},
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
export class OnMapLayoutRoutingModule { }
