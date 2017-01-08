import { Component } from '@angular/core';

export class Header {
  private logo: string;
  private title: string;
  private subtitle: string;
  private date: Date;

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

}

const header = new Header();

header.setLogo = 'Logo';
header.setTitle = 'Stores';
header.setSubtitle = 'The Ultimate Management For Your Business';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  header = { 
    logo: header.getLogo,
    title: header.getTitle,
    subtitle: header.getSubtitle,

  }
    
}
