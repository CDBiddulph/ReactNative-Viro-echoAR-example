/**
 * Copyright (c) 2015-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

import React, { Component } from 'react';
import { Text } from 'react-native';

import {
  AppRegistry,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator,
} from 'react-viro';

var createReactClass = require('create-react-class');

/*
 * TODO: Add your API key below!!
 */
var API_KEY = "<YOUR-API-KEY-HERE>";

var viroApiKey = "5ECFE036-0FFF-47A8-9895-0EB230B58245";

var arScenes = {
  'ARSimpleSample': require('./js/HelloWorldSceneAR.js'),
  'CatchEm': require('./js/CatchEmSceneAR.js'),
};

var creatureNames = [
    'Dragon',
    'Monkey',
    'Tiger',
    'Fox',
    'Elephant',
    "Rabbit",
    "Panda",
];

var creatures = []

var ViroCodeSamplesSceneNavigator = createReactClass({
  getInitialState() {
    return {
      modelsAreLoaded : false,
    };
  },

  getInitialState() {
    return {
      hasCreatureInitialized : false
    };
  },

  render: function() {
//    fetch('https://console.echoar.xyz/query?key=' + API_KEY)
//    .then((response) => response.json())
//    .then((json) => {
//      // Set database
//      global.echoDB = json;
//    })
//    .catch((error) => {
//      console.error(error);
//    });

    global.apiKey = API_KEY;
    // Query echoAR for each creature
    global.creatures = {"test" : "test"};
    console.log("C: " + global.creatures);
    for (const name of creatureNames) {
//        console.log("thing: " + name);
        fetch('https://console.echoar.xyz/query?key=' + API_KEY + "&data=name&value=" + name)
        .then((response) => response.json())
        .then((json) => {
          // Set database
//          console.log("thing2: " + name);
          var entry;
          for (let e of Object.values(json.db)) {
            entry = e;
          }
          global.creatures[name] = entry;
          if (name == "Fox") {
            console.log("Loaded the fox");
//            arScenes["CatchEm"].updateCreatures(creatures);
          }
//          console.log("thing3: " + Object.keys(entry));
        })
        .catch((error) => {
          console.error(error);
        });
//        console.log("thing4: " + name);
    }

    // Initiate AR scene
      return (
        <ViroARSceneNavigator
          initialScene={{
            scene: arScenes['CatchEm'],
            params: creatures,
          }}
          apiKey={viroApiKey} />
      );
  }
});

// Uncomment the below line to use the ARDrivingCar Demo. Don't forget to set the apiKey variable in ARDrivingCar.js
// ViroCodeSamplesSceneNavigator = require('./js/ARDrivingCarDemo/ARDrivingCar');

module.exports = ViroCodeSamplesSceneNavigator;
