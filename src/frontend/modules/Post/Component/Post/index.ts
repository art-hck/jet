import {Component, ElementRef, HostBinding, HostListener, Input, Renderer2} from '@angular/core';
import {Router} from "@angular/router";
import {TranslationService} from "@angular-addons/translate";
import * as getSlug from "speakingurl";

import {PostHotkeys} from "./hotkeys";
import {Post} from "../../Entity/Post";
import {PostService} from "../../Service/PostService";
import {AttachmentType} from "../../../Attachment/Entity/Attachment";
import {ApplicationScrollService} from "../../../Application/Service/ApplicationScrollService";
import {VoteState} from "../../../Vote/Entity/Vote";

@Component({
    selector: 'post',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})
export class PostComponent {
    public AttachmentType = AttachmentType;
    public minimized: boolean = false;
    public isIntoView: boolean = false;

    // @ViewChild("content") content: ElementRef;
    
    @HostBinding('class.visited')
    public visited: boolean = false;

    // @DOTO Доделать развернуть длиннопост!
    // @HostBinding('class.long-post')
    // get isLongPost () {
    //     if(this.content) {
    //         return this.content.nativeElement.offsetHeight > 200;
    //     }
    // }    

    @Input() post: Post;
    
    constructor(
        public render: Renderer2, 
        public el: ElementRef,
        public appScrollService: ApplicationScrollService,
        public translationService: TranslationService,
        public postService: PostService,
        public router: Router
    ){
        this.appScrollService
            .onScroll
            .debounceTime(50)
            .filter(scrollTop => scrollTop + 100 > this.el.nativeElement.offsetTop)
            .subscribe(() => this.markAsVisited())
        ;

        this.appScrollService
            .onScroll
            .debounceTime(50)
            .subscribe((scrollTop) => {
                this.isIntoView =
                    scrollTop < this.el.nativeElement.offsetTop + this.el.nativeElement.offsetHeight
                    &&  scrollTop + this.appScrollService.mainHeight > this.el.nativeElement.offsetTop 
                ;
            })
        ;
    }
    
    public toggleView() {
        this.minimized = !this.minimized;
        if(this.el.nativeElement.offsetTop <  this.appScrollService.getScroll()) {
            this.el.nativeElement.scrollIntoView();
            this.render.addClass(this.el.nativeElement, "highlight");
            setTimeout(() => this.render.removeClass(this.el.nativeElement, "highlight"), 2000);
        }
    }

    @HostListener('click')
    markAsVisited() {
        this.visited = true;    
    }

    @HostListener('window:keyup', ['$event.keyCode'])
    onKeydown(keyCode: number) {
        switch (keyCode) {
            case PostHotkeys.VotePositive:
                this.vote("positive");
                break;
            case PostHotkeys.VoteNegative:
                this.vote("negative");
                break;
            case PostHotkeys.OpenPost:
                typeof window != 'undefined' && window.open(this.getPostUrl());
                break;
        }
    }

    private voteInProgress = false;
    public vote(state: VoteState) {
        if(!this.voteInProgress && this.post.votes.state !== state) {

            if(this.post.votes.state !== "none") {
                this.post.votes[this.post.votes.state] -= 1;
                state = "none";
            }

            this.post.votes[state] += 1;
            this.post.votes.state = state;

            this.postService
                .vote(this.post, state)
                .finally(() => this.voteInProgress = false)
                .subscribe()
            ;
        }
    }
    
    getPostUrl() {
        return `/post/${getSlug(this.post.title)}-${this.post.id}`;
    }
    
}