import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataType } from '../models/interfaces';
import { NursesTableComponent } from '../components/nurses-table/nurses-table';
import { DriversTableComponent } from '../components/drivers-table/drivers-table';
import { AmbulancesTableComponent } from '../components/ambulances-table/ambulances-table';
import { PatientsTableComponent } from '../components/patients-table/patients-table';
import { Nav } from "../../../../../Shared/Components/nav/nav";
import { Footer } from "../../../../../Shared/Components/footer/footer";


@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, NursesTableComponent, DriversTableComponent, AmbulancesTableComponent, PatientsTableComponent],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css'
})
export class AdminGetDataComponent {
  activeDataType: DataType = 'nurses';

  navigationItems = [
    {
      type: 'nurses' as DataType,
      label: 'Nurses',
      icon: 'bi-person-heart',
      description: 'Healthcare Professionals',
      color: 'primary'
    },
    {
      type: 'drivers' as DataType,
      label: 'Drivers',
      icon: 'bi-person-gear',
      description: 'Ambulance Operators',
      color: 'success'
    },
    {
      type: 'ambulances' as DataType,
      label: 'Ambulances',
      icon: 'bi-truck-front',
      description: 'Emergency Vehicles',
      color: 'warning'
    },
    {
      type: 'patients' as DataType,
      label: 'Patients',
      icon: 'bi-person-lines-fill',
      description: 'Patient Records',
      color: 'info'
    }
  ];

  setActiveDataType(dataType: DataType): void {
    this.activeDataType = dataType;
  }

  isActiveDataType(dataType: DataType): boolean {
    return this.activeDataType === dataType;
  }

  getNavigationItemByType(type: DataType) {
    return this.navigationItems.find(item => item.type === type);
  }
}

