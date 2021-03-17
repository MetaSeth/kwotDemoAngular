import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PriceService {
  btcPrice: Observable<Array<number>> = new Observable();
  constructor(private http: HttpClient) {
  }

  getBtcPrice(): Observable<Array<string>> {
    console.log('asking btc price');
    return this.http.get<Array<string>>(`https://kwotdemonode.herokuapp.com/btc`);
  }

}
