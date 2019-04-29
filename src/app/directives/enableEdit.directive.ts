import {Directive, HostListener, HostBinding, Input, ElementRef} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Directive({
  selector: '[appEnableEdit]'
})
export class EnableEditDirective { 
  
  @Input('editOptions')  public editOptions: any;
  @Input('editFormGroup')  public editFormGroup: FormGroup;
  @Input('editDisabled')  public editDisabled: boolean;
  
  @HostBinding('disabled') private disabled: boolean;

  constructor(private element:ElementRef) {}

  ngOnChanges() {    
    this.disabled = false;

    if (this.editOptions.canEdit){
      if(this.editDisabled != undefined && this.editDisabled){
        this.disabled = true;
        return;
      }
        
      if (this.editFormGroup && !this.editFormGroup.valid) {
        this.disabled = true;
      }
    } else {
      this.disabled = true;
    }
  }

}
