import { HomeLayout } from './Layout/Home/home-layout/home-layout';
import { Routes, RouterOutlet } from '@angular/router';

import { LoginLayout } from './Layout/Auth/Login/login-layout/login-layout';

import { RegisterLayout } from './Layout/Auth/Register/register-layout/register-layout';
import { AdminLayout } from './Layout/admin-layout/admin-layout';
import { NurseLayout } from './Layout/NurseDashboard/nurse-layout/nurse-layout/nurse-layout';
import { DriverLayout } from './Layout/Driver/DriverLayout/driver-layout/driver-layout';
import { DashboardLayoutComponent } from './Layout/admin-layout/Components/AdminForms/dashboard-layout/dashboard-layout';
import { AdminGetDataComponent } from './Layout/admin-layout/Components/AdminGetData/dashboard-layout/dashboard-layout';
import { ReservationFrom } from './Layout/reservation-from/reservation-from';
import { BookingViewComponent } from './Layout/admin-layout/Components/AdminDashborad/Components/view-booking/view-booking';
import { PatintLayout } from './Layout/patint-layout/patint-layout';

export const routes: Routes = [

    {
        path: '',
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginLayout },
            { path: 'register', component: RegisterLayout },
            {
                path: 'home', component: HomeLayout
            },
            {
                path: 'admin',
                component: AdminLayout,
                title: 'Admin Dashboard',
                children: [
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    {path: 'ViewRequest/:id', component: BookingViewComponent},
                    { path: 'dashboard', loadComponent: () => import('./Layout/admin-layout/Components/AdminDashborad/admin-layout/admin-layout').then(m => m.AdminLayout) },
                    { path: 'forms', loadComponent: () => import('./Layout/admin-layout/Components/AdminForms/dashboard-layout/dashboard-layout').then(m => m.DashboardLayoutComponent) },
                    { path: 'get-data', loadComponent: () => import('./Layout/admin-layout/Components/AdminGetData/dashboard-layout/dashboard-layout').then(m => m.AdminGetDataComponent) },
                ]
            },
            {path: 'patient', component: PatintLayout},
            { path: 'FormRequest', component: ReservationFrom },
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
