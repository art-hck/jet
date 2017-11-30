import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import {Feed} from "../../Entity/Feed";
import {FeedService} from "../../Service/FeedService";

@Component({
    templateUrl: "./template.pug",
})
export class FeedRoute implements OnInit {
    public isLoading: boolean = false;
    private isFeedEnd: boolean = false;

    public feed: Feed;

    constructor(
        private route: ActivatedRoute,
        public feedService: FeedService
    ) {}

    ngOnInit() {
        this.feed = this.route.snapshot.data.feed;
    }

    public loadFeed(cursor: number) {
        if(this.isLoading || this.isFeedEnd)
            return;

        this.isLoading = true;
        this.feedService
            .get(10, Object.assign({}, this.route.snapshot.data.feedRequest, {cursor: cursor}))
            .finally(() => this.isLoading = false)
            .subscribe((feed) => {
                this.isFeedEnd = feed.length == 0;
                this.feed = this.feed.concat(feed)
            })
        ;
    }
    
    public refresh() {
        if(this.isLoading)
            return;

        this.isLoading = true;
        this.feedService
            .get(10, this.route.snapshot.data.feedRequest)
            .finally(() => this.isLoading = false)
            .subscribe((feed) => this.feed = feed)
        ;
    }
}