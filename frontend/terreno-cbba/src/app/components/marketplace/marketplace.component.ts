import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoteCardComponent } from '../../components/lote-card/lote-card.component';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CommonModule, FormsModule, LoteCardComponent],
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css'],
})
export class MarketplaceComponent implements OnInit, OnDestroy {
  zonas: any[] = [];
  lotes: any[] = [];
  filtro_zona_id: number | null = null;
  filtro_superficie_min: number = 0;

  private apiUrl = 'http://localhost:3000/api';

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  ngOnDestroy(): void {
    // Cleanup
  }

  cargarDatos() {
    this.http.get<any[]>(`${this.apiUrl}/zonas`).subscribe({
      next: (data) => {
        this.zonas = data || [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando zonas', err);
        this.cdr.detectChanges();
      }
    });

    this.cargarLotes();
  }

  cargarLotes() {
    let params = new HttpParams();
    if (this.filtro_zona_id) {
      params = params.set('zona_id', String(this.filtro_zona_id));
    }
    if (this.filtro_superficie_min) {
      params = params.set('superficie_min', String(this.filtro_superficie_min));
    }

    this.http.get<any[]>(`${this.apiUrl}/lotes`, { params }).subscribe({
      next: (data) => {
        this.lotes = data || [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando lotes', err);
        this.cdr.detectChanges();
      }
    });
  }

  detectChanges() {
    this.cdr.detectChanges();
  }

  onFiltroCambio() {
    // opcional: recargar al cambiar
  }

  aplicarFiltros() {
    this.cargarLotes();
  }

  verDetalleLote(lote: any) {
    this.detectChanges();
  }
}