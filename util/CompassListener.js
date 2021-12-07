export const NO_EVENT = 0;
export const HEADING_CHANGE_ACTIVE = 1;
export const ANGLE_CHANGE_ACTIVE = 2;
export class CompassListener {
    constructor(){
        this.subscriber = null;
        this.lastHeading = null;
        this.lastAngle = -1;
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
        this.onHeadingEvent(deg);
        this.onAngleEvent(deg);
    }
    onHeadingEvent(data) {
        let heading = this._getHeading(data);
        if(heading != this.lastHeading) {
            this.lastHeading = heading;
            this._notifySubscriber({type: HEADING_CHANGE_ACTIVE, heading: heading});
        }
    }
    onAngleEvent(data) {
        let angle = Math.trunc(data);
        if(angle != this.lastAngle) {
            this.lastAngle = angle;
            this._notifySubscriber({type: ANGLE_CHANGE_ACTIVE, angle: angle})
        }
    }
    _notifySubscriber(o) {
        if(this.subscriber) { this.subscriber(o); }
    }
    _getHeading(angle) {
        if(angle > 337.5 || angle < 22.5) { return "North"; }
        if(angle > 292.5 && angle < 337.25) { return "North West"; }
        if(angle > 247.5 && angle < 292.5) { return "West"; }
        if(angle > 202.5 && angle < 247.5) { return "South West"; }
        if(angle > 157.5 && angle < 202.5) { return "South"; }
        if(angle > 112.5 && angle < 157.5) { return "South East"; }
        if(angle > 67.5 && angle < 112.5) { return "East"; }
        if(angle > 0 && angle < 67.5) { return "North East"; }
        return "...";
    }
}