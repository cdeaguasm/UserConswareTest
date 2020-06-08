import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertMessageService {

    private _show = new Subject<boolean>();
    private _alertType = new Subject<string>();
    private _description = new Subject<string>();

    constructor() { }

    getShow(): Subject<boolean> {
        return this._show;
    }

    getAlertType(): Subject<string> {
        return this._alertType;
    }

    getDescription(): Subject<string> {
        return this._description;
    }

    show(alertClass: string, description: string) {
        this._show.next(true);
        this._alertType.next(alertClass);
        this._description.next(description);
        setTimeout(() => this._show.next(false), 8000);
    }
}
