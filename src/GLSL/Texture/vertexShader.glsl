varying vec2 vUv;
varying vec3 vWorldPos;
varying vec3 vNormal;

void main() {
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;  // Position en espace monde
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
