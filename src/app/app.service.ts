import { Injectable } from '@angular/core';
import {filter, map, Subject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  moveTask = new Subject<any>();

  constructor() { }

  // this will work as reducer of redux
  getTaskStatus(type: TaskMove, callBackFn: any): Subscription {
    return this.moveTask.pipe(
      filter((e: TaskEvent) => e.type === type),
      map((e: TaskEvent) => e.payload)
    ).subscribe(callBackFn);
  }

  // this will work as action of redux
  dispatch(event: TaskEvent) {
    this.moveTask.next(event);
  }
}

// this will work as action type of redux
export enum TaskMove {
  ADD_TO_PENDING,
  MOVE_TO_COMPLETED,
  MOVE_TO_CLEARED_FROM_PENDING,
  MOVE_TO_CLEARED_FROM_COMPLETED,
  REMOVE_ITEM
}

export type TaskEvent = {
  type: TaskMove,
  payload?: string
}
