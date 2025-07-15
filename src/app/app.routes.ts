import { HomeLayout } from './Layout/Home/home-layout/home-layout';
import { Routes, RouterOutlet } from '@angular/router';

import { LoginLayout } from './Layout/Auth/Login/login-layout/login-layout';

import { RegisterLayout } from './Layout/Auth/Register/register-layout/register-layout';
import { AdminLayout } from './Layout/AdminDashborad/admin-layout/admin-layout';

export const routes: Routes = [

    {
        path: '',
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginLayout },
            { path: 'register', component: RegisterLayout },
            {
                path: 'home',component: HomeLayout
            },
             {
                path: 'admin',component: AdminLayout
            }
        ]
    },



];
