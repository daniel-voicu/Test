import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { filter, distinctUntilChanged } from "rxjs/operators";

const usersUrl = "https://angular-material-api.azurewebsites.net/users";

@Injectable({
  providedIn: "root"
})
export class TestService {
  constructor(private httpClient: HttpClient) {}

  private cache = new BehaviorSubject<User[]>(null);

  get users$(): Observable<User[]> {
    if (!this.cache.getValue()) {
      this.loadAll();
    }
    return this.cache.asObservable().pipe(filter(users => users !== null));
  }

  loadAll() {
    const usersUrl = "https://angular-material-api.azurewebsites.net/users";

    this.httpClient.get<User[]>(usersUrl).subscribe(data => {
      this.cache.next(data);
    });
  }

  add(): void {
    let user = new User();
    user.name = `Test ${Date.now()}`;

    this.addToCache(user);
  }

  addToCache(user: User): void {
    let users = this.cache.getValue();
    users.push(user);

    this.cache.next(users);
  }
}
