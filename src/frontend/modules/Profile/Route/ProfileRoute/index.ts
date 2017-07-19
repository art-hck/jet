import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {TranslationService} from "@angular-addons/translate";

import {Profile} from "../../Entity/Profile";
import {AvatarUploadRequest} from "../../Http/Request/AvatarUploadRequest";
import {ProfileService} from "../../Service/ProfileService";
import {PalleteService} from "../../../Common/Pallete/Service/PalleteService";
import {ProfileAvatarCropperHelper} from "../../Component/ProfileAvatarCropper/helper";
import {ProfileBackdropCropperHelper} from "../../Component/ProfileBackdropCropper/helper";
import {BackdropUploadRequest} from "../../Http/Request/BackdropUploadRequest";

@Component({
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class ProfileRoute implements OnInit {

    public profile: Profile;
    public disabled: boolean = false;

    constructor(
        private route: ActivatedRoute, 
        private translationService: TranslationService,
        public profileService: ProfileService, 
        public palleteService: PalleteService, 
        public avatarHelper: ProfileAvatarCropperHelper,
        public backdropHelper: ProfileBackdropCropperHelper
    ) {}

    ngOnInit() {
        this.profile = this.route.snapshot.data["profile"];
        
        if(this.profileService.hasAvatar(this.profile)) {
            // Preload fullsize avatar
            (new Image()).src = this.profile.avatar['origin'].public_path;
        }
    }
    
    public getProfileColor() {
        return this.palleteService.encode(this.profile.name);
    }
    
    public getProfileFirstLetters() {
        return this.profile.name
            .split(" ")
            .slice(0,2)
            .map(item => item.charAt(0).toUpperCase())
            .join(" ")
        ;
    }

    public translate(string: string) {
        return this.translationService.translate(string);
    }
    
    public uploadAvatar(avatarUploadRequest: AvatarUploadRequest) {
        this.disabled = true;
        this.profileService.uploadAvatar(this.profile, avatarUploadRequest)
            .finally(() => this.disabled = false)
            .subscribe((profile: Profile) => {
                this.profile = this.route.snapshot.data["profile"] = profile;
                this.avatarHelper.destroy();
            })
        ;
    }
    
    public uploadBackdrop(backdropUploadRequest: BackdropUploadRequest) {
        this.disabled = true;
        this.profileService.uploadBackdrop(this.profile, backdropUploadRequest)
            .finally(() => this.disabled = false)
            .subscribe((profile: Profile) => {
                this.profile = this.route.snapshot.data["profile"] = profile;
                this.backdropHelper.destroy();
            })
        ;
    }
}