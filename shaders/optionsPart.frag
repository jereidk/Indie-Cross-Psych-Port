#pragmam header

uniform float time;

void main() {
    vec2 uv = openfl_TextureCoordv;
    vec3 baseColor = vec3(0.0);
    
    int numParticles = 5;
    
    float radius = 0.02;
    
    for (int i = 0; i < numParticles; i++) {
        vec2 pos = vec2(mod(float(i) * 0.3, 1.0), fract(float(i) * 0.3));
        
        pos.x += sin(time * 0.5 + float(i)) * 0.1;
        pos.y += cos(time * 0.5 + float(i)) * 0.1;
        
        float dist = length(uv - pos);
        
        baseColor += mix(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.5, 1.0), smoothstep(radius, radius * 1.5, dist));
    }
    
    baseColor /= float(numParticles);
    
    gl_FragColor = texture2D(bitmap, uv) * vec4(baseColor, 1.0);
}