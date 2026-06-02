uniform sampler2D uTextureBass;
uniform sampler2D uTextureHigh;
varying vec2 vUv;


void main()
{

    vec4 mask;
    if (vUv.x < 0.5) {
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