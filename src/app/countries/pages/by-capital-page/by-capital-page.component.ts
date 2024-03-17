import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {


  searchByCapital(value: string): void {
    console.log('Desde la pagina de capital UUUUU')
    console.log(value)
  }
}
