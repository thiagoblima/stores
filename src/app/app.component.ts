import { Component } from '@angular/core';

export class Header {
  logo: string;
  title: string;
  subtitle: string;
  date: Date;
}

const HEADER: Header = { 
  logo: 'Logo', 
  title: 'Stores', 
  subtitle: 'The Ultimate Management For Your Business', 
  date: new Date()  
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  header = { 
    logo: HEADER.logo,
    title: HEADER.title,
    subtitle: HEADER.subtitle,
    date: HEADER.date 
  }
    
}

