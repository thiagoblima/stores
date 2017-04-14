import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../commons/nav/nav.component';
import { HeaderComponent } from '../commons/header/header.component';
import { FooterComponent } from '../commons/footer/footer.component';
import { SideBarComponent } from '../commons/sidebar/sidebar.component';
import { StoresDataService } from '../services/stores/stores-data.service';
import { User } from '../services/models/index';
import { UserService } from '../services/auth/index';


@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[ StoresDataService ]
})
export class HomeComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService) { }

    ngOnInit() {
        // get users from secure api end point
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
            });
    }

}
