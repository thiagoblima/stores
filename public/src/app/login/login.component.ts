import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/index';
import { Header } from '../commons/header/header.component';

type loginAlias = { logo: string, alt: string, title: string, subtitle: string, date: Date };
export class Login extends Header {

    constructor(logo: string, alt: string, title: string, subtitle: string, date: Date) {
        super(logo, alt, title, subtitle, date);
    }

}

const loginSetUp = new Login('', '', '', '', new Date());

loginSetUp.setLogo = 'assets/images/header/Logomakr_4Zz556.png';


@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }

    private loginSetUp: loginAlias = {
        logo: loginSetUp.getLogo,
        alt: loginSetUp.getAlt,
        title: loginSetUp.getTitle,
        subtitle: loginSetUp.getSubtitle,
        date: loginSetUp.getDate
    }
}

