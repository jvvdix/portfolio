import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  routerLink?: string;
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

  scrollTo(sectionId: string, event: Event): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0; // obtengo la altura del header
      const topPosition = element.offsetTop - headerHeight; // ajusto la posicion teniendo en cuenta el header para que empiece desde el inicio de los bloques

      window.scrollTo({
        top: topPosition,
        behavior: 'smooth',
      });
    }

    //cierro el menu cuando selecciono un enlace
    this.isMobileMenuActive = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuActive = !this.isMobileMenuActive;
  }
}
