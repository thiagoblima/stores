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

/**
  * @name: container
  * @param: storeImg, hero, caption 
  * @description: Creating a new element from Container Class 
  **/

// initializing stores

const store1: ContainerConfig = new Container('path1', 'hero1', 'caption1');
const store2: ContainerConfig = new Container('path2', 'hero2', 'caption2');
const store3: ContainerConfig = new Container('path3', 'hero3', 'caption3');

// store 1 settings

store1.setStoreImg = 'Image1';
store1.setHero = 'Store 1';
store1.setCaption = 'Auto store always, find the best cars here';

// store 2 settings

store2.setStoreImg = 'Image2';
store2.setHero = 'Store 2';
store2.setCaption = 'Shopping free clothes, the best wear is here';

// store 3 settings

store3.setStoreImg = 'Image3';
store3.setHero = 'Store 3';
store3.setCaption = 'Skate shop, the best shapes, wheels and bearings';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})

export class ContainerComponent implements OnInit {

  stores = [
    { image: store1.getStoreImg, hero: store1.getHero,caption: store1.getCaption },
    { image: store2.getStoreImg, hero: store2.getHero,caption: store2.getCaption },
    { image: store3.getStoreImg, hero: store3.getHero,caption: store3.getCaption }
  ];

  ngOnInit() {
  }

}
