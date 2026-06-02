uniform sampler2D uTextureBass;
uniform sampler2D uTextureHigh;
uniform float uAudioFrequency;
varying vec2 vUv;


void main()
{

    vec4 mask;
    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
    vec4 white = vec4(1.0, 1.0, 1.0, 1.0);
    float revertFrequency = 1.0 - uAudioFrequency; // Inverse de la fréquence pour que les basses soient à gauche et les aigus à droite
    if (vUv.x < revertFrequency) {
        mask = black; // Noir
    } else {
        mask = white; // Blanc
    }

    if (mask == black) {
        gl_FragColor = texture2D(uTextureBass, vUv);
    } else {
        gl_FragColor = texture2D(uTextureHigh, vUv);
    }
    // vUv = uv;
}