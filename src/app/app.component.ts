import { Component, Directive } from '@angular/core';
import { NavComponent } from './commons/nav/nav.component';
import { HeaderComponent } from './commons/header/header.component';
import { FooterComponent } from './commons/footer/footer.component';
import { ContainerComponent } from './commons/container/container.component';
import { StoresDataService } from './stores-data.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[ StoresDataService ]
})

export class AppComponent {
   
}
