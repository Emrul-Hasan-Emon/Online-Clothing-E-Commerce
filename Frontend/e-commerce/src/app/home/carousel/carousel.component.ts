import { Component } from '@angular/core';
import { Carousel } from 'src/app/Data/carouselImages';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  carouselImages: any;
  activeIndex = 0;
  currentSlide = 0;
  interval: any;

  ngOnInit() {
    this.carouselImages = Carousel;
    this.autoPlay();
  }

  autoPlay() {
    setInterval(() => {
      this.nextSlide();
    }, 2000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
  } 
}
