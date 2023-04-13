import { Component } from '@angular/core';
import  { TopoElementComponent  } from '../topo-element/topo-element.component'
import {ActivatedRoute, Router} from "@angular/router";
import {RtgApiService} from "../../services/rtg-api.service";

@Component({
  selector: 'app-pi',
  templateUrl: './pi.component.html',
  styleUrls: ['./pi.component.scss']
})
export class PiComponent extends TopoElementComponent {
  type = 'pi';
}
