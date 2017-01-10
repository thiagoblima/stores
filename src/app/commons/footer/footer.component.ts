import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';

export class Footer {

  /** 
    * @name: Footer
    * @description: Object instances written here 
    **/

  private logo: string;
  private rights: string;
  private message: string;

  constructor(logo, rights, message) {
    this.logo = logo;
    this.rights = rights;
    this.message = message;
 }

  public get getLogo(): string {
    return this.logo;
  }

  public set setLogo(logo) {
    this.logo = logo;
  }

  public get getRights(): string {
    return this.rights;
  }

  public set setRights(rights) {
    this.rights = rights
  }

  public get getMessage(): string {
    return this.message;
  }

  public set setMessage(message) {
    this.message = message;
  }

}

const footer = new Footer('logo','rights','message');

footer.setLogo = 'logo';
footer.setRights = 'All rights reserved';
footer.setMessage = 'Contact us through the number: ';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
