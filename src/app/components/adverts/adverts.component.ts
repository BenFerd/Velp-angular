import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adverts',
  templateUrl: './adverts.component.html',
  styleUrls: ['./adverts.component.scss']
})
export class AdvertsComponent implements OnInit {

  adverts: Observable<any>;
  environement: any = environment;

  private advertListUrl = `${environment.apiUrl}/api/adverts`;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.adverts = this.httpClient.get(this.advertListUrl)
  }

}
