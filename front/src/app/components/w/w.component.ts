import { Component, OnInit } from '@angular/core';
import {TopoElementComponent} from '../topo-element/topo-element.component';
import {ActivatedRoute, Router} from '@angular/router';
import {RtgApiService} from '../../services/rtg-api.service';

@Component({
  selector: '[app-w]',
  templateUrl: './w.component.html',
  styleUrls: ['./w.component.scss']
})
export class WComponent extends TopoElementComponent {
  type = 'w';
}
