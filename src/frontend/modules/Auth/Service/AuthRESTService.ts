import {Injectable} from "@angular/core";
import {SignInRequest} from "../Http/Request/SignInRequest";
import {Observable} from "rxjs";
import {RESTService} from "../../Application/Service/RESTService";
import {ResponseFailure} from "../../Application/Http/ResponseFailure";
import {SignUpRequest} from "../Http/Request/SignUpRequest";
import {RefreshTokenRequest} from "../Http/Request/RefreshTokenRequest";
import {TokenResponse} from "../Http/Response/TokenResponse";

@Injectable()
export class AuthRESTService
{
    constructor(private rest: RESTService){}
    
    public signIn(signInRequest: SignInRequest): Observable<TokenResponse | ResponseFailure> 
    {
        let url = '/auth/sign-in';
        
        return this.rest
            .post(url, JSON.stringify(signInRequest))
            .map(res => res.json())
    }

    public signUp(signUpRequest: SignUpRequest): Observable<TokenResponse | ResponseFailure> 
    {
        let url = '/auth/sign-up';
        
        return this.rest
            .put(url, JSON.stringify(signUpRequest))
            .map(res => res.json())
    }

    public refreshToken(refreshTokenRequest: RefreshTokenRequest): Observable<TokenResponse | ResponseFailure> 
    {
        let url = '/auth/token/refresh';
        
        return this.rest
            .post(url, JSON.stringify(refreshTokenRequest))
            .map(res => res.json())
    }
}