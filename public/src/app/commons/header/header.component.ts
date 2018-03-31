import { Component, NgModule, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/core';
import { UserService } from '../../services/auth/index';
import { User } from '../../models/index';

type headerAlias = {
  logo: string;
  alt: string;
  title: string;
  subtitle: string;
  date: Date;
};

export class Header {
  /**
   * @name: Header
   * @description: Object instances written here
   **/

  private logo: string;
  private alt: string;
  private title: string;
  private subtitle: string;
  private date: Date;

  constructor(logo, alt, title, subtitle, date) {
    this.logo = logo;
    this.alt = alt;
    this.title = title;
    this.subtitle = subtitle;
    this.date = date;
  }

  public get getLogo(): string {
    return this.logo;
  }

  public set setLogo(logo) {
    this.logo = logo;
  }

  public get getAlt(): string {
    return this.alt;
  }

  public set setAlt(alt) {
    this.alt = alt;
  }

  public get getTitle(): string {
    return this.title;
  }

  public set setTitle(title) {
    this.title = title;
  }

  public get getSubtitle(): string {
    return this.subtitle;
  }

  public set setSubtitle(subtitle) {
    this.subtitle = subtitle;
  }

  public get getDate(): Date {
    return new Date();
  }

  public set setDate(date) {
    this.date = date;
  }
}

/**
 * @name: header
 * @param: logo, title, subtitle, date
 * @description: Creating a new element from Header Class
 **/

const header = new Header('logo', 'alt', 'title', 'subtitle', new Date());

header.setLogo = 'assets/images/header/Logomakr_4Zz556.png';
header.setAlt = 'The best place to admin your stores!';
header.setTitle = 'Stores';
header.setSubtitle = 'The Ultimate Management For Your Business';
header.setDate = new Date();

@Component({
  selector: 'app-header',
  animations: [
    trigger('myAnimation', [
      transition(':enter', [
        style({ backgroundColor: 'transparent', color: '#FD9D40', opacity: 1 }),
        animate('800ms')
      ]),
      transition(':leave', [style({ opacity: 0 }), animate('800ms')])
    ])
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // tslint:disable:no-inferrable-types
  private headerMessage: string = 'Get Header Object';
  public show: boolean = false;

  private animate(): any {
    return (this.show = false), alert(this.show);
  }

  // tslint:disable-next-line:member-ordering
  public header: headerAlias = {
    logo: header.getLogo,
    alt: header.getAlt,
    title: header.getTitle,
    subtitle: header.getSubtitle,
    date: header.getDate
  };

  public getHeaderObject(): any {
    // tslint:disable-next-line:no-unused-expression
    return this.header, console.log(`${this.headerMessage}`, this.header);
  }

  ngOnInit() {
    this.getHeaderObject();
  }
}
