import { Component, OnInit, OnDestroy } from "@angular/core";
import { TestService } from "../services/test.service";
import { User } from "../models/user";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit, OnDestroy {
  users: User[];
  users2: User[];

  subscription: Subscription = new Subscription();

  constructor(private service: TestService) {}

  ngOnInit(): void {
    this.subscribeToUsers();
  }

  subscribeToUsers() {
    const usersSubscription = this.service.users$.subscribe(
      data => {
        console.log("this.service.users$ subscribe");
        this.users = data;
      },
      error => console.error(error)
    );

    this.subscription.add(usersSubscription);
  }

  addItem(): void {
    this.service.add();
  }

  loadAll(): void {
    this.service.loadAll();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
