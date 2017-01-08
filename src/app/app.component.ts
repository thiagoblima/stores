import { Component } from '@angular/core';

export class Header {
  private logo: string;
  private title: string;
  private subtitle: string;
  private date: Date;

  get getLogo(): string {
    return this.logo;
  }
  
  set setLogo(logo){
    this.logo = logo;
  }

  get getTitle(): string {
    return this.title;
  }

  set setTitle(title){
    this.title = title;
  }

  get getSubtitle(): string {
    return this.subtitle;
  }

  set setSubtitle(subtitle){
    this.subtitle = subtitle;
  }

  get getDate(): Date {
    return new Date();
  }

}

const header = new Header();

header.setLogo = 'Logo';
header.setTitle = 'Stores';
header.setTitle = 'The Ultimate Management For Your Business';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  header = { 
    logo: header.getLogo,
    title: header.getTitle,
    subtitle: header.getSubtitle 
  }
    
}
