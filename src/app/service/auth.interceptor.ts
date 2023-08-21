import { HTTP_INTERCEPTORS, HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginserviceService } from "./loginservice.service";

export const BYPASS_LOG = new HttpContextToken(() => false);

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private login: LoginserviceService){ }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authReq = req;
        
        //add the jwtToken from localStorage to request header
        const token = this.login.getToken()

        if(token != null){
            authReq = authReq.clone({
                setHeaders:{ Authorization: `Bearer ${token}` }
            })
        }

        console.log('authReq ')
        console.log(authReq.headers)
        return next.handle(authReq)
    }
}

export const authInterceptorProviders=[
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    },
];