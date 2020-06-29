import { Component, OnInit } from "@angular/core";
import { ForumService } from "src/app/services/forum.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-forum",
  templateUrl: "./forum.component.html",
  styleUrls: ["./forum.component.scss"],
})
export class ForumComponent implements OnInit {
  topics: Observable<any>;

  constructor(private service: ForumService) {}

  ngOnInit(): void {
    this.topics = this.service.getAllTopics();
  }
}
