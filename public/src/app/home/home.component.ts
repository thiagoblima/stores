import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavComponent } from '../commons/nav/nav.component';
import { HeaderComponent } from '../commons/header/header.component';
import { FooterComponent } from '../commons/footer/footer.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { StoresTypeService } from '../services/stores/stores-data.service';
import { User } from '../models/index';
import { UserService } from '../services/auth/index';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [StoresTypeService]
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  routerScrollChange() {
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngOnInit() {
    this.routerScrollChange();
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => {
      this.users = users;
    });
  }
}
