import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {UIModule} from "../UI/UIModule";
import {TranslateModule} from "../Translate/TranslateModule";

import {SignInFormComponent} from "./Component/SignInForm/index";
import {SignUpFormComponent} from "./Component/SignUpForm/index";
import {SocialButtonsComponent} from "./Component/SocialButtons/index";

import {SignInRoute} from "./Route/SignInRoute/index";
import {SignUpRoute} from "./Route/SignUpRoute/index";

import {AuthRESTService} from "./Service/AuthRESTService";
import {AuthService} from "./Service/AuthService";
import {CanActivateService} from "./Service/CanActivateService";
import {TokenStorageService} from "./Service/TokenStorageService";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        UIModule,
        TranslateModule
    ],
    declarations:[
        SignInFormComponent,
        SignUpFormComponent,
        SignInRoute,
        SignUpRoute,
        SocialButtonsComponent,
    ],
    providers: [
        AuthRESTService,
        AuthService,
        TokenStorageService,
        CanActivateService
    ]
})
export class AuthModule {}