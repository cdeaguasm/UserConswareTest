import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingContentService {

    private _loadingSubject = new Subject<boolean>();
    private _descriptionSubject = new Subject<string>();

    getLoading(): Subject<boolean> {
        return this._loadingSubject;
    }

    private setLoading(value: boolean) {
        this._loadingSubject.next(value);
    }

    getDescription(): Subject<string> {
        return this._descriptionSubject;
    }

    setDescription(key: string) {
        this._descriptionSubject.next(key);
    }

    start() {
        this.setLoading(true);
    }

    hide() {
        this.setLoading(false);
    }
}