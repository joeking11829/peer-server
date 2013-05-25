// Generated by CoffeeScript 1.6.1
(function() {
  var _this = this;

  window.EventTransmitter = (function() {

    function EventTransmitter() {
      var _this = this;
      this.receiveEvent = function(messageEventData) {
        return EventTransmitter.prototype.receiveEvent.apply(_this, arguments);
      };
      this.sendEvent = function(dataChannel, eventName, data) {
        return EventTransmitter.prototype.sendEvent.apply(_this, arguments);
      };
      this.addEventCallback = function(eventName, callback) {
        return EventTransmitter.prototype.addEventCallback.apply(_this, arguments);
      };
      this.eventCallbacks = {};
    }

    EventTransmitter.prototype.addEventCallback = function(eventName, callback) {
      var eventCallbacks;
      eventCallbacks = this.eventCallbacks[eventName];
      if (!eventCallbacks) {
        eventCallbacks = [];
      }
      eventCallbacks.push(callback);
      return this.eventCallbacks[eventName] = eventCallbacks;
    };

    EventTransmitter.prototype.sendEvent = function(dataChannel, eventName, data) {
      return dataChannel.send(JSON.stringify({
        "eventName": eventName,
        "data": data
      }));
    };

    EventTransmitter.prototype.receiveEvent = function(messageEventData) {
      var eventCallback, eventCallbacks, eventName, messageData, _i, _len, _results;
      messageEventData = JSON.parse(messageEventData);
      eventName = messageEventData.eventName;
      messageData = messageEventData.data;
      console.log("receive event " + eventName, messageData);
      eventCallbacks = this.eventCallbacks[eventName];
      if (eventCallbacks) {
        _results = [];
        for (_i = 0, _len = eventCallbacks.length; _i < _len; _i++) {
          eventCallback = eventCallbacks[_i];
          _results.push(eventCallback(messageData));
        }
        return _results;
      }
    };

    return EventTransmitter;

  })();

}).call(this);
