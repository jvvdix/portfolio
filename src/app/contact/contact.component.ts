import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  @ViewChild('contactForm') contactForm!: ElementRef<HTMLFormElement>;
  @ViewChild('submitButton') submitButton!: ElementRef<HTMLButtonElement>;

  showSuccessMessage = false;

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    //mientras se envia va a aparecer enviando.....
    const submitButton = this.submitButton.nativeElement;
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = 'Enviando...';
    submitButton.disabled = true;

    const form = this.contactForm.nativeElement;
    const formData = new FormData(form);

    if (!formData.has('_captcha')) {
      formData.append('_captcha', 'false');
    }

    if (!formData.has('_next')) {
      formData.append('_next', 'false');
    }

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then(() => {
        this.ngZone.run(() => {
          this.showSuccessMessage = true;

          // vacio el formulario cuando se envie
          form.reset();

          //vuelve a aparecer enviar
          submitButton.innerHTML = originalButtonText;
          submitButton.disabled = false;

          this.cdr.detectChanges();
          //quitamos el mensaje de exito despues de 5 secs
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.cdr.detectChanges();
          }, 5000);
        });
      })
      .catch((error) => {
        console.error('Error:', error);

        this.ngZone.run(() => {
          submitButton.innerHTML = originalButtonText;
          submitButton.disabled = false;
          this.cdr.detectChanges();
        });
      });
  }
}
