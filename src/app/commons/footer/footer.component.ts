import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';

interface FooterConfig  {

   logo: string;
   rights: string;
   message: string;
   telephone: number;

   setLogo: string;
   setRights: string;
   setMessage: string;
   setTelephone: number;

   getLogo: string;
   getRights: string;
   contact(): void;

}

export class Footer implements FooterConfig {

  /** 
    * @name: Footer
    * @description: Object instances written here 
    **/


  constructor(public logo, public rights, public message, public telephone) {

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

  contact() {
    return `${this.message}` + ' ' + `${this.telephone}` ;
  }

}



const footer: FooterConfig = new Footer('logo', 'rights', 'message', 1);

footer.setLogo = 'logo';
footer.setRights = 'All rights reserved';
footer.setMessage = 'Contact us through the number: ';
footer.setTelephone = 551143065555;
console.log('Rendering: ', {obj: footer.contact()});



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  telephone = footer.contact();

  footer = {
    logo: footer.getLogo,
    rights: footer.getRights,
    contact: this.telephone
  }

  ngOnInit() {
  }

}
