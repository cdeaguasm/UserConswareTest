import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertMessageService {

    private _show = new Subject<boolean>();
    private _alertType = new Subject<string>();

    constructor() { }

    getShow(): Subject<boolean> {
        return this._show;
    }

    getAlertType(): Subject<string> {
        return this._alertType;
    }

    showSuccess() {
        this._show.next(true);
        this._alertType.next("alert-success");
    }

    showError() {
        this._show.next(true);
        this._alertType.next("alert-danger");
    }

    hide() {
        setTimeout(() => this._show.next(false), 5000);
    }
}
