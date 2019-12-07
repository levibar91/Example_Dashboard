import { Component, OnInit, Input } from '@angular/core';
import { Dictionary } from 'src/app/models/dictionary';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() public items : Dictionary<any>;

  constructor() {}

  ngOnInit() {
  }
}
