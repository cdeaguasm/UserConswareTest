import { Component, OnDestroy, AfterViewChecked } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core'
import { Subscription } from 'rxjs/internal/Subscription';
import { LoadingContentService } from 'src/app/services/loading-content.service';
import { AlertMessageService } from 'src/app/services/alert-message.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnDestroy, AfterViewChecked {

    showLoading: boolean;
    descriptionLoadContentScreen: string;
    loadingSubscription$: Subscription;
    descriptionLoadContentScreenSubscription$: Subscription;

    constructor(
        private loadingContentService: LoadingContentService,
        private alertMessageService: AlertMessageService,
        private cdRef: ChangeDetectorRef) { }

    ngAfterViewChecked() {
        this.initLoadingContent();
    }

    initLoadingContent() {
        this.descriptionLoadContentScreenSubscription$ = this.loadingContentService.getDescription()
            .subscribe(description => this.descriptionLoadContentScreen = description);

        this.loadingSubscription$ = this.loadingContentService.getLoading()
            .subscribe(value => this.showLoading = value);

        this.cdRef.detectChanges();
    }

    ngOnDestroy() {
        if (this.loadingSubscription$) {
            this.loadingSubscription$.unsubscribe();
        }

        if (this.descriptionLoadContentScreenSubscription$) {
            this.descriptionLoadContentScreenSubscription$.unsubscribe();
        }
    }

}
