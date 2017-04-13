import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../commons/nav/nav.component';
import { HeaderComponent } from '../commons/header/header.component';
import { FooterComponent } from '../commons/footer/footer.component';
import { SideBarComponent } from '../commons/sidebar/sidebar.component';
import { StoresDataService } from '../services/stores-service/stores-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[ StoresDataService ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
