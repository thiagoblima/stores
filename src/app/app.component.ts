import { Component } from '@angular/core';

export class Header {

  /** @name: Header @description: Object instances written here */

  private logo: string;
  private title: string;
  private subtitle: string;
  private date: Date;

  constructor(logo, title, subtitle, date) {
    this.logo = logo;
    this.title = title;
    this.subtitle = subtitle;
    this.date = date;
  }

  public get getLogo(): string {
    return this.logo;
  }
  
  public set setLogo(logo){
    this.logo = logo;
  }

  public get getTitle(): string {
    return this.title;
  }

  public set setTitle(title){
    this.title = title;
  }

  public get getSubtitle(): string {
    return this.subtitle;
  }

  public set setSubtitle(subtitle){
    this.subtitle = subtitle;
  }

  public get getDate(): Date {
    return new Date();
  }

  public set setDate(date) {
    this.date = date;
  }

}

/** @name: header @params: logo, title, subtitle, date @description: Creating a new element from Header Class */

const header = new Header('logo', 'title', 'subtitle', new Date());

header.setLogo = 'Logo';
header.setTitle = 'Stores';
header.setSubtitle = 'The Ultimate Management For Your Business';
header.setDate = new Date();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  header = { 
    logo: header.getLogo,
    title: header.getTitle,
    subtitle: header.getSubtitle,
    date: header.getDate

  }
    
}
