import { Component, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-lote-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lote-card.component.html',
  styleUrls: ['./lote-card.component.css'],
})
export class LoteCardComponent implements OnDestroy {
  @Input() lote: any = {};
  @Output() verDetalle = new EventEmitter<any>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    // Cleanup
  }

  onVerDetalle() {
    this.verDetalle.emit(this.lote);
  }

  detectChanges() {
    this.cdr.detectChanges();
  }
}