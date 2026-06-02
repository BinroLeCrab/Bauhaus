uniform sampler2D uTextureBass;
uniform sampler2D uTextureHigh;
uniform float uAudioFrequency;
varying vec2 vUv;


void main()
{

    vec4 mask;
    float revertFrequency = 1.0 - uAudioFrequency; // Inverse de la fréquence pour que les basses soient à gauche et les aigus à droite
    if (vUv.x < revertFrequency) {
        mask = vec4(0.0, 0.0, 0.0, 1.0); // Noir
    } else {
        mask = vec4(1.0, 1.0, 1.0, 1.0); // Blanc
    }

    if (mask.r == 0.0) {
        gl_FragColor = texture2D(uTextureBass, vUv);
    } else {
        gl_FragColor = texture2D(uTextureHigh, vUv);
    }
    // vUv = uv;
}