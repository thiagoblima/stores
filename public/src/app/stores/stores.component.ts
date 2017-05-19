import { Component, NgModule, OnInit, trigger, transition, style, animate, state } from '@angular/core';
import { StoresDataService } from '../services/stores/stores-data.service';
import { StoresService } from '../services/stores/stores.service';
import { Http } from '@angular/http';
import { UserService } from '../services/auth/index';
import { User } from '../models/index';

@Component({
  selector: 'app-stores',
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
          ':enter', [
            style({ backgroundColor: 'transparent', color: '#F4F2F4', opacity: 1 }),
            animate('800ms')
          ]
        ),
        transition(
          ':leave', [
            style({ opacity: 0 }),
            animate('800ms')
          ]
        )
      ]
    )
  ],
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
  providers: [StoresDataService]
})


export class StoresComponent {
  public currentUser: User;
  public message: string = '';
  private stores;
  private data;



  constructor(private _storesDataService: StoresDataService, private storesService: StoresService,
    private userService: UserService) {

    this.stores = _storesDataService.getStores();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  private getUserInfo() {
    this.userService.getUserInfo().subscribe(message => { this.message = message; })
  }

  private getStores() {
    this.storesService.getStores().subscribe(data => { this.data = data; })
  }

  ngOnInit() {
    this.getUserInfo();
    this.getStores();
  }

}
