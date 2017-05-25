import {CanActivateService} from "../modules/Auth/Service/CanActivateService";
import {FeedRoute} from "../modules/Feed/Route/FeedRoute/index";
import {ForbiddenRoute} from "../modules/Application/Route/ForbiddenRoute/index";
import {PageNotFoundRoute} from "../modules/Application/Route/PageNotFoundRoute/index";
import {ProfileRoute} from "../modules/Profile/Route/ProfileRoute/index";
import {SignInRoute} from "../modules/Auth/Route/SignInRoute/index";
import {SignUpRoute} from "../modules/Auth/Route/SignUpRoute/index";
import {ProfileSettingsRoute} from "../modules/Profile/Route/ProfileSettingsRoute/index";
import {JetRoutes} from "../modules/Application/Entity/JetRoute";

export const appRoutes: JetRoutes = [
    {
        path: '',
        component: FeedRoute,
        data: {title: 'Hot'}
    },
    {
        path: 'new',
        component: FeedRoute,
        data: {title: 'Hot'}
    },
    {
        path: 'best',
        component: FeedRoute,
        data: {title: 'Hot'}
    },
    { // Страница авторизации
        path: 'login',
        component: SignInRoute,
        data: { title: 'Login page', returnUrl: '/' }
    },
    { // Страница регистрации
        path: 'register',
        component: SignUpRoute,
        data: { title: 'Registration', returnUrl: '/'}
    },
    { // Новости профиля
        path: 'feed',
        component: ProfileRoute,
        canActivate: [CanActivateService],
        data: { title: 'News', allow: ["ROLE_CREATED"]},
    },
    { // Настройки профиля
        path: 'settings',
        component: ProfileSettingsRoute,
        canActivate: [CanActivateService],
        data: { title: 'Settings', allow: ["ROLE_CREATED"] },
    },
    { // Страница профиля (редирект на новости если не указан id профиля)
        path: 'profile',
        children: [
            { path: '', redirectTo: '/feed', pathMatch: 'full' },
            {
                path: ':id',
                component: ProfileRoute,
                data: { title: 'Profile'}
            }
        ]
    },
    {
        path: 'forbidden',
        component: ForbiddenRoute,
        data: { title: '403 - Access denied' }
    },
    {
        path: '**',
        component: PageNotFoundRoute,
        data: { title: '404 - Now found' }
    }
];