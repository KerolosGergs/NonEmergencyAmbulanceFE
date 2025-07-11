import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginLayout } from "./Layout/Auth/Login/login-layout/login-layout";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'NonEmergencyAmbulance';
}
