# Stores-case
Angular CLI Template For Stores Management System - Angular4, MongoDB, ExpressJS, NodeJS

## Software Development Team On This Project

A huge thanks for all of those who have helped this project, the love for _OSS_ is the fuel for working for the community, providing great projects with the most powerful tehnologies available.

`The team`: 

* Thiago Lima | _Fullstack Developer / Dev Architect_
* Bruno Mossolin | _UX, UI, Art Director_

`Introduction`:

MEANStack Angular 4 REST API Web Service boilerplate, The app's structure is based on an **SPA** (Single Page Architecture).

`Live example`:

![alt text](https://github.com/thiagolimaa/stores-case/blob/master/public/src/assets/documentation/stores2.gif)

## Back-end: Node.JS, MongoDB and Moongose with JWT authentication

#### First you gotta edit the mongoDB database string in /config/database.js

-------------------------------------------------------
## Authentication API

POST `/api/signup`

* `username`
* `password`

POST `/api/authenticate`

* `username`
* `password`

GET `/api/memberinfo`
Authorization : `JWT key`

-------------------------------------------------------

## Users API

GET `/api/users`
Authorization : `JWT key`

GET `/api/user/:id`
Authorization : `JWT key`

* `id`

DELETE `/api/user/:id`
Authorization : `JWT key`

* `id`

PUT `/api/user/:id`
Authorization : `JWT key`

* `id`
* `email`
* `firstname`
* `lastname`
* `age`

-------------------------------------------------------

## Stores API

GET `/api/stores`
Authorization : `JWT Key`

POST `/api/stores` 
Authorization : `JWT Key`

  * `store_name: { type: String, required: true, unique: true }`,
  * `store_image: String`,
  * `store_phone: Number`,
  * `store_country: String`,
  * `store_address: String`

-------------------------------------------------------

## For mobile app: start from here : 
### contact for demo Host URL.

POST `/api/sendotp`
  * `phone`
  
POST `/api/authenticateotp`
  * `otp`
  (in return you will get the token if phone number is registered in the backend)


POST `/api/schedule`

  * `schedule_time: Date,`
  * `user: String,`
  * `recycler: String,`
  * `status: String,`
  * `pickup_id: Number,`
  * `cancel_state: String,`
  * `cancel_note: String,`


GET `/api/schedule`
Auth: `JWT`





POST `/api/pickup`
	
  * `schedule_id: Number,`
  * `total_points: Number,`
  * `details_id: Number,`


GET `/api/pickup`
Authorization: `JWT`



POST `/api/donation_list`

  * `organization_name: String,`
  * `description: String,`
  * `image: String,`
  * `goal: Number,`
  * `current_status: Number,`


GET `/api/donation_list`
Authorization: `JWT`


This project is licensed under the terms of the MIT license.