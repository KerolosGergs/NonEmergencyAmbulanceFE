import { Component } from '@angular/core';
import { Nav } from "../../Shared/Components/nav/nav";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Footer } from "../../Shared/Components/footer/footer";
@Component({
  selector: 'app-admin-layout',
  imports: [Nav, RouterOutlet, RouterLink, RouterLinkActive, Footer],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout {

}
