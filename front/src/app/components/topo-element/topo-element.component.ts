import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterModule} from '@angular/router';
import {RtgApiService} from '../../services/rtg-api.service';
import {Map} from 'leaflet';

@Component({
  selector: 'app-topo-element',
  templateUrl: './topo-element.component.html',
  styleUrls: ['./topo-element.component.scss']
})
export class TopoElementComponent implements OnInit, OnDestroy {

  @Input() id;
  @Input() type;
  @Input() view;
  @Input() datas;
  @Input() index;

  map: Map;
  navSubscription;
  maxLenTitre = 30;

    constructor(public router: Router,
              protected route: ActivatedRoute,
              protected rtgApiService: RtgApiService) { }

  ngOnInit(): void {

    if (!this.view
      && !!this.route.snapshot.data.view) {
      this.view = this.route.snapshot.data.view;
    } else if (!this.view) {
      this.view = 'default';
    }
    if (!this.type && !!this.route.snapshot.data.type) {
      this.type = this.route.snapshot.data.type;
    }
    if (!!this.datas) {
      this.id = this.datas.id;
    } else if (!this.id) { // si on a pas l'id en param on le prend de l'URL
      this.navSubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.refreshRouteData();
        }
      });
      this.refreshRouteData();
    } else if (!!this.type) {
      this.refreshData();
    }
    // console.log('Id', this.id, 'Type', this.type, 'datas', this.datas);
  }
  ngOnDestroy() {
    if (this.navSubscription) {
      this.navSubscription.unsubscribe();
    }
  }

  refreshRouteData() {
    // console.log('refreshRouteData', this.route.snapshot);
    this.id = this.route.snapshot.paramMap.get('id');
    this.type = this.route.snapshot.data.type; // this.route.snapshot.routeConfig.path.split('/')[0];
    this.refreshData();
  }
  refreshData() {
    // BUG, parfois l'ID est l'objet lui meme ... je ne sais pas d'ou cela provient
    if (!!this.type && typeof this.id == 'string') {
      this.rtgApiService.getTopoElementDatas(this.type, this.id)
        .then((d) => {
          if (!!d.descl) {
            d.descl = d.descl.replace(/§/g, '\n');
          }
          this.datas = d;

          // load navigation
          this.addNavigationDatas()

        });
    }
  }

  get loaded(): boolean {
    return (!!this.datas);
  }

  get titre(): string {
    if (!this.datas) { return ''; }

    if (!!this.datas.name) {
      return this.datas.name;
    }
    if (this.type === 'pi') {
      if (!!this.datas.descc
      && this.datas.descc.length <= this.maxLenTitre) {
        return this.datas.descc;
      }
      switch (this.datas.type) {
        case 'p' :
          return 'Parking';
        case 'ffme' :
          return 'Club FFME';
        case 'pdv' :
          return 'Point de vue';
        case 'acces' :
          return 'Accès';
        case 'slackline' :
          return 'Slackline';
        case 'climbingcrew' :
          return 'Climbingcrew';
        case 'partenaire' :
          return 'Partenaire';
        case 'caf' :
          return 'Club Alpin';
      }
      return 'Point d\'interet';
    }

    return '';
  }
  get desc(): string {
    if (!this.datas) { return ''; }

    if (!!this.datas.descl && this.datas.descl !== '') {
      return this.datas.descl;
    }
    if (!!this.datas.descc
      && ((this.datas.descc.length > this.maxLenTitre && this.type === 'pi')
           || this.type !== 'pi')) {
      return this.datas.descc;
    }
    return '';
  }
  get desccourte(): string {
    if (!this.datas) { return ''; }

    if (!!this.datas.descc) {
      return this.datas.descc;
    }
    if (!!this.datas.descc
      && ((this.datas.descc.length > this.maxLenTitre && this.type === 'pi')
        || this.type !== 'pi')) {
      return this.datas.descc;
    }
    return '';
  }


  get childrens(): any[] {
    return [];
  }

  get PIs(): any[] {
    if (!this.datas) { return []; }

    if (!!this.datas.pi) {
      return this.datas.pi;
    }
    return [];
  }

  get complements(): any[] {
    if (!!this.datas && !!this.datas.comp) {
      return this.datas.comp;
    }
    return [];
  }

  img(size: string): string{
    return this.rtgApiService.getImgUrl(this.type, size, this.id);
  }

  setImageMap(map: Map) {
    // console.log('set map');
    this.map = map;
  }
  
  // navigation
  addNavigationDatas() {
    const currentId = this.datas.id;
    switch (this.datas.type) {
      case 'sc' :
        this.rtgApiService.getTopoElementDatas('si', this.datas.si)
        .then((d) => {
            this.datas.canLeft = false;
            this.datas.canRight = false;
            for (let i=0;i<d.sc.length;i++) {
              if (currentId == d.sc[i]) {
                this.datas.canLeft = (0 < i); 
                this.datas.canRight = ((i+1) < d.sc.length);
                if (this.datas.canLeft) {
                  this.datas.left = d.sc[(i-1)];
                }
                if (this.datas.canRight) {
                  this.datas.right = d.sc[(i+1)];
                } 
              }
            }
        });
        break;
      case 'sp' :
        this.rtgApiService.getTopoElementDatas('sc', this.datas.sc)
        .then((d) => {
          this.datas.canLeft = false;
          this.datas.canRight = false;
          for (let i=0;i<d.sp.length;i++) {
            if (currentId == d.sp[i]) {
              this.datas.canLeft = (0 < i); 
              this.datas.canRight = ((i+1) < d.sp.length);
              if (this.datas.canLeft) {
                this.datas.left = d.sp[(i-1)];
              }
              if (this.datas.canRight) {
                this.datas.right = d.sp[(i+1)];
              } 
            }
          }
        });
        break;
      case 'w' :
        this.rtgApiService.getTopoElementDatas('sp', this.datas.sp)
        .then((d) => {
          this.datas.canLeft = false;
          this.datas.canRight = false;
          for (let i=0;i<d.w.length;i++) {
            if (currentId == d.w[i]) {
              this.datas.canLeft = (0 < i); 
              this.datas.canRight = ((i+1) < d.w.length);
              if (this.datas.canLeft) {
                this.datas.left = d.w[(i-1)];
              }
              if (this.datas.canRight) {
                this.datas.right = d.w[(i+1)];
              } 
            }
          }
        });        
        break;
    }
  }

  get canLeft(): boolean {
    return this.datas.canLeft;
  }

  get canRight(): boolean {
    return this.datas.canRight;
  }

  goLeft(): void{
    console.log('goLeft');
    this.router.navigate([ this.datas.type, this.datas.left, '-'])
  }
  goRight(): void{
    console.log('goRight');
    this.router.navigate([ this.datas.type, this.datas.right, '-'])
  }
 

}
