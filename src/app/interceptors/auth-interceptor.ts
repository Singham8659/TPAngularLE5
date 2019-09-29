import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private auth: AuthenticationService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        const authToken = localStorage.getItem("access_token");
        console.log(authToken);
        const authReq = req.clone({ setHeaders: { Authorization: 'Bearer '+authToken } });
        return next.handle(authReq);

    }
}