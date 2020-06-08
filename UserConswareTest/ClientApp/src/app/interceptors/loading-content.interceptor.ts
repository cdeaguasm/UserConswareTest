import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingContentService } from '../services/loading-content.service';

@Injectable()
export class LoadingContentInterceptor implements HttpInterceptor {

    constructor(
        private loadingScreenContentService: LoadingContentService
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
            this.loadingScreenContentService.setDescription('Procesando...');
        }
        else {
            this.loadingScreenContentService.setDescription('Cargando...');
        }

        this.loadingScreenContentService.start();

        return next.handle(request).pipe(
            finalize(() => {
                this.loadingScreenContentService.hide();
            })
        );
    }
}
