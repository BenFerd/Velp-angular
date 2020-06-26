import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { AdvertsService } from "src/app/services/adverts.service";
import { HttpErrorResponse } from "@angular/common/http";


@Component({
  selector: "app-advert-form",
  templateUrl: "./advert-form.component.html",
  styleUrls: ["./advert-form.component.scss"],
})
export class AdvertFormComponent implements OnInit {
  form: FormGroup;

  constructor(private advert: AdvertsService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),
    });
  }

  get title() {
    return this.form.get("title");
  }
  get description() {
    return this.form.get("description");
  }
  get category() {
    return this.form.get("category");
  }


  handleSubmit() {
    this.advert.create(this.form.value).subscribe(
      () => {
        this.router.navigateByUrl("adverts");
        console.log(this.form.value);
      }
    );
  }
}
export interface Violation {
  propertyPath: string;
  message: string;
}
