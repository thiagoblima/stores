import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../commons/nav/nav.component';
import { HeaderComponent } from '../commons/header/header.component';
import { FooterComponent } from '../commons/footer/footer.component';
import { ContainerComponent } from '../commons/container/container.component';
import { StoresDataService } from '../services/stores/stores-data.service';
import { User } from '../models/index';
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
        this.userService.getAll()
            .subscribe(users => {
                this.users = users;
            });
    }

}
