import { Component } from '@angular/core';
import { Nav } from "../../../Shared/Components/nav/nav";
import { Hero } from "../../../Shared/Components/hero/hero";
import { Services } from "../components/services/services";
import { HowWork } from "../components/how-work/how-work";
import { WhyUs } from "../components/why-us/why-us";
import { Testimonial } from "../components/testimonial/testimonial";
import { ReadyBook } from "../components/ready-book/ready-book";
import { Faq } from "../components/faq/faq";
import { Footer } from "../../../Shared/Components/footer/footer";

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [Nav, Hero, Services, HowWork, WhyUs, Testimonial, ReadyBook, Faq, Footer],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.scss'
})
export class HomeLayout {

}
