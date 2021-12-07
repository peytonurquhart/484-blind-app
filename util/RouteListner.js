import { sleep } from './sleep.js';

export const NO_EVENT = 0;
export const EVENT_ACTIVE = 1;

export class RouteListner {
    constructor(updateInterval = 500){
        this.subscriber = null;
        this.subID = "";
        this.shouldLoop = false;
        this.updateInterval = updateInterval;
        this.instructions = [];
        this.index = 0;
        this.t = 0;
    }
    pollAlert = async () => {
        while(this.shouldLoop && this.instructions[this.index]) {
            await sleep(this.updateInterval);
            this.t += this.updateInterval;
            if(this.t >= this._getIntructionAwaitMS(this.index - 1)) {
                try { this.onUpdateEvent(this._getInstruction(this.index)) } catch { break; }
                this.t = 0;
                this.index += 1;
            }
            await new Promise(resolve => setImmediate(resolve));
        }
        console.log(this.subID + ": RouteListner: unsubscribe() / (route finished) success");
    }
    unsubscribe = async () => {
        this.index = 0;
        this.subscriber = null;
        this.subID = "";
        this.t = 0;
        this.instructions = [];
        this.shouldLoop = false;
        return new Promise(resolve => setTimeout(resolve, this.updateInterval));
    }
    subscribe = async (f, id="", instructions) => {
        await this.unsubscribe();
        for(let i in instructions) {
            this.instructions.push(instructions[i]);
        }
        this.subID = id;
        this.subscriber = f;
        this.shouldLoop = true;
        console.log(this.subID + ": RouteListner: subscribe() success");
        this.pollAlert();
    }
    onUpdateEvent(data) {
        this._notifySubscriber({type: EVENT_ACTIVE, data: data});
    }
    _notifySubscriber(o) {
        if(this.subscriber) { this.subscriber(o); }
    }
    _getIntructionAwaitMS(idx) {
        if(!this.instructions[idx]) { return 0; }
        return this.instructions[idx].await*1000;
    }
    _getInstruction(idx) {
        if(!this.instructions[idx]) { throw new Error("_getInstruction()") }
        return this.instructions[idx];
    }
}