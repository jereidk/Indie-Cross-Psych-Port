#pragma header

uniform float time;
const float intensity = 0.5;
const float amount = 10.0;
const float speedFactor = 0.3;
const float timeFactorMultiplier = 1.0;
const float x_offsetMultiplier = 1.5;
const float circleOpacityThreshold = 0.001;
const float circleOpacityMultiplier = 0.5;
const float circleRadiusMultiplier = 0.012;
const float centerOffsetMultiplier = 2.0;
const float randomOffsetMultiplier = 10000000.0;
const float cosMultiplier = 2.0;
const float sinMultiplier = 2.0;
const float speedOffset = 1.0;
const float speedMultiplier = 0.5;
const float intensityOffset = 0.1;
const float intensityMultiplier = 0.1;
const float modValue = 1.0;
const float uvOffset = 2.0;

float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = vec2(openfl_TextureCoordv.x * uvOffset, openfl_TextureCoordv.y);
    vec4 finalColor = texture2D(bitmap, openfl_TextureCoordv);

    for(float i = 0.0; i < amount; i++) {
        float j = i * cosMultiplier;
        float cos_j = cos(j);
        float sin_j = sin(j);
        
        float speed = (speedFactor + rand(vec2(cos_j, sin_j)) * (speedOffset + speedMultiplier * cos_j / (amount * intensityOffset)));
        float time_factor = time * timeFactorMultiplier * (intensityOffset + intensityMultiplier);
        float x_offset = x_offsetMultiplier * cos(time + sin_j);
        
        float random_val = rand(vec2(j, sin_j));
        float mod_val = mod(sin_j + speed * time_factor, modValue);
        vec2 center = vec2((centerOffsetMultiplier - uv.y) * intensity + random_val + x_offset, mod_val);
        
        float circle_opacity = 1.0 - smoothstep(0.0, circleOpacityThreshold + speed * (intensity / speedFactor) * circleRadiusMultiplier, length(uv - center));
        finalColor += vec4(circleOpacityMultiplier * circle_opacity);
    }

    gl_FragColor = finalColor;
}