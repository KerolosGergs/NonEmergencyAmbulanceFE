import { Component, OnInit } from '@angular/core';
import { Nav } from "../../../Shared/Components/nav/nav";
import { Hero } from "../../../Shared/Components/hero/hero";
import { Services } from "../components/services/services";
import { HowWork } from "../components/how-work/how-work";
import { WhyUs } from "../components/why-us/why-us";
import { Testimonial } from "../components/testimonial/testimonial";
import { ReadyBook } from "../components/ready-book/ready-book";
import { Faq } from "../components/faq/faq";
import { Footer } from "../../../Shared/Components/footer/footer";
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [Nav, Hero, Services, HowWork, WhyUs, Testimonial, ReadyBook, Faq, Footer],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.scss'
})
export class HomeLayout implements OnInit {


  ngOnInit(): void {


  createChat({
  webhookUrl: 'https://amrmousa1411.app.n8n.cloud/webhook/ded3971a-b4d6-436d-a107-ab02ae971ade/chat',
  webhookConfig: {
    method: 'POST',
    headers: {}
  },
  target: '#n8n-chat',
  mode: 'window',
  chatInputKey: 'chatInput',
  chatSessionKey: 'sessionId',
  loadPreviousSession: true,
  metadata: {},
  showWelcomeScreen: false,
  defaultLanguage: 'en',
  initialMessages: [
    'Welcome to Sanad 🚑',
    'How can I assist you with our non-emergency ambulance services today?'
  ],
  i18n: {
    en: {
      title: 'Welcome to Sanad 🚑',
      subtitle: "We're here to help with all your non-emergency ambulance needs.",
      footer: '',
      getStarted: 'Start New Chat',
      inputPlaceholder: 'Type your question about Sanad services...',
      closeButtonTooltip: 'Close chat'
    }
  }
  });

  }
}
