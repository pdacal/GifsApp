import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: 'card-list.component.html'
})

export class CardListComponent {
  // usase para recibir en home-page.html, e recolle gifs de home-page.ts
  @Input()
  public gifs: Gif[] = [];

}
