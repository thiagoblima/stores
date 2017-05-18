# Stores-case
Angular CLI Template For Stores Management System - Angular4, MongoDB, ExpressJS, NodeJS

### MEANStack Angular 4 REST API Web Service boilerplate
The app's structure is based on an **SPA** (Single Page Architecture).

## Back-end fexample of Node.JS, MongoDB, with JWT authentication

## Software Development Team On This Project

* Thiago Lima **Fullstack Developer / Dev Architect**
* Bruno Mossolin **UX, UI, Art Director**

#### First you gotta edit the mongoDB database string in /config/database.js

POST `/api/signup`

* `username`
* `password`

POST `/api/authenticate`

* `username`
* `password`

GET `/api/memberinfo`
Authorization : `JWT key`

## RECYCLER

GET `/api/recycler`
Authorization : `JWT Key`

POST `/api/recycler` 

  * `recycler_name: { type: String, required: true, unique: true }`,
  * `recycler_image: String`,
  * `recycler_phone: Number`,
  * `recycler_dob: String`,
  * `recycler_address: String`

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



end