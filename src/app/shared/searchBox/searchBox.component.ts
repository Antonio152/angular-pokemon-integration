import {  Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  template: `
      <input
        class="border rounded rounded-xl w-full py-2 px-3 text-black focus:outline-none"
        type="search"
        placeholder="Buscar Pokemon..."
        (keyup.enter)="searchElement()"
        #searchBoxV
      >
  `,
})
export class SearchBoxComponent /* implements OnInit, OnDestroy */ {

  /* private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription; */

  constructor() { }

  @Output()
  public searchTerm: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('searchBoxV')
  public valueSearch!: ElementRef<HTMLInputElement>;

  /* Tiempo de espera para ejecutar una acción al teclear algo */
 /*  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(300),
    )
    .subscribe((value) => {
      if (!this.debouncer) return;
      this.searchTerm.emit(value);
    });
  } */

  /* unsuscribe debouncer */
  /* ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  } */


  searchElement() {
    /* this.debouncer.next(this.valueSearch.nativeElement.value); */
    this.searchTerm.emit(this.valueSearch.nativeElement.value);
    this.valueSearch.nativeElement.value = '';

  }

}
