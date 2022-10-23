import {Component, Input, OnInit} from '@angular/core';
import {AppService, TaskMove} from "../app.service";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  @Input() name: string | undefined;
  @Input() value: string | undefined;
  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  moveItemToCompletedFromPending() {
    this.appService.dispatch({type: TaskMove.MOVE_TO_COMPLETED, payload: this.value});
  }
  moveItemToClearedFromPending() {
    this.appService.dispatch({type: TaskMove.MOVE_TO_CLEARED_FROM_PENDING, payload: this.value});
  }
  moveItemToClearedFromCompleted() {
    this.appService.dispatch({type: TaskMove.MOVE_TO_CLEARED_FROM_COMPLETED, payload: this.value});
  }
  removeItem() {
    this.appService.dispatch({type: TaskMove.REMOVE_ITEM, payload: this.value});
  }

}
