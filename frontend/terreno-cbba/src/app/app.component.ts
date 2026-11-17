import { Component, OnDestroy, ChangeDetectorRef, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarSuperiorComponent } from './components/navbar-superior/navbar-superior.component';
import { RouterModule } from '@angular/router';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { MarketplaceComponent } from './components/marketplace/marketplace.component';
import { EstimadorComponent } from './components/estimador/estimador.component';
import { PublicarComponent } from './components/publicar/publicar.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

export const appConfig = {
  providers: [provideHttpClient()]
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarSuperiorComponent,
    RouterModule,
    ChatbotComponent,
    MarketplaceComponent,
    EstimadorComponent,
    PublicarComponent,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    // Cleanup
  }
}