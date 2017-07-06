import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {TranslationService} from "@angular-addons/translate";

import {Profile} from "../../Entity/Profile";
import {AvatarUploadRequest} from "../../Http/Request/AvatarUploadRequest";
import {ProfileService} from "../../Service/ProfileService";
import {PalleteService} from "../../../Common/Pallete/Service/PalleteService";
import {CropperService2} from "../../../Common/Cropper/Service/CropperService2";

@Component({
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class ProfileRoute implements OnInit {

    public profile: Profile;
    public backdropUrl: string = "https://pbs.twimg.com/profile_banners/385368327/1385539533/1500x500";
    public disabled: boolean = false;

    constructor(
        private route: ActivatedRoute, 
        private translationService: TranslationService,
        public profileService: ProfileService, 
        public palleteService: PalleteService, 
        public cropperService: CropperService2, 
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
            .subscribe((profile) => {
                this.route.snapshot.data["profile"] = profile; // @TODO: Check it
                this.profile = profile;
                this.cropperService.destroy();
            })
        ;
    }
}