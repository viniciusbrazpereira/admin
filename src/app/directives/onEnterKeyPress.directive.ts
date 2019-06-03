import {Directive, HostListener, Input,Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[appOnEnterKeyPress]'
})
export class OnEnterKeyPressDirective {  
  
  @Output('appOnEnterKeyPress') 
  onEnterKeyPress: EventEmitter<any> = new EventEmitter();

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    const e = <KeyboardEvent> event;  
    if (e.keyCode == 13) {
      this.onEnterKeyPress.emit();
    }
  }
}
