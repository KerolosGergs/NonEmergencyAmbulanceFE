import { HomeLayout } from './Layout/Home/home-layout/home-layout';
import { Routes, RouterOutlet } from '@angular/router';

import { LoginLayout } from './Layout/Auth/Login/login-layout/login-layout';

import { RegisterLayout } from './Layout/Auth/Register/register-layout/register-layout';
import { AdminLayout } from './Layout/admin-layout/admin-layout';
import { NurseLayout } from './Layout/NurseDashboard/nurse-layout/nurse-layout/nurse-layout';
import { DriverLayout } from './Layout/Driver/DriverLayout/driver-layout/driver-layout';
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
                    { path: 'ViewRequest/:id', component: BookingViewComponent },
                    { path: 'dashboard', loadComponent: () => import('./Layout/admin-layout/Components/AdminDashborad/admin-layout/admin-layout').then(m => m.AdminLayout) },
                    { path: 'forms', loadComponent: () => import('./Layout/admin-layout/Components/AdminForms/dashboard-layout/dashboard-layout').then(m => m.DashboardLayoutComponent) },
                    { path: 'get-data', loadComponent: () => import('./Layout/admin-layout/Components/AdminGetData/dashboard-layout/dashboard-layout').then(m => m.AdminGetDataComponent) },
                    { path: 'withdrawal-summary', loadComponent: () => import('./Layout/admin-layout/Components/AdminDashborad/Components/withdrawal-summary/withdrawal-summary').then(m => m.WithdrawalSummaryComponent) },
                    { path: 'withdrawal-management', loadComponent: () => import('./Layout/admin-layout/Components/AdminDashborad/Components/withdrawal-management/withdrawal-management').then(m => m.WithdrawalManagementComponent) },
                    { path: 'profit-management', loadComponent: () => import('./Layout/admin-layout/Components/AdminDashborad/Components/profit-management/profit-management').then(m => m.ProfitManagementComponent) },
                ]
            },
            { path: 'patient', component: PatintLayout },
            { path: 'FormRequest', component: ReservationFrom },
            {
                path: 'nurse', component: NurseLayout,
                children: [
                    { path: '', redirectTo: 'pending', pathMatch: 'full' },
                    { path: 'pending', loadComponent: () => import('../app/Layout/NurseDashboard/components/pending-approval-requests/pending-approval-requests').then(m => m.PendingApprovalRequests) },
                    { path: 'approved', loadComponent: () => import('../app/Layout/NurseDashboard/components/approved-request/approved-request').then(m => m.ApprovedRequest) },
                    { path: 'patient/:id', loadComponent: () => import('../app/Layout/NurseDashboard/components/patient-details/patient-details').then(m => m.PatientDetails) },
                    { path: 'schedule', loadComponent: () => import('../app/Layout/NurseDashboard/components/your-schedule/your-schedule').then(m => m.YourSchedule) },
                    { path: 'withdrawal', loadComponent: () => import('../app/Layout/NurseDashboard/components/withdrawal-nurse/withdrawal-nurse').then(m => m.WithdrawalNurse) },
                ]
            },
            {
                path: 'driver',
                component: DriverLayout,
                children: [
                    { path: '', redirectTo: 'pending-requests', pathMatch: 'full' },
                    { path: 'pending-requests', loadComponent: () => import('../app/Layout/Driver/components/pending-requests/pending-requests').then(m => m.DriverPendingRequests) },
                    { path: 'approved', loadComponent: () => import('../app/Layout/Driver/components/driver-approved-requests/driver-approved-requests').then(m => m.DriverApprovedRequests) },
                    { path: 'trip-details', loadComponent: () => import('../app/Layout/Driver/components/trip-details/trip-details').then(m => m.DriverTripDetails) },
                    { path: 'schedule', loadComponent: () => import('../app/Layout/Driver/components/schedule/schedule').then(m => m.DriverSchedule) },
                    { path: 'withdrawal', loadComponent: () => import('../app/Layout/Driver/components/withdrawal-driver/withdrawal-driver').then(m => m.WithdrawalDriver) },
                ]
            },

        ]
    },



];
