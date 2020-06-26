import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Advert } from 'src/app/models/Advert.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss']
})
export class AdvertComponent implements OnInit {


  private URL = `${environment.advertApi}/`;

  advert: Advert;
  advertId: string;
  

  constructor(private httpClient:HttpClient, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.advertId = this.route.snapshot.paramMap.get("advertId");
    this.httpClient.get<Advert>(this.URL + ""+ this.advertId).subscribe(data => this.advert = data);

  }

}
