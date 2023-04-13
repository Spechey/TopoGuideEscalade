/// <reference types='leaflet-sidebar-v2' />
import {Component, AfterViewInit, Input, OnInit, Output, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import * as L from 'leaflet';
import {LatLngExpression} from 'leaflet';
import {RtgApiService} from '../../services/rtg-api.service';
import {RtgStyleService} from '../../services/rtg-style.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { SidebarOptions } from 'leaflet';
import {NgxSidebarControlComponent} from '@runette/ngx-leaflet-sidebar';
import { EventEmitter } from '@angular/core';
import {Map} from 'leaflet';



@Component({
  selector: 'app-topo-image',
  templateUrl: './topoImage.component.html',
  // attention, il faut ajouter le "./node_modules/leaflet/dist/leaflet.css" dans les styles du angular.json
  styleUrls: ['./topoImage.component.scss'],
})
export class TopoImageComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() position: LatLngExpression = [46.314594, 4.72];
  _map: any;
  zoom: number = 9;
  layer: any;
  style: 'height: 100vf;';
  imageOverlayUrl = "https://www.pepsup.com/resources/images/CLUBS/000/000/292/2928/IMAGE/banner.png";

  @Input() datas: any;
  @Input() left = false;
  @Input() right = false;
  @Output() onLeft: EventEmitter<any> = new EventEmitter();
  @Output() onRight: EventEmitter<any> = new EventEmitter();
  markers: any[] = [];
  customIcon;
  navSubscription;

    constructor(private el:ElementRef,
              protected router: Router,
              protected route: ActivatedRoute,
              protected rtgApiService: RtgApiService,
              protected rtgStyleService: RtgStyleService) { }

  ngOnInit(): void {

   
  }
  ngOnDestroy() {
    if (this.navSubscription) {
      this.navSubscription.unsubscribe();
    }
  }



  ngAfterViewInit(): void {
    // patch to add position
    L.Map.include({
      _initControlPos: function () {
        var corners = this._controlCorners = {},
          l = 'leaflet-',
          container = this._controlContainer =
            L.DomUtil.create('div', l + 'control-container', this._container);
    
        function createCorner(vSide, hSide) {
          var className = l + vSide + ' ' + l + hSide;
    
          corners[vSide + hSide] = L.DomUtil.create('div', className, container);
        }
    
        createCorner('top', 'left');
        createCorner('top', 'right');
        createCorner('bottom', 'left');
        createCorner('bottom', 'right');
    
        createCorner('top', 'center');
        createCorner('middle', 'center');
        createCorner('middle', 'left');
        createCorner('middle', 'right');
        createCorner('bottom', 'center');
      }
    });

    this.navSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.cleanMap()
        this.refreshRouteData();
      }
    });
    this.createMap();
  }
  cleanMap() {
    let m: any;
    while (m = this.markers.pop()){
      this._map.removeLayer(m);
    }
    this._map.removeLayer(this.layer);
  
  }
  refreshRouteData() {
    this.rtgApiService.getTopoElementDatas(this.route.snapshot.data.type,this.route.snapshot.paramMap.get('id'))
    .then( datas => {
      this.datas = datas;
      this.createMap();
    })
  }
  createMap() {

    this.imageOverlayUrl = this.rtgApiService.getImgUrl(this.datas.type, 'F', this.datas.id);
    this.getImage(this.imageOverlayUrl).then(img => {
      // cas générale
      let bound = new L.LatLngBounds( [[0,0],[img.height * this.el.nativeElement.offsetHeight, img.width * this.el.nativeElement.offsetHeight]]);
      // cas mode paysage
      if (img.height > img.width  && this.el.nativeElement.offsetHeight > this.el.nativeElement.offsetWidth) {
        bound = new L.LatLngBounds( [[0,0],[img.height * this.el.nativeElement.nativeElement, img.width * this.el.nativeElement.nativeElement]]);
      }
      
      if (this._map == undefined) {
        this._map = L.map('topoImage', {
            maxZoom: 2,
            minZoom: -10,
            zoomDelta: 1,
            maxBounds: bound,
            crs: L.CRS.Simple
            }
        );
      } else {
        this._map.maxBounds = bound;
      }
      this.layer =L.imageOverlay(img.src ,
        bound,
        {
          attribution: 'Topo Guide Escalade'
        }
      );      
      this.layer.addTo(this._map);
      this._map.fitBounds(bound);

      this._map.on('drag', function() {
        this._map.panInsideBounds(bound, { animate: false });
      });
      });
  }

  clickLeft() {
    this.onLeft.emit(null);
  }
  
  clickRight() {
    this.onRight.emit(null);
  }

  

  getImage(imgUrl): Promise<ImageEvent>{
    return new Promise<ImageEvent>((resolve) => {
      let image = new Image(); 
      image.src = imgUrl;

      image.onload = (event) => {
        
        if (this.isImageEvent(event.target)) {
          resolve(event.target);
        }
      };

    });
 }

  isImageEvent(e: any): e is ImageEvent {
    return (e && e.width !== undefined && e.height !== undefined && e.src !== undefined);
  }  


}

interface ImageEvent {
  width: number;
  height: number;
  src: string;
}
