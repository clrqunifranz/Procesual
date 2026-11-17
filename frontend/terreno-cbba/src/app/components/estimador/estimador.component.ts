import { Component, OnDestroy, OnInit, ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-estimador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estimador.component.html',
  styleUrls: ['./estimador.component.css'],
  schemas: [NO_ERRORS_SCHEMA],
})
export class EstimadorComponent implements OnInit, OnDestroy {
  zonas: any[] = [];
  lotes: any[] = [];
  
  // Formulario
  zona_id: number | null = null;
  superficie_m2: number = 1000;
  frente_m: number = 15;
  fondo_m: number = 25;
  servicios_basicos: boolean = false;
  via_asfaltada: boolean = false;
  folio_real: boolean = false;
  
  // Resultados
  resultado: any = null;
  loading: boolean = false;
  error: string | null = null;

  private apiUrl = 'http://localhost:3000/api';

  constructor(
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.http.get<any[]>(`${this.apiUrl}/zonas`).subscribe({
      next: (data) => {
        this.zonas = data || [];
        this.cdr.detectChanges();
      },
      error: () => this.cdr.detectChanges()
    });
  }

  ngOnDestroy(): void {
    // Cleanup
  }

  estimarPrecio() {
    this.loading = true;
    this.error = null;
    this.resultado = null;

    const payload = {
      zona_id: this.zona_id,
      superficie_m2: this.superficie_m2,
      frente_m: this.frente_m,
      fondo_m: this.fondo_m,
      servicios_basicos: this.servicios_basicos,
      via_asfaltada: this.via_asfaltada,
      folio_real: this.folio_real,
    };

    this.http.post<any>(`${this.apiUrl}/estimar-precio`, payload).subscribe({
      next: (data) => {
        this.resultado = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = err?.error?.error || 'Error al estimar precio';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  detectChanges() {
    this.cdr.detectChanges();
  }
}