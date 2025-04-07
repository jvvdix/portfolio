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

    //  si estoy en la sección de proyectos, usar la navegación normal y usa el router para llevarnos a ella
    if (item.label === 'Projects') {
      this.router.navigate([item.routerLink]).then(() => {
        // espero a que la pagina se cargue antes de poder hacer scroll
        setTimeout(() => {
          // aqui tengo en cuenta el header para q no se me corte el contenido
          const headerHeight =
            document.querySelector('header')?.offsetHeight || 0;
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }, 100);
      });
    }
    // para todas las demas secciones
    else if (item.fragment) {
      // si no estoy en la main, navego primero a ella ES DECIR, si estás en proyects y quieres ir a experience, primero navego a home y luego hago scroll a experience
      if (this.router.url !== '/' && this.router.url !== '/home') {
        this.router.navigate(['/'], { fragment: item.fragment }).then(() => {
          // el mismo retraso que antes
          setTimeout(() => this.scrollToElement(item.fragment!), 300);
        });
      } else {
        // si ya estoy en la main, solo hago el scroll
        this.scrollToElement(item.fragment);
      }
    }

    this.isMobileMenuActive = false;
  }

  // funcion para el scroll que vuelve a tener en cuenta el header
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

  // compatibilidad con el routerLink de angular, para que funcione el scroll al hacer click en los enlaces
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
