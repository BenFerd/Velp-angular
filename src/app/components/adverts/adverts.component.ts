import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Advert } from "src/app/models/Advert.model";
import { AdvertsService } from 'src/app/services/adverts.service';
import { Observable } from 'rxjs';

@Component({
  selector: "app-adverts",
  templateUrl: "./adverts.component.html",
  styleUrls: ["./adverts.component.scss"],
})
export class AdvertsComponent implements OnInit {
  
  adverts: Observable<any>;

  constructor(private route: ActivatedRoute, private service: AdvertsService) {}

  ngOnInit(): void {
    this.adverts = this.service.findAll();
  }
}
