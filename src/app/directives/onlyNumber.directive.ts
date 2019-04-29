import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {

  constructor(private el: ElementRef) { }

  @Input() appOnlyNumberDirective: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    
    const e = <KeyboardEvent> event;
    
    if (this.appOnlyNumberDirective) {

      if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
        
        // Ctrl+A
        (e.keyCode === 65 && e.ctrlKey === true) ||
        
        // Ctrl+C
        (e.keyCode === 67 && e.ctrlKey === true) ||
        
        // Ctrl+X
        (e.keyCode === 88 && e.ctrlKey === true) ||
        
        // Home, End, Left, Right
        (e.keyCode >= 35 && e.keyCode <= 39)) {

          return;

        }
        
        // Garante que é um número e para propagação do evento
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }

      }
  }
}
