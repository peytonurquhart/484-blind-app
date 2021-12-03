/* 
    Listen to device motion and provide events to a subsciber.

    For the sake of time, only supports a single subscriber, and thats all we really need.
*/
export const NO_EVENT = 0;
export const EVENT_ACTIVE = 1;
export class MotionListener {
    constructor(sensitivity = 10, updateIntervalMS = 1000, intervalEventRequirement = 1){
        this.sensitivity = sensitivity;
        this.eventInProgress = false;
        this.subscriber = null;
        this.updateInterval = updateIntervalMS;
        this.numIntervalsDuringEvent = 0;
        this.intervalEventRequirement = intervalEventRequirement;
    }
    unsubscribe = () => {
        this.subscriber = null;
    }
    subscribe = (f) => {
        this.subscriber = f;
    }
    listener = (data) => {
        let { x, y, z } = data.acceleration??{x: 0, y: 0, z: 0};
        const total = Math.sqrt(x * x + y * y + z * z);
        if(total > this.sensitivity) {
            this.numIntervalsDuringEvent += 1;
        } else {
            this.numIntervalsDuringEvent = 0;
        }
        if (this.numIntervalsDuringEvent >= this.intervalEventRequirement && !this.eventInProgress) {
            this.onShakeEvent();
        }
        else if(total < this.sensitivity && this.eventInProgress) {
            this.onEventOver();
        }
    }
    onShakeEvent() {
        this.eventInProgress = true;
        this._notifySubscriber(EVENT_ACTIVE);
    }
    onEventOver() {
        this.numIntervalsDuringEvent = 0;
        this.eventInProgress = false;
        this._notifySubscriber(NO_EVENT);
    }
    _notifySubscriber(type) {
        if(this.subscriber) { this.subscriber(type); }
    }
}