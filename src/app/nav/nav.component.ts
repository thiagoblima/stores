import { Component, OnInit } from '@angular/core';

export class NavStructure {
  private home: string;
  private whoWeAre: string;
  private showCase: string;
  private stores: string;
  private contact: string;

}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
