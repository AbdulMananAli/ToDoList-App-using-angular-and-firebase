import { Component, OnInit } from '@angular/core';
import { ToDoService } from './shared/to-do.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
  providers: [ToDoService]
})
export class ToDoComponent implements OnInit {
  toDolistArray: any[];
  constructor(private toDoService: ToDoService) { }

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges()
    .subscribe(item => {
      this.toDolistArray = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        this.toDolistArray.push(x);
      });
      this.toDolistArray.sort((a, b) => {
        return a.isChecked - b.isChecked;
      });
    });
  }

  OnAdd(itemTitle) {
    this.toDoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }
  alterCheck($key: string, isChecked) {
    this.toDoService.checkUncheckTitle($key, !isChecked);
  }
  onDelete($key: string) {
    this.toDoService.removeTitle($key);
  }

}
