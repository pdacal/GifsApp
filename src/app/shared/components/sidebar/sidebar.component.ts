import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
// inxectar o servicio eiqui
// private getService
constructor( private gifsService: GifsService){}

get tags(): string[]{
   return this.gifsService.tagsHistory;
}
// este metodo usase en sidebar.html para que ó clcikar
//nalgun tag-> envie o tag á barra de busqueda e saque
//de novo os resultados
searchTag(tag: string){
  this.gifsService.searchTag(tag);
}
}
