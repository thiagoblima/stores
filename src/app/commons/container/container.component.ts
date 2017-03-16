import { Component } from '@angular/core';
import { StoresDataService } from '../../stores-data.service';
import { Http } from '@angular/http';


@Component({
  selector: 'app-container',
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
