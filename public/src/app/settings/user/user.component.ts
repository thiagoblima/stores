import { Component, NgModule, OnInit, trigger, transition, style, animate, state } from '@angular/core';
import { NavComponent } from '../../commons/nav/nav.component';
import { HeaderComponent } from '../../commons/header/header.component';
import { FooterComponent } from '../../commons/footer/footer.component';
import { StoresComponent } from '../../stores/stores.component';
import { User } from '../../models/index';
import { UserService } from '../../services/auth/index';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
