import { Component } from '@angular/core';
import { StoresDataService } from '../../services/stores-data.service';
import { Http } from '@angular/http';


@Component({
  selector: 'app-container',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [ StoresDataService ]
})


export class SideBarComponent {
  private stores;
  constructor(private _storesDataService: StoresDataService){
    this.stores = _storesDataService.getStores();
  }

}
