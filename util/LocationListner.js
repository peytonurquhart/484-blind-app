import { sleep } from '../util/sleep.js';

/* 
    Unsub may not be working perfectly, ignored for time purpose.
*/

export const NO_EVENT = 0;
export const EVENT_ACTIVE = 1;
export class LocationListener {
    constructor(api, options, updateInterval){
        this.eventInProgress = false;
        this.subscriber = null;
        this.shouldLoop = false;
        this.api = api;
        this.options=options;
        this.updateInterval=updateInterval;
    }
    pollLocation = async () => {
        return this.api(this.options).then(
            (obj) => this.onUpdateEvent(obj), 
            () => {"LocationListner: promise rejected."}
        );
    }
    loopPollLocation = async () => {
        while(this.shouldLoop) {
            await sleep(this.updateInterval);
            let data = await this.api(this.options)
            this.onUpdateEvent(data);
            this.pollLocation();
            await new Promise(resolve => setImmediate(resolve));
            console.log("polled");
        }
        console.log("LocationListner: Done polling.");
    }
    unsubscribe = () => {
        this.subscriber = null;
        this.shouldLoop = false;
    }
    subscribe = (f) => {
        this.subscriber = f;
        this.shouldLoop = true;
        this.loopPollLocation();
    }
    onUpdateEvent(data) {
        this._notifySubscriber({type: EVENT_ACTIVE, data: data});
    }
    _notifySubscriber(o) {
        if(this.subscriber) { this.subscriber(o); }
    }
}