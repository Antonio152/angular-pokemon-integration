import { Component, Input, OnDestroy, OnInit, input } from '@angular/core';

@Component({
  selector: 'shared-slider',
  template: `

<div class="carousel">
  <div class="slides">
    <div class="slide" *ngFor="let slide of slides; let i = index" [class.active]="i === currentSlideIndex">
      <img [src]="slide" alt="Slide {{i + 1}}">
    </div>
  </div>
  <!-- <button (click)="prevSlide()">Prev</button>
  <button (click)="nextSlide()">Next</button> -->
</div>


  `,
  styleUrl: './slider.component.scss',
})

export class SliderComponent implements OnInit, OnDestroy {
  currentSlideIndex: number = 0;
  @Input()
  public slides: string[] = [
    'https://via.placeholder.com/800x400/FF5733/FFFFFF',
    'https://via.placeholder.com/800x400/33FF57/FFFFFF',
    'https://via.placeholder.com/800x400/5733FF/FFFFFF'
  ];

  private intervalId: any;
  private readonly intervalDuration: number = 2500; // Intervalo en milisegundos

  constructor() { }

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, this.intervalDuration);
  }

  stopCarousel() {
    clearInterval(this.intervalId);
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
  }
}
