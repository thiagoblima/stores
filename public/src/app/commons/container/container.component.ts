import { Component, NgModule, OnInit, trigger, transition, style, animate, state } from '@angular/core';
import { StoresDataService } from '../../services/stores/stores-data.service';
import { Http } from '@angular/http';
import { UserService } from '../../services/auth/index';
import { User } from '../../models/index';



@Component({
  selector: 'app-container',
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
          ':enter', [
            style({ backgroundColor:'transparent', color: '#F4F2F4', opacity: 1 }),
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
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  providers: [ StoresDataService ]
})


export class ContainerComponent {
  public currentUser: User;
  public message: string = '';
  private stores;


  constructor(private _storesDataService: StoresDataService, private userService: UserService){
     this.stores = _storesDataService.getStores();
     this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  private getUserInfo(){
        this.userService.getUserInfo().subscribe(message => { this.message = message; })
    }

    ngOnIinit(){
      this.getUserInfo();
    }

}
