import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  routerLink: string;
  href?: string;
  class?: string;
  id?: string;
  fragment?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isMobileMenuActive = false;
  constructor(private router: Router) {}

  menuItems: MenuItem[] = [
    {
      label: 'Home',
      routerLink: '/',
      fragment: 'home',
    },
    {
      label: 'Skills',
      routerLink: '/skills',
      fragment: 'skills',
    },
    {
      label: 'About me',
      routerLink: '/about',
      fragment: 'about',
    },
    {
      label: 'Experience',
      routerLink: '/experience',
      fragment: 'experience',
    },
    {
      label: 'Projects',
      routerLink: '/projects',
      fragment: 'projects',
    },
    {
      label: 'Contact',
      routerLink: '/contact',
      fragment: 'contact',
    },
  ];

  handleNavigation(item: MenuItem, event: Event): void {
    event.preventDefault();

    // Si es la sección de Projects, usar la navegación normal
    if (item.label === 'Projects') {
      this.router.navigate([item.routerLink]).then(() => {
        // Esperar un momento para que la página se cargue
        setTimeout(() => {
          // Ajustar el scroll para compensar la altura del header
          const headerHeight =
            document.querySelector('header')?.offsetHeight || 0;
          window.scrollTo({
            top: 0, // Empezar desde arriba pero compensando el header
            behavior: 'smooth',
          });
        }, 100);
      });
    }
    // Para todas las demás secciones que usan fragmentos
    else if (item.fragment) {
      // Si no estamos en la página principal, navegar primero a ella
      if (this.router.url !== '/' && this.router.url !== '/home') {
        this.router.navigate(['/'], { fragment: item.fragment }).then(() => {
          // Pequeño retraso para asegurar carga completa
          setTimeout(() => this.scrollToElement(item.fragment!), 300);
        });
      } else {
        // Ya estamos en la página principal, solo hacer scroll
        this.scrollToElement(item.fragment);
      }
    }

    this.isMobileMenuActive = false;
  }

  // Función auxiliar para hacer scroll a un elemento
  private scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const topPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: topPosition,
        behavior: 'smooth',
      });
    }
  }

  // Mantener las funciones existentes por compatibilidad
  scrollTo(sectionId: string, event: Event): void {
    this.handleNavigation(
      this.menuItems.find((item) => item.fragment === sectionId) ||
        this.menuItems[0],
      event
    );
  }

  toggleMobileMenu(): void {
    this.isMobileMenuActive = !this.isMobileMenuActive;
  }

  navigateTo(link: string): void {
    const projectItem = this.menuItems.find((item) => item.routerLink === link);
    if (projectItem) {
      this.handleNavigation(projectItem, new Event('click'));
    } else {
      this.router.navigate([link]);
      this.isMobileMenuActive = false;
    }
  }
}
