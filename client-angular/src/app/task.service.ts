import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'; 

@Injectable()
export class TaskService {

  domain:string;

  constructor(private http:Http) {
    console.log('Task service initialized');
    this.domain = "http://localhost:3000/api/tasks";
  }

  getTasks() {
    return this.http.get(this.domain)
      .map( res => res.json());
  }

  addTask(newTask) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http.post(
      this.domain,
      JSON.stringify(newTask),
      {headers: headers}
    )
    .map(res => res.json());

  }

  deleteTask(id) {
    return this.http.delete(this.domain + '/' + id)
      .map( res => res.json());
  }

  updateStatus(task) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http.put(
      this.domain + '/' + task._id,
      JSON.stringify(task),
      {headers: headers}
    )
    .map(res => res.json());
  }
}
