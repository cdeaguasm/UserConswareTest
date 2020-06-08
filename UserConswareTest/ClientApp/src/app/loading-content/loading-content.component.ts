import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-content',
  templateUrl: './loading-content.component.html',
  styleUrls: ['./loading-content.component.css']
})
export class LoadingContentComponent implements OnInit {

  @Input() show: boolean = false;
  @Input() description: string;

  constructor() { }

  ngOnInit() {
  }

}
