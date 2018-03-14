import {Component, HostBinding, HostListener} from "@angular/core";
import {Router} from "@angular/router";
import {LoadingBar, LoadingBarState, LoadingBarEvents} from "@angular-addons/loading-bar";

import {SidebarService} from "../../../Sidebar/Service/SidebarService";
import {AuthService} from "../../../Auth/Service/AuthService";
import {RouteHelperService} from "../../Service/RouteHelperService";
import {Device} from "../../Service/DeviceService";
import {ProfileService} from "../../../Profile/Service/ProfileService";
import {AppHotkeys} from "./hotkeys";
import {ApplicationScrollService} from "../../Service/ApplicationScrollService";
import {PlatformService} from "../../Service/PlatformService";
import {SearchRESTService} from "../../../Search/Service/SearchRESTService";
import {FormControl, Validators} from "@angular/forms";
import {Autocomplete} from "../../../Search/Entity/Autocomplete";
import {PostService} from "../../../Post/Service/PostService";

@Component({
    selector: "application",
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class ApplicationComponent {
    @HostBinding("class") className: string = "";
    public device = Device;
    public isProfileTooltipVisible = false;
    public autocomplete: Autocomplete[] = [];
    public searchInputControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

    constructor(
        public router: Router,
        public sidebar: SidebarService,
        public auth: AuthService,
        public profile: ProfileService,
        public pl: PlatformService,
        private appScrollService: ApplicationScrollService,
        private routeHelper: RouteHelperService,
        private loadingBarEvents: LoadingBarEvents,
        private searchService: SearchRESTService,
        private postService: PostService
    ) {
        loadingBarEvents.onChangeState
            .map((loadingBar: LoadingBar) => loadingBar.state)
            .map((state: LoadingBarState) => state ? "progress" : "")
            .subscribe((className: string) => this.className = className);

        this.routeHelper.titleWatcher();
        this.routeHelper.loadingIndicatorWatcher();
        this.routeHelper.historyWatcher();
        
        if(this.pl.isPlatformBrowser()) {
            this.routeHelper.yandexMetrikaWatcher();
        }
    }

    @HostListener('window:keydown', ['$event'])
    onKeydown(e) {
        if(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.ctrlKey) {
            return;
        }

        switch (e.keyCode) {
            case AppHotkeys.ScrollUp:
                this.appScrollService.scrollTo(this.appScrollService.getScroll() - 100);
                break;
            case AppHotkeys.ScrollDown:
                this.appScrollService.scrollTo(this.appScrollService.getScroll() + 100);
                break;
        }
    }

    ngOnInit() {
        this.searchInputControl.valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .filter(() => this.searchInputControl.valid)
            .flatMap(query => this.searchService.autocomplete(query))
            .subscribe(autocomplete => this.autocomplete = autocomplete);
    }
}