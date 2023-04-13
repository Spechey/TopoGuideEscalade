import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterModule} from '@angular/router';
import {RtgApiService} from '../../services/rtg-api.service';
import {RtgStyleService} from '../../services/rtg-style.service';

@Component({
  selector: 'app-tools-element',
  templateUrl: './tools-element.component.html',
  styleUrls: ['./tools-element.component.scss']
})
export class ToolsElementComponent implements OnInit, OnDestroy {

  @Input() view = 'default';
  Listsi: any = [];

  constructor(public router: Router,
              protected route: ActivatedRoute,
              protected rtgApiService: RtgApiService,
              public rtgStyleService: RtgStyleService) { }

  ngOnInit(): void {

    if (!!this.route.snapshot.data.view) {
      this.view = this.route.snapshot.data.view;
    }
    switch (this.view) {
      case 'listsi': {
        this.getListsi();
      }
    }

  }
  ngOnDestroy() {

  }
  private getListsi(): void {
    console.log('plop', this.view);
    this.rtgApiService.getList('si')
        .then( (listsi) => { this.Listsi = listsi; console.log(listsi); });
  }
  getSiSvgIcon(type: string): string {
    return '';
  }
}
