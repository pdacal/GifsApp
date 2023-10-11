import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: 'card.component.html'
})

export class GifsCardComponent implements OnInit{

  //recollerá o texto en card-list.component.HTML, recibindo os gifs de card-list.TS
  //tamen se usa no gifs-card html para un ngFor
  @Input()
  public gif!: Gif;
// por si sale error
  ngOnInit(): void{
  if ( !this.gif )  throw new Error('Method not implemented.')
  }
}
