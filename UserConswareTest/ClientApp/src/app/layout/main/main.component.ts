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
    showAlert: boolean;
    descriptionLoadContentScreen: string;
    descriptionAlert: string;
    alertType: string;

    loadingSubscription$: Subscription;
    showAlertSubscription$: Subscription;
    descriptionLoadContentScreenSubscription$: Subscription;
    descriptionAlertSubscription$: Subscription;
    alertTypeSubscription$: Subscription;

    constructor(
        private loadingContentService: LoadingContentService,
        private alertMessageService: AlertMessageService,
        private cdRef: ChangeDetectorRef) { }

    ngAfterViewChecked() {
        this.initLoadingContent();
        this.initAlertMessage();
    }

    initLoadingContent() {
        this.descriptionLoadContentScreenSubscription$ = this.loadingContentService.getDescription()
            .subscribe(description => this.descriptionLoadContentScreen = description);

        this.loadingSubscription$ = this.loadingContentService.getLoading()
            .subscribe(value => this.showLoading = value);

        this.cdRef.detectChanges();
    }

    initAlertMessage() {
        this.descriptionAlertSubscription$ = this.alertMessageService.getDescription()
            .subscribe(description => this.descriptionAlert = description);

        this.showAlertSubscription$ = this.alertMessageService.getShow()
            .subscribe(value => this.showAlert = value);

        this.alertTypeSubscription$ = this.alertMessageService.getAlertType()
            .subscribe(value => this.alertType = value);

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
