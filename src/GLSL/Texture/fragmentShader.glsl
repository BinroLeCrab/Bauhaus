varying vec2 vUv;
varying vec3 vWorldPos;  // ← Ajouter ça
uniform float uSkyPosition;
uniform vec3 uColorFloor; // Couleur A
uniform vec3 uColorSky; // Couleur B

void main() {

    // float highValue = vWorldPos.y / uSkyPosition;

    float highValue = vWorldPos.y / uSkyPosition;
    highValue = clamp(highValue, 0.0, 1.0);
    highValue = pow(highValue, 0.5);

    
    // Interpoler entre A et B avec highValue (0.0 = A, 1.0 = B)
    vec3 finalColor = mix(uColorFloor, uColorSky, highValue);

    gl_FragColor = vec4(finalColor, 1.0);
    // vUv = uv;
}