import { Component, OnInit } from '@angular/core';

interface ContainerConfig {

  /**
   * @description: Instances of objects
   */

}

export class Container implements ContainerConfig {
    
    /** 
    * @name: Container
    * @description: Object instances written here 
    **/

    constructor(){

    }


}


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})

export class ContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
