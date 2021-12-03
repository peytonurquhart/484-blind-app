export const NO_EVENT = 0;
export const EVENT_ACTIVE = 1;
export class CompassListener {
    constructor(){
        this.subscriber = null;
        this.lastHeading = null;
        this.headings = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
    }
    unsubscribe = () => {
        this.subscriber = null;
    }
    subscribe = (f) => {
        this.subscriber = f;
    }
    listener = (data) => {
        let { x, y, z } = data??{x: 0, y: 0, z: 0};
        let deg = Math.atan2(y, x)*(180/Math.PI);
        if (deg < 0) { deg = (360-Math.abs(deg)) }
        this.onAngleEvent(deg);
    }
    onAngleEvent(data) {
        let heading = this._getHeading(data);
        if(heading != this.lastHeading) {
            this.lastHeading = heading;
            this._notifySubscriber({type: EVENT_ACTIVE, angle: data, heading: heading});
        }
    }
    _notifySubscriber(o) {
        if(this.subscriber) { this.subscriber(o); }
    }
    _getHeading(angle) {
        return this.headings[Math.round((angle+23)/45)]??"...";
    }
}