/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var example = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    bindEvents(){
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        console.log('we are ready to launch');
        console.log(navigator.vibrate);
        this.receivedEvent('deviceready');
        navigator.vibrate(10);

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        };


        // I am just resetting namespace to be able to call function from onSuccess
        var applicationScope = this;

        function onSuccess(position) {
        // alert('Latitude: '          + position.coords.latitude          + '\n' +
        //       'Longitude: '         + position.coords.longitude         + '\n' +
        //       'Altitude: '          + position.coords.altitude          + '\n' +
        //       'Accuracy: '          + position.coords.accuracy          + '\n' +
        //       'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        //       'Heading: '           + position.coords.heading           + '\n' +
        //       'Speed: '             + position.coords.speed             + '\n' +
        //       'Timestamp: '         + position.timestamp                + '\n');

              applicationScope.createMap(position);
          };

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    },

    createMap: function(position) {
        console.log('Do i work here', position);
        var Latitude = position.coords.latitude;
        Longitude = position.coords.longitude;
        console.log("lat, lon", Latitude, Longitude);

        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: Latitude, lng: Longitude},
          zoom: 1,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

example.initialize();
