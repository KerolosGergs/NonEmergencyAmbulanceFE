import { Routes ,RouterOutlet} from '@angular/router';

import { LoginLayout } from './Layout/Auth/Login/login-layout/login-layout';
import path from 'path';

export const routes: Routes = [

    {
        path: '', 
            children: [
                { path: '', redirectTo: 'Login', pathMatch: 'full' },
                { path: 'Login',  component:LoginLayout },
                { path: 'Register',  component:LoginLayout },
            ]},
    {
        path:'Home',
            children: []
    }


];
