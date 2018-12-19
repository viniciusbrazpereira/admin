import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderState, LoaderService } from './loader.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit, OnDestroy {

    showLoader = false;
    showBackdrop = true;

    private subscription: Subscription;

    constructor(private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
            this.showLoader = state.showLoader;
            this.showBackdrop = state.showBackdrop;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
