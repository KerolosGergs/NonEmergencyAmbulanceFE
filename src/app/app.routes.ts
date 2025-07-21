import { HomeLayout } from './Layout/Home/home-layout/home-layout';
import { Routes, RouterOutlet } from '@angular/router';

import { LoginLayout } from './Layout/Auth/Login/login-layout/login-layout';

import { RegisterLayout } from './Layout/Auth/Register/register-layout/register-layout';
import { AdminLayout } from './Layout/AdminDashborad/admin-layout/admin-layout';
import {DashboardLayoutComponent} from '../app/Layout/AdminForms/dashboard-layout/dashboard-layout'
import { AdminGetDataComponent } from './Layout/AdminGetData/dashboard-layout/dashboard-layout';
export const routes: Routes = [



    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginLayout },
    { path: 'register', component: RegisterLayout },
    {
        path: 'home', component: HomeLayout
    },
    {
        path: 'admin', component: AdminLayout,title:'Admin Dashboard'
    },
    {path:'adminForms',component:DashboardLayoutComponent,title:'Admin Forms'},
    {path:'adminGetData',component:AdminGetDataComponent,title:'Admin GetData'}





];
