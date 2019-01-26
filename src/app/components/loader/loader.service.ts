import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface LoaderState {
    showLoader: boolean;
    showBackdrop: boolean;
    transformation: boolean;
}

@Injectable()
export class LoaderService {

    private loaderSubject = new Subject<LoaderState>();

    loaderState = this.loaderSubject.asObservable();
    transformationState = this.loaderSubject.asObservable();

    constructor() { }

    show() {
        this.loaderSubject.next(<LoaderState>{showLoader: true, showBackdrop: true});
    }

    hide() {
        this.loaderSubject.next(<LoaderState>{showLoader: false, showBackdrop: false});
    }

    showBackdrop() {
        this.loaderSubject.next(<LoaderState>{showLoader: true, showBackdrop: true});
    }

    showTransformation() {
        this.loaderSubject.next(<LoaderState>{transformation: true});
    }

    hideTransformation() {
        this.loaderSubject.next(<LoaderState>{transformation: false});
    }
    
}
