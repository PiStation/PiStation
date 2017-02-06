import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import { Client, Packet, connect } from 'mqtt';

export interface MqttMessage {
  topic: string;
  message: any;
}

export enum ServiceState {
  CLOSED,
  TRYING,
  CONNECTED,
  DISCONNECTING
}
@Injectable()
export class MqttService {
  private client : Client;
  private state : BehaviorSubject<ServiceState>;
  private messages : Subject<MqttMessage>;

  private mqttURL: string = 'mqtt://192.168.1.6:8000';

  constructor(){
    this.messages = new Subject<MqttMessage>();
    this.state = new BehaviorSubject<ServiceState>(ServiceState.CLOSED);
    this.start();
  }

  start() {
    this.client = connect(this.mqttURL);
    this.client.addListener('connect', (event)=> this.onConnect(event));
    this.client.on('message', (...args) => this.handleMessage(...args));
    this.client.on('error', (error) => this.onError(error));
    this.client.on('reconnecting', ()=> this.onReconnecting())
  }

  private onConnect(event){
    this.state.next(ServiceState.CONNECTED);
    console.log('client connected', event);
  }

  private handleMessage(...args: any[]){
    let topic = args[0],
        message = args[1],
        packet: Packet = args[2];

    if (message.toString()) {
      this.messages.next(<MqttMessage> {
          topic: topic,
          message: message.toString()
        });
    } else {
      console.warn("Empty message received!");
    }
  }

  private onError(error){
    console.log('client got error', error);
  }

  topic(topicName : string) : Observable<any>{
    this.client
      .subscribe(topicName);

    return this.messages
      .filter((event : MqttMessage) => event.topic == topicName)
      .map((event: MqttMessage) => JSON.parse(event.message));
  }

  publish(topicName: string, data: any) {
    if (data instanceof Object) {
      try {
        data = JSON.stringify(data)
      }
      catch (error) {
        return Error('Not able to send message, data is not serializable;')
      }
    }
    this.client.publish(topicName, data);
  }


  private onDisconnect() {
    console.log('disconnected');
  }

  private onReconnecting() {
    this.state.next(ServiceState.TRYING);
  }
}
