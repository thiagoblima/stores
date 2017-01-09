import { Component, OnInit } from '@angular/core';

export class Nav {

  /** 
   * @name: NavStrucutre 
   * @description: Object instances written here 
   **/

  public home: string;
  public whoWeAre: string;
  public showCase: string;
  public stores: string;
  public contact: string;

  constructor(home, whoWeAre, showCase, stores, contact) {
    this.home = home;
    this.whoWeAre = whoWeAre;
    this.showCase = showCase;
    this.stores = stores;
    this.contact = contact;
  }

}

const nav: Nav = {
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

  links = [
    { menu: nav.home, alt: 'Home', id: 'link-1' },
    { menu: nav.whoWeAre, alt: 'Who We Are', id: 'link-2' },
    { menu: nav.showCase, alt: 'Show Case', id: 'link-3' },
    { menu: nav.stores, alt: 'Stores', id: 'link-4' },
    { menu: nav.contact, alt: 'Contact', id: 'link-5' }
  ];

  ngOnInit() {

  }

}
