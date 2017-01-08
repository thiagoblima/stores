import { Component, OnInit } from '@angular/core';

export class NavStructure {

  public home: string;
  public whoWeAre: string;
  public showCase: string;
  public stores: string;
  public contact: string;

}

const NAV: NavStructure = {
  home: 'Home',
  whoWeAre: 'Who We Are',
  showCase: 'Show Case',
  stores: 'Stores',
  contact: 'Contact'
};


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  nav = {
    home: NAV.home,
    whoWeAre: NAV.whoWeAre,
    showCase: NAV.showCase,
    stores: NAV.stores,
    contact: NAV.contact
  }

  ngOnInit() {
    
  }

}