/// <reference types='leaflet-sidebar-v2' />
import {Component, AfterViewInit, Input, OnInit, Output, OnDestroy, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import {LatLngExpression} from 'leaflet';
import {RtgApiService} from '../../services/rtg-api.service';
import {RtgStyleService} from '../../services/rtg-style.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { SidebarOptions } from 'leaflet';
import {NgxSidebarControlComponent} from '@runette/ngx-leaflet-sidebar';
import { EventEmitter } from '@angular/core';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  // attention, il faut ajouter le "./node_modules/leaflet/dist/leaflet.css" dans les styles du angular.json
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() position: LatLngExpression = [46.314594, 4.72];
  @Input() zoom: number = 9;
  @Input() layer: any;
  @Input() style: 'height: 100vf;';
  @Input() haveSidebars: true;
  @Output() map: EventEmitter<any> = new EventEmitter();
  _map: any;
  @Output() sidebars: EventEmitter<NgxSidebarControlComponent> = new EventEmitter();

  @ViewChild(NgxSidebarControlComponent, {static: false}) sidebarComponents: NgxSidebarControlComponent = null;


  markers: any[] = [];
  customIcon;
  navSubscription;
  public sidebarOptions: SidebarOptions = {
    position: 'right',
    autopan: true,
    closeButton: false,
    container: 'sidebar'
  };
  constructor(protected router: Router,
              protected route: ActivatedRoute,
              protected rtgApiService: RtgApiService,
              protected rtgStyleService: RtgStyleService) { }

  ngOnInit(): void {
    this.layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {});
  }
  ngOnDestroy() {
    if (this.navSubscription) {
      this.navSubscription.unsubscribe();
    }
  }



  ngAfterViewInit(): void {
    this.createMap();
    this.navSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.refreshRouteData();
      }
    });
    this.refreshRouteData();
  }

  refreshRouteData() {
    // TODO first outlet pas sur .... à verifier que c'est toujours bon
    if (this.route.children.length > 0
        && this.route.children[0].snapshot.paramMap.has('id')) {
      const id = this.route.children[0].snapshot.paramMap.get('id');
      const type = this.route.children[0].snapshot.routeConfig.path.split('/')[0];
      this.rtgApiService.getTopoElementDatas(type, id).then((e) => {
        // console.log('map refreshRouteData', id, type, e);
        // TODO update API !!!
        if (e.coords) {
          switch (type) {
            case 'si' :
              this._map.flyTo(e.coords, 17);
              break;
            case 'sc' :
              break;
            case 'sp' :
            case 'w' :
              this._map.flyTo(e.coords, 19);
              break;
            case 'pi' :
              this._map.flyTo(e.coords, 18);
              break;
          }
        }
      });
      // il y a une mise à jours, on emet des evenements lié (ici pour la/les sidebars potentiel)
      if (!!this.sidebarComponents && !!this.sidebarComponents.sidebar) {
        console.log('emit sidebar change');
        this.sidebars.emit(this.sidebarComponents);
      }
    }
  }



  createMap() {
      this._map = L.map('map', {
                        center: this.position,
                        zoom: this.zoom,
                        maxZoom: 24,
                        }
                      );
      this.layer.addTo(this._map);
      // Here the events for zooming and dragging
      this._map.on('zoomend', () => {this.refreshMap(); });
      this._map.on('dragend', () => {this.refreshMap(); });
      this.map.emit(this._map);
      this.refreshMap();
  }

  refreshMap() {
    // console.log('refreshMap', this._map.getBounds(), this._map.getZoom());
    const zoom =  this._map.getZoom();
    this.rtgApiService.getMapsDatas(this._map.getBounds(), zoom)
      .then((datas) => {
        this.cleanMap();
        this.addMapElements(datas);
      });
  }

  cleanMap() {
    let m: any;
    while (m = this.markers.pop()){
      this._map.removeLayer(m);
    }
  }

  addMapElements(elementsDatas: any[]) {
    elementsDatas.forEach(elementDatas => {
      this.addMapElement(new MapElement(elementDatas));
    });
  }
  addMapElement(element: MapElement) {
    const zoom =  this._map.getZoom();
    let m;
    switch (element.type.toLowerCase()) {
      case 'si-multi':
        m = this.rtgStyleService.getMultiSiMarker(element);
        m.addTo(this._map)
          .on('click', e => {
            this._map.flyTo(element.coords, (zoom + 2));
          });
        this.markers.push(m);
        break;
      case 'si-falaise':
      case 'si-sae':
      case 'si-bloc':
      case 'si':
        if (zoom < 17) {
          m = this.rtgStyleService.getSiMarker(element);
          m.addTo(this._map)
            .on('click', e => {
              this.router.navigate(['si', element.id, '-']);
            });
          this.markers.push(m);
        }
        break;
      case 'sc':
        if (zoom > 14 && zoom < 20) {
            this.rtgApiService.getTopoElementDatas('sc', element.id).then((sc) => {
              const p = this.rtgStyleService.getScMarker(sc);
              p.addTo(this._map)
                .on('click', e => {
                  this.router.navigate(['sc', element.id, '-']);
                });
              this.markers.push(p);
            });
        }
        break;
      case 'sp':
        if (zoom >= 18) {
          m = this.rtgStyleService.getSpMarker(element);
          m.addTo(this._map)
            .on('click', e => {
              this.router.navigate(['sp', element.id, '-']);
            });
          this.markers.push(m);
        }
        break;
      case 'gpx':
        if (zoom > 14) {
          m = this.rtgStyleService.getGpxMarker(element);
          m.addTo(this._map);
          this.markers.push(m);
        }
        break;
      case 'pi':
        if (zoom > 15 || element.piType === 'ffme') {
          m = this.rtgStyleService.getPiMarker(element);
          m.addTo(this._map)
            .on('click', e => {
              this.router.navigate(['pi', element.id, '-']);
            });
          this.markers.push(m);
        }
        break;
    }
  }
}



export class MapElement {

  type: string;
  id: string;
  coords: [number, number];
  cot: number;
  cotMin: number;
  cotMax: number;
  piType: string;
  descrition: string;
  nb: number; // nb de site pour les multi Site
  gpxFile: string;

  constructor(data: any[]) {
    this.type = data[0];
    this.id = data[1];
    this.coords = data[2];
    switch (this.type.toLowerCase()) {
      case 'si-multi':
        this.nb = data[6];
        break;
      case 'si-falaise':
      case 'si-sae':
      case 'si-bloc':
      case 'si':
      case 'sc':
      case 'sp':
        this.cot = data[4];
        this.cotMin = data[3];
        this.cotMax = data[5];
        break;
      case 'gpx':
        // console.log(data);
        this.coords = null;
        this.gpxFile = data[2];
        break;
      case 'pi':
        this.piType = data[3];
        this.descrition = data[4];
        break;
    }
  }
}
