import { Component, OnInit } from '@angular/core';

interface ContainerConfig {

  /**
   * @description: Instances of objects
   */

  storeImg: string;
  hero: string;
  caption: string;

  /**
   * @description: Setters of instances of objects
   */

  setStoreImg: string;
  setHero: string;
  setCaption: string;

  /**
   * @description: Getters of instances of objects
   */

  getStoreImg: string;
  getHero: string;
  getCaption: string;

}

export class Container implements ContainerConfig {

   /** 
    * @name: Container
    * @description: Object instances written here 
    **/

  constructor(public storeImg, public hero, public caption) {

    this.storeImg = storeImg;
    this.hero = hero;
    this.caption = caption;

  }

  public get getStoreImg(): string {
    return this.storeImg;
  }

  public set setStoreImg(path) {
    this.storeImg = path;
  }

  public get getHero(): string {
    return this.hero;
  }

  public set setHero(hero) {
    this.hero = hero;
  }

  public get getCaption(): string {
    return this.caption;
  }

  public set setCaption(caption) {
    this.caption = caption;
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
