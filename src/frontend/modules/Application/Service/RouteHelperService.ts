import {Injectable} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {TranslationService} from "../../UI/Translate/Service/TranslationService";
import {LoadingBarService} from "../../UI/LoadingBar/Service/LoadingBarService";

@Injectable()
export class RouteHelperService {

    private showProgressBarSubscription: Subscription = new Subscription();
    
    constructor(
        private titleService: Title,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private translationService: TranslationService,
        private loadingBar: LoadingBarService
    ) {}
    
    loadingIndicatorWatcher() {
        this.router.events.subscribe((event: Event) => {

            switch (event.constructor) {
                case NavigationStart:
                    this.showProgressBarSubscription = Observable.of([]).delay(100).subscribe(()=>{
                        this.loadingBar.setProgress(30);
                        this.loadingBar.startProgress();
                    });
                break;
                case NavigationEnd:
                case NavigationCancel:
                case NavigationError:
                    this.showProgressBarSubscription.unsubscribe();
                    if(this.loadingBar.get().progress > 0) {
                        this.loadingBar.completeProgress();
                    }
                break;
            }
        });
    }
    
    titleWatcher() {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => {
                let title = this.translationService.translate(event['title']);
                this.titleService.setTitle(title)
            });
    }
}