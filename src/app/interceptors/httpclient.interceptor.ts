import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment.prod';

@Injectable({
	providedIn: 'root',
})
export class HttpclientInterceptor implements HttpInterceptor {
	constructor(private auth: AuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let isApiUrl = req.url.startsWith(environment.urlHost);
		if (this.auth.isAuthenticated() && isApiUrl) {
			req = req.clone({
				setHeaders: { Authorization: `Bearer ${this.auth.currentToken.access_token}` },
			});
		}

		return next.handle(req);
	}
}
