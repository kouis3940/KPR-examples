/*
  Copyright 2011-2015 Marvell Semiconductor, Inc.
  
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  
      http://www.apache.org/licenses/LICENSE-2.0
      
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
let Pins = require("pins");

/* TEMPLATES */

let MainScreen = Container.template($ => ({
	left:0, right:0, top:0, bottom:0, skin:new Skin({ fill:'white' }),
	contents:[
		Label($, {
			left:0, right:0, string:'- - -',
			style: new Style({ font:'bold 46px', color:'black' }),
			Behavior: class extends Behavior {
				onAnalogValueChanged(label, value) {
                    label.string = value.toFixed(6);
				}
				onDisplayed(label) {
					Pins.configure({
						analogSensor: {pin: 52, type: "Analog"},
					}, success => this.onPinsConfigured(label, success));
				}
				onPinsConfigured(label, success) {		
					if (success) {
						Pins.repeat("/analogSensor/read", 20, value => this.onAnalogValueChanged(label, value));

						Pins.share("ws", {zeroconf: true, name: "analog-starter"});
					}
					else
						trace("failed to configure pins\n");
				}
			}
		})
	]
}));

/* APPLICATION */

application.add(new MainScreen);
