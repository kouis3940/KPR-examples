/*
  Copyright 2011-2016 Marvell Semiconductor, Inc.
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
import Pins from 'pins';var main = {	onLaunch(){		Pins.configure({			Servo: {				require: "Servo",				pins: { 
					servo: { pin: 9 },
					ground: { pin: 1, type: "Ground"},					power: { pin: 2, type: "Power" }
				}			}		}, success => {			if (success) {
				var state  = 0;				setInterval(function(){					if ( state === 0 ) Pins.invoke('/Servo/write', { dutyCycle: 5, period: 20 }); 					if ( state === 1 ) Pins.invoke('/Servo/write', { dutyCycle: 0, period: 20 }); 					if ( state === 2 ) Pins.invoke('/Servo/write', { dutyCycle: 1, period: 20 }); 					if ( state === 3 ){						Pins.invoke('/Servo/write', { dutyCycle: 0, period: 20}); 						state = -1;					} 					state += 1;				}, 1000);
			} else {
				trace("Failed to configure pins.\n");			}		});	},};export default main;	