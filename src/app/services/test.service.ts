import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { tap, map, catchError, shareReplay, share } from "rxjs/operators";

const usersUrl = "https://angular-material-api.azurewebsites.net/users";

@Injectable({
  providedIn: "root"
})
export class TestService {
  constructor(private httpClient: HttpClient) {}

  private cache = new BehaviorSubject<User[]>([]);
  private cache2: Observable<User[]>;

  get users$(): Observable<User[]> {
    if (this.cache.getValue().length === 0) {
      return this.loadAll();
    }
    console.log("users$ getter");
    return this.cache.asObservable();
  }

  loadAll(): Observable<User[]> {
    const usersUrl = "https://angular-material-api.azurewebsites.net/users";

    return this.httpClient.get<User[]>(usersUrl).pipe(
      tap(data => {
        let user = new User();
        user.name = "Daniel Voicu";

        data.push(user);

        this.cache.next(data);
      })
    );
  }

  test1(): Observable<User[]> {
    if (!this.cache2) {
      this.cache2 = new Observable<User[]>(observer => {
        this.httpClient.get<User[]>(usersUrl).subscribe(
          value => {
            observer.next(value);
          },
          () => {
            observer.error("Error loading @self user");
          },
          () => {
            observer.complete();
          }
        );
      }).pipe(shareReplay(1));
    }

    return this.cache2;
  }

  add(): void {
    let user = new User();
    user.name = `Test ${Date.now()}`;

    this.addToCache(user);
    this.addToCache2(user);
  }

  addToCache(user: User): void {
    let users = this.cache.getValue();
    users.push(user);

    this.cache.next(users);
  }

  addToCache2(user: User): void {
    this.cache2.pipe(
      map(users => users.push(user)),
      shareReplay()
    );
  }
}
