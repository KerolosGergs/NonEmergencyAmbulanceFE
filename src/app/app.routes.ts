import { HomeLayout } from './Layout/Home/home-layout/home-layout';
import { Routes } from '@angular/router';

import { LoginLayout } from './Layout/Auth/Login/login-layout/login-layout';

import { RegisterLayout } from './Layout/Auth/Register/register-layout/register-layout';
import { AdminLayout } from './Layout/AdminDashborad/admin-layout/admin-layout';
import { NurseLayout } from './Layout/NurseDashboard/nurse-layout/nurse-layout/nurse-layout';
import { DriverLayout } from './Layout/Driver/DriverLayout/driver-layout/driver-layout';
import { PatintLayout } from './Layout/patint-layout/patint-layout';

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
                path: 'admin',
                component: AdminLayout,
                title: 'Admin Dashboard',
                children: [
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                ]
            },
            {path: 'patient', component: PatintLayout},
            {
              path: 'nurse', component: NurseLayout
            }
            ,
            {
              path: 'driver', component: DriverLayout
            }

        ]
    },



];
