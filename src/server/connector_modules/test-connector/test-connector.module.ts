
import {PiStationServer} from "../../app/server";
import * as PiStation from "../../../client/PiStation";
import {AbstractModule} from "../../../client/PiStation";


export class TestModule extends PiStation.Module implements AbstractModule {
    moduleId:string;
    static DIM_LIGHT_EVENT = new PiStation.ModuleEvent(this, 'dimLight');

    constructor(){
        super('TestModule');

        let dummyFunction = new PiStation.Function('powerControl', [new PiStation.Argument('enabled', 'bool')]);

        this.addFunction(dummyFunction); //register on module


        dummyFunction.callStream.subscribe((arguments : PiStation.Argument) => this.asyncDummyFunction(arguments))

    }

    asyncDummyFunction(arguments){
        console.log(`Called Dummy Function with arguments ${arguments}`);

        const dummyFunctionUpdates = Rx.Observable //dummy update stream from connector
            .interval(500) //500 ms interval events
            .timeInterval() // map naar IntervalData
            .take(3); //pak er 3

        dummyFunctionUpdates.subscribe((update) => {
            console.log(`Dummy send update ${update}`); //output log for testing module
        });

        return dummyFunctionUpdates;
    }
}