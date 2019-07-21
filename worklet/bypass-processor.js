/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A simple bypass node demo.
 *
 * @class BypassProcessor
 * @extends AudioWorkletProcessor
 */

class BypassProcessor extends AudioWorkletProcessor {

    constructor() {
        super();
        this.isPlaying = true;
        this.isMuted = true;
        this.port.onmessage = this.onmessage.bind(this)
    }

    onmessage(event) {
        const { data } = event;
        this.isPlaying = data;
    }

    process(inputs, outputs) {
        if (!this.isPlaying) {
            return;
        }

        // If you wish to return output, execute the following
        // commented code on receipt of a toggleMute message
        if (!this.isMuted) {
            const input = inputs[0];
            const output = outputs[0];
            for (let channel = 0; channel < output.length; ++channel) {
                output[channel].set(input[channel]);
            }
        }


        return this.isPlaying;
    }
}

registerProcessor('bypass-processor', BypassProcessor);