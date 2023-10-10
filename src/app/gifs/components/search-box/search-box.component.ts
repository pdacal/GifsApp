import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar:</h5>
  <input
  type="text"
  class="form-control"
  placeholder="Buscar gifs..."
  (keyup.enter)="searchTag()" #txtTagInput>
  `
  // keyup.enter, que se active so cando se pulse entero
  // #txtTagInput, evitamos importar o FormsModule, é unha referencia LOCAL
})

export class SearchBoxComponent  {
// queremos que sexa a referencia directa ó html, para eso decoramolo co ViewChild
  // engadimoslle a referencia local do boton
@ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

// inxectar o servicio gifs.service.ts
  constructor( private gifsService: GifsService) { }


  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag( newTag );
    this.tagInput.nativeElement.value= '';
  }
}
