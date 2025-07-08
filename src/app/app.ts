import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginLayout } from "./Layout/Auth/Login/login-layout/login-layout";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LoginLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'NonEmergencyAmbulance';
}
