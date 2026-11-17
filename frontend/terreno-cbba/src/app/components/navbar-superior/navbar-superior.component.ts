import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navbar-superior',
  templateUrl: './navbar-superior.component.html',
  styleUrls: ['./navbar-superior.component.css'],
})
export class NavbarSuperiorComponent implements OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    // Cleanup
  }

  detectChanges() {
    this.cdr.detectChanges();
  }
}