import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';
@Injectable({ providedIn: 'root' })
export class GifsService {

  private _tagsHistory: string[] = [];
  // alamacenar os gifs
  public gifList:Gif[]=[];
  private apiKey: string = 'mEZnLvDbICqM6QLRoTGxV12kcA4OkoqF';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  private organizeHistory(tag: string) {
    // pasamos todo a minuscula para poder comparar mellor
    tag = tag.toLowerCase();
    // BORRO O TAG ANTERIOR
    if (this._tagsHistory.includes(tag)) {
      // filtramos os tags, collo un tagVello, e guardoo se é distinto ó novo tag introducido:
      // si oldTag -> distinto do tag novo introducido, gardao
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    // SUBO O NOVO TAG ó PRINCIPIO, insertoo no array
    this._tagsHistory.unshift(tag);
    // limitar o array a 10, vai cortando do 0 ó 10 cada vez que se inclue un tag
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    // asi garda os cambios no local Storage, falta leela!!
    this.saveLocalStorage();
  }

  constructor( private http: HttpClient  ) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    // os arrays pasan por referencia, co spread ... paso unha copia
    return [...this._tagsHistory];
  }

  private saveLocalStorage():void{
    // gardamos o array convertido a string
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }
  private loadLocalStorage():void{
    if (!localStorage.getItem('history')){ return; }
    // pasar o string a arrays para podelos recuperar
    // ! para indicarlle que sempre lle vai vir data, senon da erro
    //este metodo chamase no constructor
    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );
    // para que ó cargarse a paxina mostre a primeira busqueda
    if(this._tagsHistory.length === 0){ return; }
      this.searchTag(this._tagsHistory[0]);

  }


  async searchTag(tag: string): Promise<void> {
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    // parametros http que vamos enviar, similar o que faciamos en Postman
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag);
    //observable, objeto que ó largo do tempo pode emitir valores
    // backticks para engadir un obxeto con `${this.obxeto}/link`
    // introducimoslle a interfaz<SearchResponse>
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
    .subscribe( (resp) => {
      this.gifList = resp.data;
    });
// no navegador na consola vemos que hai un array de 10 posicions
  // hai estas duas formas de facelo:
    // fetch('')
    // .then( resp => resp.json())
    // .then(data => console.log(data));
    // outra forma:
    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=mEZnLvDbICqM6QLRoTGxV12kcA4OkoqF&q=fallout&limit=10 postman');
    // const data = await resp.json();
    // console.log(data);
  }



}
