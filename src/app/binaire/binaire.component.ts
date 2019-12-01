import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {toNumber, toUINT, UINT} from '../data/definitions';

@Component({
  selector: 'app-binaire',
  templateUrl: './binaire.component.html',
  styleUrls: ['./binaire.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BinaireComponent implements OnInit {
  @Input() editable = false;
  @Input() dim: number;
  @Input() val: number;
  @Output() valChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  get uint(): UINT {
    return toUINT( this.val, this.dim );
  }

  changeIndex(u: UINT, i: number, b: boolean) {
    if (this.editable) {
      u.bits[i] = b;
      this.valChange.emit(toNumber(u));
    }
  }
}
