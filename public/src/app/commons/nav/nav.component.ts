import {
  Component,
  NgModule,
  OnInit,
  trigger,
  transition,
  style,
  animate,
  state
} from '@angular/core';

type navAlias = [{ menu: string; alt: string; url: string }];

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
  animations: [
    trigger('myAnimation', [
      transition(':enter', [
        style({ backgroundColor: 'transparent', opacity: 1 }),
        animate('800ms')
      ]),
      transition(':leave', [style({ opacity: 0 }), animate('800ms')])
    ])
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  // tslint:disable:no-inferrable-types
  private message: string = 'Get Nav Object';
  public show: boolean = false;

  public links: navAlias = [
    { menu: nav.home, alt: 'Home', url: '/' },
    { menu: nav.aboutUs, alt: 'Who We Are', url: '/about' },
    { menu: nav.showCase, alt: 'Show Case', url: 'link-3' },
    { menu: nav.stores, alt: 'Stores', url: '/stores' },
    { menu: nav.contact, alt: 'Contact', url: 'link-5' }
  ];

  public getNavObject(): any {
    return this.links, console.log(`${this.message}`, this.links);
  }

  ngOnInit() {
    this.getNavObject();
  }
}
