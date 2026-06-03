uniform sampler2D uTextureBass;
uniform sampler2D uTextureHigh;
uniform float uAudioFrequency;
uniform float uAspectRatio;
varying vec2 vUv;

void main() {

    vec2 aspectUv = vUv;
    aspectUv.x *= uAspectRatio; // Ajustement de l'UV pour compenser l'aspect ratio

    vec4 mask;
    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
    vec4 white = vec4(1.0, 1.0, 1.0, 1.0);
    float revertFrequency = 1.0 - uAudioFrequency; // Inverse de la fréquence pour que les basses soient à gauche et les aigus à droite

    //--- coté noir coté blanc

    // if (vUv.x < revertFrequency) {
    //     mask = black; // Noir
    // } else {
    //     mask = white; // Blanc
    // }

    //--- barre horizontale et verticale

    float numCircles = 20.0;

    vec2 gridUv = fract(aspectUv * numCircles);

    float inverUVX = 1.0 - vUv.x;

    float circle = distance(gridUv, vec2(0.5));
    float strenght = step(revertFrequency + (inverUVX * 0.25), circle);

    // gl_FragColor = vec4(strenght, strenght, strenght, 1.0);

    mask = vec4(strenght, strenght, strenght, 1.0);
    gl_FragColor = mask == black ? texture2D(uTextureBass, vUv) : texture2D(uTextureHigh, vUv);
    // vUv = uv;
}