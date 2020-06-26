import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
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
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
    });
  }

  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("password");
  }
  get firstName() {
    return this.form.get("firstName");
  }
  get lastName() {
    return this.form.get("lastName");
  }
  get city() {
    return this.form.get("city");
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
