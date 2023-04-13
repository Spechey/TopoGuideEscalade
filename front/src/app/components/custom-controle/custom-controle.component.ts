import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Map, Control, DomUtil, ControlPosition, LatLng} from 'leaflet';

@Component({
  selector: 'app-custom-controle',
  templateUrl: './custom-controle.component.html',
  styleUrls: ['./custom-controle.component.scss']
})
export class CustomControleComponent implements OnInit, OnDestroy {

  private _map: Map;
  private _id;
  public custom: Control;
  @Input() position: ControlPosition ;


  constructor() {
  }

  ngOnInit() {
    // console.log('init custom map');
  }

  ngOnDestroy() {
    this.map.removeControl(this.custom);
  }

  @Input() set map(map: Map){
    // console.log('set map', map);
    if (map) {
      this._map = map;
      this.update();
    }
  }
  get map(): Map {
    return this._map;
  }
  @Input() set id(id: string){
    // console.log('set id', id);
    if (id) {
      this._id = 'custom-c-' + id;
      this.update();
    }
  }
  get id(): string {
    return this._id;
  }
  update() {
    if (this._map && this.id) {
      const id = this.id;
      const Custom = Control.extend({
        onAdd(map: Map) {
          return DomUtil.get(id);
        },
        onRemove(map: Map) {}
      });
      this.custom = new Custom({
        position: this.position
      }).addTo(this._map);
    }
  }


}
