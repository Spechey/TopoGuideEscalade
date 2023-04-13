import {Component, Input} from '@angular/core';
import {TopoElementComponent} from '../topo-element/topo-element.component';
import {RouterModule} from '@angular/router';


@Component({
  selector: 'app-si',
  templateUrl: './si.component.html',
  styleUrls: ['./si.component.scss']
})
export class SiComponent extends TopoElementComponent {

  type = 'si';

  get childrens(): any[] {
    return this.datas.sc;
  }

}
