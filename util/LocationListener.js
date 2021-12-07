import { sleep } from './sleep.js';

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
        while(this.shouldLoop) {
            await sleep(this.updateInterval);
            let data = await this.api(this.options)
            this.onUpdateEvent(data);
            await new Promise(resolve => setImmediate(resolve));
        }
        console.log(this.subID + ": LocationListner: unsubscribe() success");
    }
    unsubscribe = async () => {
        this.subscriber = null;
        this.shouldLoop = false;
        return new Promise(resolve => setTimeout(resolve, this.updateInterval));
    }
    subscribe = async (f, id="") => {
        await this.unsubscribe();
        this.subID = id;
        this.subscriber = f;
        this.shouldLoop = true;
        console.log(this.subID + ": LocationListner: subscribe() success");
        this.pollLocation();
    }
    onUpdateEvent(data) {
        this._notifySubscriber({type: EVENT_ACTIVE, data: data});
    }
    _notifySubscriber(o) {
        if(this.subscriber) { this.subscriber(o); }
    }
}