import { Component, OnInit } from '@angular/core';
import {TopoElementComponent} from '../topo-element/topo-element.component';
import {RouterModule} from '@angular/router';


@Component({
  selector: 'app-sc',
  templateUrl: './sc.component.html',
  styleUrls: ['./sc.component.scss']
})
export class ScComponent extends TopoElementComponent {

  type = 'sc';

  get childrens(): any[] {
    return this.datas.sp;
  }


}
