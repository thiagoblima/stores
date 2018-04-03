import { Component, NgModule, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/core';
import { NavComponent } from '../nav/nav.component';

type footerAlias = { logo: string | {}, rights: string | {}, contact: string | {} } ;

interface FooterConfig {
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
    this.rights = rights;
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
    return `${this.message}` + ' ' + `${this.telephone}`;
  }

}

 /**
  * @name: footer
  * @param: logo, rights, message, telefone
  * @description: Creating a new element from Footer Class
  **/

const footer: FooterConfig = new Footer('logo', 'rights', 'message', 1);

footer.setLogo = 'logo';
footer.setRights = 'All rights reserved';
footer.setMessage = 'Contact us through the number: ';
footer.setTelephone = 551143065555;
console.log('Rendering: ', { obj: footer.contact() });

@Component({
  selector: 'app-footer',
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
          ':enter', [
            style({ backgroundColor: 'transparent', color: '#FD9D40', opacity: 1 }),
            animate('800ms')
          ]
        ),
        transition(
          ':leave', [
            style({opacity: 0 }),
            animate('800ms')
          ]
        )
      ]
    )
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  // tslint:disable:no-inferrable-types
  private telephone: any = footer.contact();
  private message: string = 'Get Footer Object';
  public show: boolean = false;

  public footer: footerAlias = {
    logo: footer.getLogo,
    rights: footer.getRights,
    contact: footer.telephone
  }

  public getFooterObject(): any {
    // tslint:disable-next-line:no-unused-expression
    return this.footer, console.log(`${this.message}`, this.footer);
  }

  ngOnInit() {
    this.getFooterObject();
  }

}
