// Generated by CoffeeScript 1.6.1
(function() {
  var _this = this;

  window.ClientServerDataChannel = (function() {

    function ClientServerDataChannel(onConnectionCallback, onMessageCallback, onReady) {
      var _this = this;
      this.onConnectionCallback = onConnectionCallback;
      this.onMessageCallback = onMessageCallback;
      this.onReady = onReady;
      this.onData = function(connection, data) {
        return ClientServerDataChannel.prototype.onData.apply(_this, arguments);
      };
      this.onConnection = function(connection) {
        return ClientServerDataChannel.prototype.onConnection.apply(_this, arguments);
      };
      this.onOpen = function(id) {
        return ClientServerDataChannel.prototype.onOpen.apply(_this, arguments);
      };
      if (isDevelopmentServer()) {
        this.peer = new Peer({
          host: location.hostname,
          port: 9000,
          config: {
            'iceServers': []
          }
        });
      } else {
        this.peer = new Peer({
          key: "rrvwvw4tuyxpqfr",
          config: {
            "iceServers": []
          }
        });
      }
      this.peer.on("open", this.onOpen);
      this.peer.on("connection", this.onConnection);
    }

    ClientServerDataChannel.prototype.onOpen = function(id) {
      this.id = id;
      return this.onReady();
    };

    ClientServerDataChannel.prototype.onConnection = function(connection) {
      var _this = this;
      connection.on("open", function() {
        return _this.onConnectionCallback(connection);
      });
      return connection.on("data", function(data) {
        return _this.onData(connection, data);
      });
    };

    ClientServerDataChannel.prototype.onData = function(connection, data) {
      return this.onMessageCallback(connection, data);
    };

    return ClientServerDataChannel;

  })();

}).call(this);
