import {Component, Inject, Injector, Optional} from "@angular/core";
import {RESPONSE} from "@nguniversal/express-engine/tokens";
import {Response} from "express";

import {PlatformService} from "../../Service/PlatformService";

@Component({
    templateUrl: "./template.pug"
})
export class PageNotFoundRoute {

    constructor(
        private pl: PlatformService,
        private injector: Injector,
        @Optional() @Inject(RESPONSE) private res: Response) 
    {}

    ngOnInit() {
        if (this.pl.isPlatformServer()) {
            this.res.status(404);
        }
    }    
}
