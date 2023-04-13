import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as fa from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {NgxSidebarControlComponent} from '@runette/ngx-leaflet-sidebar';
import {Map} from 'leaflet';


@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  fa = fa;
  type;
  navSubscription;
  sidebars: NgxSidebarControlComponent;
  map: Map;
  haveTopoImage = false;
  viewTopoSwitch = false;


  get havemap(): boolean {
    return (typeof this.map !== 'undefined');
  }


  get viewTopo(): boolean {
    return this.viewTopoSwitch;
  }


  constructor(protected router: Router,
              protected route: ActivatedRoute) { }


  // TODO legende : https://runette.gitbook.io/alcm/custom-controls

  ngOnInit(): void {
      this.navSubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.doOnNavigate();
        }
      });
      this.doOnNavigate();
  }
  doOnNavigate() {
    // TODO attention quand on aura les tags
    // analyse du path

    const pathPart = this.router.url.split('/');
    // console.log('doOnNavigate', pathPart);
    if (pathPart.length > 0) {
      this.type = pathPart[1];
    }
  }
  openSidebar(sidebars: NgxSidebarControlComponent) {
    // on ouvre seulement si pas déjà ouvert
    if (sidebars) {
      if (sidebars.sidebar.getContainer().className.includes('collapsed')) {
        sidebars.sidebar.open('infos');
      }
      this.sidebars = sidebars;
    }
  }
  setMap(map: Map) {
    // console.log('set map');
    this.map = map;
  }

  ngOnDestroy() {
    if (this.navSubscription) {
      this.navSubscription.unsubscribe();
    }
  }



}
