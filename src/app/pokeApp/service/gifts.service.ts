import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gift, IGiftsResponse } from '../interfaces/gifts.interfaces';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GiftsService {
  public giftsList: Gift[] = []
  private _tagsHistory: string[] = [];
  private apiKey: string = "945VAR9lOvewomJua1ryjeEjkzjFQDjj"
  private serviceURL: string = "http://api.giphy.com/v1/gifs"

  constructor(private http: HttpClient) {
    this.getLocalStorage()

   }

  get tagsHIstory(){
    return [...this._tagsHistory]
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private getLocalStorage():void{
      if(localStorage.getItem('history')) {
        this._tagsHistory = JSON.parse(localStorage.getItem('history')!)
      }
      if(this._tagsHistory.length){
        this.searchTag(this.tagsHIstory[0])
      }
  }

  clearLocalStorage():void{
    this._tagsHistory = []
    localStorage.clear()
  }

  private sortHistory(tag:string){
    tag = tag.toLocaleLowerCase()
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag)

    this._tagsHistory = this._tagsHistory.splice(0,10)
    this.saveLocalStorage()
  }

  searchTag(tag:string):Observable<IGiftsResponse>{
    this.sortHistory(tag)

    const params =  new HttpParams()
    .set('api_key', this.apiKey)
    .set('q', `${tag} pokemon`)
    .set('limit', 12)

    //subscribe -- is basically a observer that return a data according a value
    return this.http.get<IGiftsResponse>(`${this.serviceURL}/search`, {params})
    .pipe(
      catchError(()=> of({} as IGiftsResponse)),
      tap((resp) => {
        this.giftsList = resp.data
      })
    )
  }
}
