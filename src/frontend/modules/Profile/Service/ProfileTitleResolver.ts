import {EventEmitter, Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";

import {ProfileService} from "./ProfileService";

@Injectable()
export class ProfileTitleResolver implements Resolve<string> {

    constructor(private profileService: ProfileService) {}

    resolve(): Observable<string> {
        let onTitleLoad = new EventEmitter<string>();

        this.profileService.onProfileResolve
            .first()
            .map(profile => profile.name)
            .subscribe((title) => {
                onTitleLoad.emit(title);
                onTitleLoad.complete();
            });

        return onTitleLoad;
    }
}