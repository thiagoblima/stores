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
  private telephone: number;

  constructor(logo, rights, message, telephone) {
    this.logo = logo;
    this.rights = rights;
    this.message = message;
    this.telephone = telephone;
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

  public get getTelephone(): number {
    return this.telephone;
  }

  public set setTelephone(telephone) {
    this.telephone = telephone;
  }

  public contact() {
    return this.message + ' ' + this.telephone;
  }

}

const footer = new Footer('logo', 'rights', 'message', 1);

footer.setLogo = 'logo';
footer.setRights = 'All rights reserved';
footer.setMessage = 'Contact us through the number: ';
footer.setTelephone = 551143065555;


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  footer = {
    logo: footer.getLogo,
    rights: footer.getRights,
    message: footer.contact
  }

  ngOnInit() {
  }

}
