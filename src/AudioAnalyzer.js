import Analyzer from "../sounds/Analyzer";
import { params } from "./constant/params";

class AudioAnalyzer {
	constructor() {
    } 
    
    init() {
		this.useAudio = true;
		this.audio = new Analyzer();
		this.volume = params.audio.frequency;

		this.frequencyData = [];
		this.frequencyBalance = params.audio.frequency;

		this.audio.onAudio((a) => {
			this.volume = a.volumeSmooth;
			this.frequencyData = a.volumeByFrequency;
		});
	}

    getFrequencyBalance() {
		if (this.frequencyData) {
			const bassFrequency = this.frequencyData.slice(
				0,
				params.audio.cutNumber
			);
			const highFrequency = this.frequencyData.slice(
				params.audio.cutNumber
			);

			const bassAverage =
				(bassFrequency.reduce((a, b) => a + b, 0) /
					bassFrequency.length) *
				params.audio.bassBoost;
			const highAverage =
				(highFrequency.reduce((a, b) => a + b, 0) /
					highFrequency.length) *
				params.audio.highBoost;

			if (highAverage > bassAverage) {
				this.frequencyBalance = bassAverage / highAverage;
			} else {
				this.frequencyBalance = highAverage / bassAverage;
			}

			// console.log(
			// 	"Bass Average:",
			// 	bassAverage.toFixed(2),
			// 	"High Average:",
			// 	highAverage.toFixed(2),
			// 	"Frequency Balance:",
			// 	this.frequencyBalance.toFixed(2)
			// );

			// this.shadersMaterial.uniforms.uAudioFrequency.value =
			// 	this.frequencyBalance;

            return this.frequencyBalance;
		} else {
            return params.audio.frequency;
        }
	}
}

const audioAnalyzer = new AudioAnalyzer();
export default audioAnalyzer;