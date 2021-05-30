class Spinner {

    constructor(){
        this.listeners = new Map();
        this.SPINNER = {
            LOADING_START           : "LOADING STARTED",         // for starting loading
            LOADING_STOP            : "LOADING STOPPED",         // for stoping loading
        };
    }
    
    registerEvent(eventName, callback) {
        if(!this.listeners.has(eventName)) {
            this.listeners.set(eventName, []);
        }
        this.listeners.get(eventName).push(callback);
    }

    unregisterEvent(eventName, signature) {
        if(!this.listeners.has(eventName)) return;
        var registeredEvents = this.listeners.get(eventName);
        for(var i = 0 ; i < registeredEvents.length; i++) {
            if(registeredEvents[i] == signature) {
                registeredEvents.splice(i, 1);
                this.listeners.set(eventName, registeredEvents);
            }
        } 
    }

    fireEvent(eventName, data) {
        if(!this.listeners.has(eventName)) return;
        this.listeners.get(eventName).forEach(callback => {
            callback(data);
        });
    }

    fireEventDelay(eventName, data, delay) {
        if(!this.listeners.has(eventName)) return;
        var events = this.listeners.get(eventName);
        var i = 0;
        var t = setInterval(() => {
            events[i](data);
            i++;
            if(i == events.length) clearInterval(t);  
        }, delay)
    }

    unregisterAllEvent( eventName ) {
        if(this.listeners.has(eventName)) this.listeners.set(eventName, []);
    } 
}

export default new Spinner();