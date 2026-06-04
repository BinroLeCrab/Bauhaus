import Analyzer from "../sounds/Analyzer";
import { params } from "./constant/params";

class AudioAnalyzer {
	constructor() {}

	init() {
		this.useAudio = true;
		this.useFrequencyBalance = true;
		this.audio = new Analyzer();
		this.volume = params.audio.frequency;

		this.frequencyData = [];
		this.frequencyBalance = params.audio.frequency;

		this.balanceMode = "bass"; // "bass", "high", or "balanced"
		this.balancePass = {
			bass: {
				min: 0,
				max: 0.2,
			},
			high: {
				min: 0.9,
				max: 1,
			},
			range: 0.5
		};

		this.balanceThreshold = 0.4; // Threshold to determine if high frequencies are stronger than bass

		this.kick = 0;
		this.kickHard = 0;
		this.kickThreshold = 0.7;
		this.kickHardThreshold = 0.9;

		this.audio.onAudio((a) => {
			this.volume = a.volumeSmooth;
			this.frequencyData = a.volumeByFrequency;
			this.kick = a.kick;
			this.kickHard = a.kickHard;
		});
	}

	getKickHard() {
		return this.kickHard > this.kickHardThreshold;
	}

	getKick() {
		return this.kick > this.kickThreshold;
	}

	getFrequency(i = -1) {
		if (i >= 0 && i < this.frequencyData.length) {
			return this.frequencyData[i];
		} else {
			return this.frequencyData;
		}
	}

	getFrequencyBalance(type = "bass") {
		if (this.frequencyData && this.useFrequencyBalance) {
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

			// console.log("bassAverage", bassAverage, "highAverage", highAverage);

			const balance = highAverage / bassAverage;

			if (type === "bass") {
				const finalNumber = balance * this.balancePass.range;
				this.frequencyBalance = finalNumber;
			} else if (type === "high") {
				const finalNumber = this.balancePass.high.max - balance * this.balancePass.range;
				this.frequencyBalance = finalNumber;
			}

			return this.frequencyBalance;
		} else {
			return params.audio.frequency;
		}
	}

	getFrequencyBalanceOLD() {
		if (this.frequencyData && this.useFrequencyBalance) {
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

			// console.log("bassAverage", bassAverage, "highAverage", highAverage);

			const balance = highAverage / bassAverage;

			// console.log("Balance:", balance.toFixed(2));

			if (balance > this.balanceThreshold) {
				// console.log("--- High is stronger than Bass");
				this.balanceMode = "high";

				const finalNumber =
					this.balancePass.high.min +
					((balance - this.balanceThreshold) /
						(1 - this.balanceThreshold)) *
						(this.balancePass.high.max - this.balancePass.high.min);

				if (finalNumber < this.balancePass.high.min) {
					console.log("Final Number:", finalNumber.toFixed(2));
				}

				this.frequencyBalance = finalNumber + 0.25;
			}
			if (balance == this.balanceThreshold) {
				// console.log("Bass and High are balanced");
				this.balanceMode = "balanced";
				// this.frequencyBalance = balance;
			} else {
				// console.log("--- Bass is stronger than High");
				this.balanceMode = "bass";
				const finalNumber =
					(balance / this.balanceThreshold) *
					this.balancePass.bass.max;
				this.frequencyBalance = finalNumber;
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
