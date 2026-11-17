import { Component, OnDestroy, ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-publicar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.css'],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PublicarComponent implements OnDestroy {
  loading: boolean = false;
  exito: boolean = false;
  error: string | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnDestroy(): void {
    // Cleanup
  }

  onSubmit(form: any) {
    this.loading = true;
    this.error = null;
    this.exito = false;
    
    // this.inmobiliariaService.crearLote(form.value).subscribe({
    //   next: () => {
    //     this.loading = false;
    //     this.exito = true;
    //     setTimeout(() => this.cargarLotes(), 1000);
    //   },
    //   error: (err) => {
    //     this.loading = false;
    //     this.error = err.error?.message || 'Error al publicar';
    //   }
    // });
    
    // Simulación
    setTimeout(() => {
      this.loading = false;
      this.exito = true;
      this.detectChanges();
    }, 1000);
  }

  cargarLotes() {
    // Recargar catálogo
    this.detectChanges();
  }

  detectChanges() {
    this.cdr.detectChanges();
  }
}