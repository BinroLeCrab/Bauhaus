import * as THREE from "three";
import audioAnalyzer from "../AudioAnalyzer";
import { params } from "../constant/params";

class BandManager {
	constructor() {
		this.bands = [];
		this.setupBands();
		this.volumeThreshold = 0.5; // Seuil de volume pour déclencher l'affichage d'une bande
        this.drawingWidth =  1;
		this.drawingHeight = 1;
        this.maxWidth = 0.1;
        this.minWidth = 0.02;
        this.geometry = new THREE.PlaneGeometry(1, 1);
        this.bassSubscriber = null;
        this.highSubscriber = null;
	}

    registerSubscriber(subscriber, type) {
        if (type === 'bass') {
            this.bassSubscriber = subscriber;
        } else if (type === 'high') {
            this.highSubscriber = subscriber;
        }
    }

	setupBands() {
		const bandCount = params.sceneBass.secondaryColor.length;
		for (let i = 0; i < bandCount; i++) {

			const bassMaterial = new THREE.MeshBasicMaterial({
				color: params.sceneBass.secondaryColor[i],
                transparent: true,
                opacity: 1,
			});
            const highMaterial = new THREE.MeshBasicMaterial({
                color: params.sceneHigh.secondaryColor[i],
                transparent: true,
                opacity: 1,
            });

			this.bands.push({
				freq: (200 / bandCount) * i,
				materials: [
					bassMaterial,
					highMaterial,
				],
				showed: false,
				id: i,
			});
		}
		// console.log(this.bands);
	}

    addBand(band) {
        if (band.bassMesh && this.bassSubscriber) {
            this.bassSubscriber.addBand(band.bassMesh);
        }
        if (band.highMesh && this.highSubscriber) {
            this.highSubscriber.addBand(band.highMesh);
        }
    }

    removeBand(band) {
        if (band.bassMesh && this.bassSubscriber) {
            this.bassSubscriber.remove(band.bassMesh);
        }
        if (band.highMesh && this.highSubscriber) {
            this.highSubscriber.remove(band.highMesh);
        }
    }

	checkBand(band) {
		const freqVolume = audioAnalyzer.getFrequency(band.freq);
		if (freqVolume >= this.volumeThreshold) {
			if (!band.showed) {
                const bassMesh = new THREE.Mesh(this.geometry, band.materials[0]);
                const highMesh = new THREE.Mesh(this.geometry, band.materials[1]);
                bassMesh.scale.set(this.drawingWidth * (Math.random() * (this.maxWidth - this.minWidth) + this.minWidth), this.drawingHeight, 1);
                highMesh.scale.set(this.drawingWidth, this.drawingHeight * (Math.random() * (this.maxWidth - this.minWidth) + this.minWidth), 1);
                bassMesh.position.z = (band.id + 1) * 0.1;
                highMesh.position.z = (band.id + 1) * 0.1;
                band.bassMesh = bassMesh;
                band.highMesh = highMesh;

                this.addBand(band);
                
				band.showed = true;
                // console.log(`Band ${band.id} showed with ${bassMesh}`);
				// console.log(`Band ${band.id} showed with volume ${freqVolume}`);
			} else {
				// console.log(`Band ${band.id} already showed with volume ${freqVolume}`);
                if (band.bassMesh) {
                    band.bassMesh.material.opacity = freqVolume;
                }
                if (band.highMesh) {
                    band.highMesh.material.opacity = freqVolume;
                }
			}
		} else {
            if (band.showed) {

                this.removeBand(band);

                if (band.bassMesh) {
                    band.bassMesh = null;
                }
                if (band.highMesh) {
                    band.highMesh = null;
                }
                // console.log(`Band ${band.id} hidden with volume ${freqVolume}`);
            }
			band.showed = false;
		}
	}

    tick() {
        this.bands.forEach((band) => {
            this.checkBand(band);
        });
    }
}

const bandManager = new BandManager();
export default bandManager;
