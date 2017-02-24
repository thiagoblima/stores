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
const store4: ContainerConfig = new Container('path4', 'hero4', 'caption4');
const store5: ContainerConfig = new Container('path5', 'hero5', 'caption5');
const store6: ContainerConfig = new Container('path6', 'hero6', 'caption6');

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

// store 4 settings

store4.setStoreImg = 'Image4';
store4.setHero = 'Store 4';
store4.setCaption = 'Clothes store, the best dresses around you';

// store 5 settings

store5.setStoreImg = 'Image5';
store5.setHero = 'Store 5';
store5.setCaption = 'Vine store, the best french and italian vines';

// store 6 settings

store6.setStoreImg = 'Image6';
store6.setHero = 'Store 6';
store6.setCaption = 'Vegan restaurant, come and know the best one';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})

export class ContainerComponent implements OnInit {

  private stores = [
    { image: store1.getStoreImg, hero: store1.getHero,caption: store1.getCaption },
    { image: store2.getStoreImg, hero: store2.getHero,caption: store2.getCaption },
    { image: store3.getStoreImg, hero: store3.getHero,caption: store3.getCaption },
    { image: store4.getStoreImg, hero: store4.getHero,caption: store4.getCaption },
    { image: store5.getStoreImg, hero: store5.getHero,caption: store5.getCaption },
    { image: store6.getStoreImg, hero: store6.getHero,caption: store6.getCaption }
  ];

  public loadStores(){
    return console.log(this.stores);
  }

  ngOnInit() {
    this.stores;
    this.loadStores();

  }

}
