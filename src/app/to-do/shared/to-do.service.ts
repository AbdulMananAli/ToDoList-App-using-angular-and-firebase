import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  ToDoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) {}

  getToDoList() {
    this.ToDoList = this.firebasedb.list('titles');
    return this.ToDoList;
  }

  addTitle(title: string) {
    this.ToDoList.push({
      title: title,
      isChecked: false
    });
  }

  checkUncheckTitle($key: string, flag: boolean) {
    this.ToDoList.update($key, { isChecked: flag });
  }

  removeTitle($key: string) {
    this.ToDoList.remove($key);
  }
}
