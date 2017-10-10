import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DndModule} from "ng2-dnd";
import {TagInputModule} from "ngx-chips";

import {PostRESTService} from "./Service/PostRESTService";
import {PostResolver} from "./Service/PostResolver";
import {PostTitleResolver} from "./Service/PostTitleResolver";
import {PostRoute} from "./Route/PostRoute/index";
import {PostFormRoute} from "./Route/PostFormRoute/index";
import {CommonModule} from "../Common/CommonModule";
import {AttachmentModule} from "../Attachment/AttachmentModule";
import {PostCreateButtonComponent} from "./Component/PostCreateButton/index";

@NgModule({
    imports: [
        TagInputModule,
        DndModule.forRoot(),
        AttachmentModule,
        CommonModule,
        RouterModule
    ],
    declarations: [
        PostCreateButtonComponent,
        PostRoute,
        PostFormRoute
    ],
    providers: [
        PostRESTService,
        PostResolver,
        PostTitleResolver
    ],
    exports:[
        PostCreateButtonComponent
    ]
})
export class PostModule {}