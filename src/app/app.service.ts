import { Injectable } from '@angular/core';
import {filter, Subject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  moveTask = new Subject<any>();

  constructor() { }

  getTaskStatus(type: any, callBackFn: any): Subscription {
    return this.moveTask.pipe(
      filter((e: any) => e === type),
    ).subscribe(callBackFn);
  }

  dispatch(event: any) {
    this.moveTask.next(event);
  }
}

export enum TaskMove {
  ADD_TO_PENDING,
  MOVE_TO_COMPLETED,
  MOVE_TO_CLEARED,
  REMOVE_ITEM
}
