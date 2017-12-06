import {Component, HostBinding, HostListener} from "@angular/core";
import {LoadingBar, LoadingBarState, LoadingBarEvents} from "@angular-addons/loading-bar";

import {SidebarService} from "../../../Sidebar/Service/SidebarService";
import {AuthService} from "../../../Auth/Service/AuthService";
import {RouteHelperService} from "../../Service/RouteHelperService";
import {Device} from "../../Service/DeviceService";
import {ProfileService} from "../../../Profile/Service/ProfileService";
import {AppHotkeys} from "./hotkeys";
import {ApplicationScrollService} from "../../Service/ApplicationScrollService";

@Component({
    selector: "application",
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class ApplicationComponent {
    @HostBinding("class") className: string = "";
    public device = Device;
    public isSearchResultsVisible = false;
    public isProfileTooltipVisible = false;
    public searchResults = [
        "РЫБАЛКА С БРАТЬЯМИ ТАЙМАСОВЫМИ",
        "Рыбалка в ОАЭ, аренда яхт в Дубай",
        "Рыбалка -Карлсон Дорогой",
        "Рыбалка Fishing -Alex B",
        "Клуб рыбаков. Рыбалка. Club fishermen. fishing",
        "Рыбалка на видео"
    ];

    constructor(
        public sidebar: SidebarService,
        public auth: AuthService,
        public profile: ProfileService,
        private appScrollService: ApplicationScrollService,
        private routeHelper: RouteHelperService,
        private loadingBarEvents: LoadingBarEvents
    ) {
        loadingBarEvents.onChangeState
            .map((loadingBar: LoadingBar) => loadingBar.state)
            .map((state: LoadingBarState) => state ? "progress" : "")
            .subscribe((className: string) => this.className = className);

        this.routeHelper.titleWatcher();
        this.routeHelper.loadingIndicatorWatcher();
    }

    @HostListener('window:keydown', ['$event'])
    onKeydown(e) {
        if(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
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
}