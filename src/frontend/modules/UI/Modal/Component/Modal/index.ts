import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'modal',
    templateUrl: './template.pug',
    host: {'(window:keydown)': 'onKeyDown($event)'},
    styleUrls: ['./style.shadow.scss']
})

export class ModalComponent {
    @Input('width') width: string = 'auto';
    @Input('height') height: string = 'auto';
    @Input('backdrop') backdrop: boolean = true;
    @Input('can-close') canClose: boolean = true;
    @Output('on-close') onClose = new EventEmitter<any>();

    private onKeyDown($event: KeyboardEvent) {
        if ($event.key === "Escape" && this.canClose) {
            this.close()
        }
    }

    public close() {
        this.onClose.emit();
    }
}