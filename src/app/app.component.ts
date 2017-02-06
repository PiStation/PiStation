import { Component } from '@angular/core';
import {MqttService} from "./mqtt.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  led1State: Observable<any>;
  buttonStateBg: Observable<string>;
  constructor(private mqtt : MqttService){
    console.log('app', mqtt);
    this.led1State = mqtt.topic('lights/led1');
    this.buttonStateBg = this.led1State.map((event) => {
      if(!event.state){
        return;
      }
      if(event.state == 1){
         return 'red';
      } else {
        return 'none';
      }
    });
    this.led1State.subscribe(
      (event) => console.log('Light event', event),
      (error) => console.log('Error light event', error),
      ()=> console.log('Stream completed'));
  }
  title = 'app works!';

  toggleLight(){
    console.log('testsafsdfa');
    this.mqtt.publish('lights/led1', {toggle: true})
  }
}
