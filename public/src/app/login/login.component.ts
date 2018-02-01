import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../services/auth/index';
import { Header } from '../commons/header/header.component';

type loginAlias = { logo: string, alt: string, title: string, subtitle: string, date: Date };
export class Login extends Header {

    constructor(logo: string, alt: string, title: string, subtitle: string, date: Date) {
        super(logo, alt, title, subtitle, date);
    }

}

const loginSetUp = new Login('', '', '', '', new Date());

loginSetUp.setLogo = 'assets/images/header/Logomakr_4Zz556.png';
loginSetUp.setAlt = 'The best place to admin your stores!';
loginSetUp.setTitle = 'Stores';
loginSetUp.setSubtitle = 'The Ultimate Management For Your Business';


@Component({
    moduleId: module.id,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers:[ AlertService ]

})

export class LoginComponent implements OnInit {
    // tslint:disable:no-inferrable-types
    public model: any = {};
    public loading: boolean = false;
    public returnUrl: string;
    public error: string = '';
    public message: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = 'Authentication failed: wrong user or password.';
                    this.loading = false;
                });
    }

    // tslint:disable:member-ordering
    private loginSetUp: loginAlias = {
        logo: loginSetUp.getLogo,
        alt: loginSetUp.getAlt,
        title: loginSetUp.getTitle,
        subtitle: loginSetUp.getSubtitle,
        date: loginSetUp.getDate
    };
}

