import { Component, OnInit } from '@angular/core';

type navAlias = [ { menu: string, alt: string, id: string } ];

/** 
  * @name: NavConfig
  * @description: Interface class is written here 
  **/

interface NavConfig {

  home: string;
  aboutUs: string;
  showCase: string;
  stores: string;
  contact: string;

}

/**
  * @name: nav
  * @param: home, whoWeAre, showCase, stores, contact 
  * @description: Creating a new element from Header Class 
  **/

const nav: NavConfig = {
  home: 'Home',
  aboutUs: 'About us',
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

  private message: string = 'Get Nav Object';

  private links: navAlias = [
    { menu: nav.home, alt: 'Home', id: 'link-1' },
    { menu: nav.aboutUs, alt: 'Who We Are', id: 'link-2' },
    { menu: nav.showCase, alt: 'Show Case', id: 'link-3' },
    { menu: nav.stores, alt: 'Stores', id: 'link-4' },
    { menu: nav.contact, alt: 'Contact', id: 'link-5' }
  ]

  public getNavObject(): void {
    return `${this.links}`, console.log(`${this.message}`, this.links);
  }

  ngOnInit() {
    this.getNavObject();
  }

}
