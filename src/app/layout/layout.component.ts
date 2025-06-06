import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterOutlet],
})
export class LayoutComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.setVhProperty();
    window.addEventListener('resize', () => this.setVhProperty());
    this.addSparkListener();
  }

  private setVhProperty() {
    const vh = window.innerHeight * 0.01;
    this.renderer.setStyle(document.documentElement, '--vh', `${vh}px`);
  }

  private addSparkListener() {
    const container = document.body;

    const createSpark = (event: MouseEvent) => {
      const spark = this.renderer.createElement('div');
      this.renderer.addClass(spark, 'spark');

      this.renderer.setStyle(spark, 'top', `${event.clientY}px`);
      this.renderer.setStyle(spark, 'left', `${event.clientX}px`);
      this.renderer.setStyle(
        spark,
        'filter',
        `hue-rotate(${Math.random() * 360}deg)`
      );

      for (let i = 0; i < 8; i++) {
        const span = this.renderer.createElement('span');
        this.renderer.setStyle(span, 'transform', `rotate(${i * 45}deg)`);
        this.renderer.appendChild(spark, span);
      }

      this.renderer.appendChild(container, spark);

      setTimeout(() => {
        this.renderer.removeChild(container, spark);
      }, 1000);
    };

    this.renderer.listen(container, 'click', createSpark);
  }
}
