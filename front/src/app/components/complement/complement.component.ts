import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-complement',
  templateUrl: './complement.component.html',
  styleUrls: ['./complement.component.scss']
})
export class ComplementComponent implements OnInit {

  @Input() value;
  @Input() type;
  constructor() { }

  ngOnInit(): void {
  }

}
