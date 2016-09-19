import {Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, URLSearchParams, RequestOptions, Response} from "@angular/http";
@Component({
  moduleId: module.id,
  selector: 'clock-header',
  templateUrl: 'clock-header.component.html',
  styleUrls: ['./clock-header.scss']
})
export class ClockHeaderComponent implements OnInit {
  private appId = "554c20d9b7b3b741c265233e437e38aa";
  private weatherUrl = "http://api.openweathermap.org/data/2.5/weather";

  $currentTime:Observable<Date>;
  $currentTemperature:Observable<number>;

  @Input('location') location:string;
  @Input('room') room:string;

  currentTime = new Date();
  constructor(private $http:Http) {
    this.$currentTime = this.createClock();
  }

  ngOnInit() {
    this.$currentTemperature = this.getTemperatureStreamForLocation();
  }

  createClock() : Observable<Date>{
    return Observable
      .interval(500)
      .timestamp()
      .map((time) => new Date(time.timestamp));
  }

  getTemperatureStreamForLocation() {
    let tenMinutes = (10 * 60 * 1000);

    //Get weather update every 10 minutes
    return Observable.of([])
      .merge(Observable.interval(tenMinutes))
      .flatMap((trigger) => this.$http.get(this.weatherUrl, this.getWeatherRequestOptions()))
      .map((data:Response) => data.json())
      .map((data:any) => <number> Math.round(data.main.temp));
  }

  private getWeatherRequestOptions():RequestOptions {
    let params = new URLSearchParams();
    params.append('q', this.location);
    params.append('units', 'metric');
    params.append('appId', this.appId);
    return new RequestOptions({search: params});
  }

}
