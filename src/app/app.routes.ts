import { Routes } from '@angular/router';
// Lazy loading with components
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'contact', // Route for the contact page
        loadComponent: () =>
          import('./contact/contact.component').then((m) => m.ContactComponent),
      },
      {
        path: 'about', // Route for the about page
        loadComponent: () =>
          import('./about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'skills',
        loadComponent: () =>
          import('./skills/skills.component').then((m) => m.SkillsComponent),
      },
      {
        path: 'experience', // Route for the about page
        loadComponent: () =>
          import('./experience/experience.component').then(
            (m) => m.ExperienceComponent
          ),
      },
      {
        path: 'projects', // Route for the about page
        loadComponent: () =>
          import('./projects/projects.component').then(
            (m) => m.ProjectsComponent
          ),
      },
      {
        path: '', // Route for the about page
        loadComponent: () =>
          import('./main/main.component').then((m) => m.MainComponent),
      },
    ],
  },
];
