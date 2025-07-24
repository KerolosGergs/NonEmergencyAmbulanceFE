import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormType } from '../../../../../Core/interface/FormsInterface';
import { NurseFormComponent } from '../components/nurse-form/nurse-form';
import { DriverFormComponent } from '../components/driver-form/driver-form';
import { AmbulanceFormComponent } from '../components/ambulance-form/ambulance-form';
import { Footer } from "../../../../../Shared/Components/footer/footer";
import { Nav } from "../../../../../Shared/Components/nav/nav";

@Component({
  selector: 'app-dashboard-layoutForms',
  standalone: true,
  imports: [CommonModule,NurseFormComponent, DriverFormComponent, AmbulanceFormComponent],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css'
})
export class DashboardLayoutComponent {
  activeForm: FormType = 'nurse';

  setActiveForm(formType: FormType): void {
    this.activeForm = formType;
  }

  isActiveForm(formType: FormType): boolean {
    return this.activeForm === formType;
  }
}

