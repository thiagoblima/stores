import { Component, NgModule, OnInit, trigger, transition, style, animate, state } from '@angular/core';
import { StoresDataService } from '../../services/stores/stores-data.service';
import { Http } from '@angular/http';


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
  private stores;
  constructor(private _storesDataService: StoresDataService){
    this.stores = _storesDataService.getStores();
  }

}