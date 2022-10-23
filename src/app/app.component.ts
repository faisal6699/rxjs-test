import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService, TaskMove} from "./app.service";
import {Subscriber} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'rxjs-subject-implementation-like-redux';
  tasks: string = '';
  subscribers: any = {};

  pendingTasks: string[] = [];
  completedTasks: string[] = [];
  clearedTasks: string[] = [];
  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.subscribers.addToPending = this.appService.getTaskStatus(TaskMove.ADD_TO_PENDING, (payload: string) => {
      this.pendingTasks.push(payload);
    })

    this.subscribers.moveToCompleted = this.appService.getTaskStatus(TaskMove.MOVE_TO_COMPLETED, (payload: string) => {
      this.pendingTasks = this.pendingTasks.filter(p => p !== payload);
      this.completedTasks.push(payload);
    })

    this.subscribers.moveToClearedFromPending = this.appService.getTaskStatus(TaskMove.MOVE_TO_CLEARED_FROM_PENDING, (payload: string) => {
      this.pendingTasks = this.pendingTasks.filter(p => p !== payload);
      this.clearedTasks.push(payload);
    })

    this.subscribers.moveToClearedFromCompleted = this.appService.getTaskStatus(TaskMove.MOVE_TO_CLEARED_FROM_COMPLETED, (payload: string) => {
      this.completedTasks = this.completedTasks.filter(p => p !== payload);
      this.clearedTasks.push(payload);
    })

    this.subscribers.remove = this.appService.getTaskStatus(TaskMove.REMOVE_ITEM, (payload: string) => {
      this.clearedTasks = this.clearedTasks.filter(p => p !== payload);
    })
  }

  // Unsubscribe from all subscribers on component destroy
  ngOnDestroy() {
    for (let subscriberKey in this.subscribers) {
      let subscriber = this.subscribers[subscriberKey];
      if (subscriber instanceof Subscriber) {
        subscriber.unsubscribe();
      }
    }
  }

  addToPending() {
    if(!this.tasks) return;
    this.appService.dispatch({type: TaskMove.ADD_TO_PENDING, payload: this.tasks});
    this.tasks = '';
  }
}
