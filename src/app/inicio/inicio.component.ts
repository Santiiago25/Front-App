import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
 
  menuActive: boolean = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const menu = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    if (menu && hamburger) {
      const target = event.target as HTMLElement;
      if (!menu.contains(target) && !hamburger.contains(target)) {
        this.menuActive = false;
      }
    }
  }
}
