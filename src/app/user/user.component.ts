import { Component, OnInit } from "@angular/core";
import { TestService } from "../services/test.service";
import { User } from "../models/user";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  users: User[];
  users2: User[];

  constructor(private service: TestService) {}

  ngOnInit(): void {
    this.service.test1().subscribe(
      data => {
        console.log("this.service.users$ subscribe");

        this.users2 = data;
      },
      error => console.error(error)
    );

    this.service.users$.subscribe(
      data => {
        console.log("this.service.users$ subscribe");

        this.users = data;
      },
      error => console.error(error)
    );
  }

  addItem(): void {
    this.service.add();
  }

  loadAll(): void {
    this.service.loadAll();
  }
}
