import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Data} from "cropperjs";

import {AvatarUploadRequest} from "../../Http/Request/AvatarUploadRequest";
import {ProfileAvatarCropperHelper} from "./helper";
import {Config} from "../../../../app/config";
import {FormControl, FormGroup, ValidationErrors} from "@angular/forms";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'profile-avatar-cropper',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class ProfileAvatarCropperComponent {
    @Input('disabled') disabled: boolean = false;
    @Output('onCrop') onCrop = new EventEmitter<AvatarUploadRequest>();

    public form: FormGroup = new FormGroup({
        src: new FormControl(null, null, this.validate.bind(this)),
        data: new FormControl(),
    });

    public cropperOptions = {
        viewMode: 1,
        center: false,
        guides: false,
        highlight: false,
        background: false,
        zoomOnWheel: false,
        toggleDragModeOnDblclick: false,
        preview: '.preview',
        minCropBoxWidth: 100,
        minCropBoxHeight: 100,
        aspectRatio: 1,
    };

    constructor(public helper: ProfileAvatarCropperHelper) {
        helper.onChange.subscribe((data) => this.form.controls.src.setValue(data.src));
    }

    validate(srcControl: FormControl): Observable<ValidationErrors> {
        let avatar = new Image();
        avatar.src = srcControl.value;

        return Observable.fromEvent(avatar, "load").map(() => {
            let constraints = Config.profile.constraints.avatar;
            let errors: ValidationErrors = {};
            let ratio = avatar.width / avatar.height;
            
            if(avatar.width > constraints.maxWidth || avatar.height > constraints.maxHeight) {
                errors.tooLarge = true;
            }

            if(avatar.width < constraints.minWidth || avatar.height < constraints.minHeight) {
                errors.tooSmall = true;
            }

            if(ratio > constraints.maxAspectRatio || ratio < constraints.minAspectRatio) {
                errors.invalidAspectRatio = true;
            }

            if(Object.keys(errors).length > 0) {
                return errors;
            }
        });
    }
    
    public submit(data: Data) {
        this.onCrop.emit({
            x: data.x,
            y: data.y,
            width: data.width,
            height: data.height,
            image: this.helper.image
        });
    }    
}