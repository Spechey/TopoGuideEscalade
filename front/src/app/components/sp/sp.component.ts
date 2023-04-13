import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TopoElementComponent} from '../topo-element/topo-element.component';
import {ActivatedRoute, Router} from '@angular/router';
import {RtgApiService} from '../../services/rtg-api.service';

@Component({
  selector: 'app-sp',
  templateUrl: './sp.component.html',
  styleUrls: ['./sp.component.scss']
})
export class SpComponent extends TopoElementComponent {

  type = 'sp';
  ws: any[] = []; // ways

  // override generic refeshData to load W
  refreshData() {
    if (!!this.type) {
      this.rtgApiService.getTopoElementDatas(this.type, this.id)
        .then((d) => {
          if (!!d.descl) {
            d.descl = d.descl.replace(/§/g, '\n');
          }
          this.datas = d;
          // console.log('this.datas.w', this.datas.w);
          this.rtgApiService.getTopoElementsDatas('w', this.datas.w)
            .then((ws) => {
              this.ws = ws;
              // console.log('load this.ws', this.ws);
            });
        });
    }
  }


  get childrens(): any[] {
    // console.log('use this.ws', this.ws);
    return this.ws;
  }

  getWName(w) {
    if (!!w.name) {
      return w.name;
    }
    return this.datas.descc;
  }
  getWH(w) {
    if (!!w.h) {
      return w.h;
    }
    return this.datas.h;
  }
  getWOrientation(w) {
    return this.datas.o;
  }
  getWDesc(w) {
    if (!!w.descl) {
      return w.descl;
    }
    if (!!w.descc) {
      return w.descc;
    }
    return this.desc;
  }
}
