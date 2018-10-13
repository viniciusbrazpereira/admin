import { Component } from '@angular/core';

export interface Food {
  	value: string;
  	viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
	title = 'admin';
	
	foods: Food[] = [
	    {value: 'steak-0', viewValue: 'Steak'},
	    {value: 'pizza-1', viewValue: 'Pizza'},
	    {value: 'tacos-2', viewValue: 'Tacos'}
	];
}
