import { Component, OnDestroy, ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ChatbotComponent implements OnDestroy {
  mensaje: string = '';
  respuestas: Array<{tipo: 'usuario'|'ia', texto: string}> = [];
  mostrando: boolean = false;
  loading: boolean = false;
  constructor(
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnDestroy(): void {
    // Cleanup
  }

  toggleChat() {
    this.mostrando = !this.mostrando;
    this.detectChanges();
  }

  async enviarMensaje() {
    if (!this.mensaje.trim()) return;
    
    this.respuestas.push({tipo: 'usuario', texto: this.mensaje});
    this.mensaje = '';
    this.loading = true;
    
    // Llamada al backend POST /api/chatbot
    // this.inmobiliariaService.chatbot({mensaje: this.mensaje}).subscribe({
    //   next: (data) => {
    //     this.respuestas.push({tipo: 'ia', texto: data.respuesta});
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     this.respuestas.push({tipo: 'ia', texto: 'Error: ' + (err.error?.message || 'Unknown error')});
    //     this.loading = false;
    //   }
    // });
    
    // Simulación con retraso
    setTimeout(() => {
      this.respuestas.push({tipo: 'ia', texto: 'Recibí tu consulta sobre terrenos en Cochabamba. Los datos están disponibles en nuestra plataforma.'});
      this.loading = false;
      this.detectChanges();
    }, 1500);
  }

  detectChanges() {
    this.cdr.detectChanges();
  }
}