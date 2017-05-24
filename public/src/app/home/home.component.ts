import { Component, OnInit } from '@angular/core';
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
  providers:[ StoresTypeService ]
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}


