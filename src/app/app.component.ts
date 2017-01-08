import { Component } from '@angular/core';

export class Header {
  public logo: string;
  public title: string;
  public subtitle: string;
  public date: Date;

  get getLogo(): string {
    return this.logo;
  }
  
  set setLogo(logo){
    this.logo = logo;
  }
}

const header = new Header();

header.setLogo = 'Logo';

/*const HEADER: Header = { 
  title: 'Stores', 
  subtitle: 'The Ultimate Management For Your Business', 
  date: new Date(),
  getLogo: this.getLogo(),
  setLogo: this.setLogo('Logo')  
};*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  header = { 
    logo: header.getLogo 
  }
    
}
