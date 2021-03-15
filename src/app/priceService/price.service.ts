import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  btcPrice: Observable<Array<number>> = new Observable();
  constructor(private http: HttpClient) {
  }

  getBtcPrice(): Observable<Array<string>> {
    console.log('asking btc price');
    return this.http.get<Array<string>>(`http://localhost:${process.env.PORT || 3000}/btc`);
  }


}
