import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazyImage',
  templateUrl: 'lazy-image.component.html'
})

export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false;

  constructor() { }
  ngOnInit(): void {
    if (!this.url) {
      throw new Error('Method not implemented.');
    }
  }

  onLoad() {
    // que tarde 1sg en cargar
    setTimeout(() => { this.hasLoaded = true; }, 1000)
  }

}
