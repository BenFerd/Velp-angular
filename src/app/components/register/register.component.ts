import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  error = false;
  form: FormGroup
  

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(""),
      password: new FormControl(""),
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      city: new FormControl(""),
    });
  }

  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("email");
  }
  get firstName() {
    return this.form.get("email");
  }
  get lastName() {
    return this.form.get("email");
  }
  get city() {
    return this.form.get("email");
  }

  handleSubmit() {
    this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigateByUrl("login");
      },
      (httpError: HttpErrorResponse) => {
        if (httpError.status === 400) {
          const violations = httpError.error.violations as Violation[];

          for (let apiViolation of violations) {
            this.form
              .get(apiViolation.propertyPath)
              .setErrors({ Violation: apiViolation.message });
          }
        }
      }
    );
  }
}

export interface Violation {
  propertyPath: string;
  message: string;
}
