import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/index';
import { AboutComponent } from './about/index';
import { SettingsComponent } from './settings/index';
import { StoresComponent } from './stores/index';
import { StoreComponent } from './stores/store/index';
import { LoginComponent } from './login/index';
import { UserComponent } from './settings/user/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './services/guards/index';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
    { path: 'stores', component: StoresComponent, canActivate: [AuthGuard]},
    { path: 'api/store/:id', component: StoreComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'api/user/:id', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);