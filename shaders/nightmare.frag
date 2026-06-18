#pragma header

uniform float curBeat;
uniform float bpm;

void main() {
    vec2 uv = openfl_TextureCoordv;

    float cycleProgress = mod(curBeat * bpm / 60.0, 1.0);
    float intensity = smoothstep(0.2, 0.8, cycleProgress);
    
    vec4 color = texture2D(bitmap, uv);
    float brightness = dot(color.rgb, vec3(0.299, 0.587, 0.114));

    float brightnessThreshold = 0.5;
    vec3 highlight = color.rgb * smoothstep(brightnessThreshold, 1.0, brightness);

    float fadeDuration = 60.0 / bpm;
    float fadeIntensity = 1.0 - mod(curBeat, fadeDuration) / fadeDuration;
    fadeIntensity = smoothstep(0.0, 1.0, fadeIntensity);
    
    float bloomIntensity = smoothstep(0.1, 0.9, intensity * fadeIntensity);

    float maxBrightness = 2.0;
    vec3 finalHighlight = mix(color.rgb, highlight, bloomIntensity) * maxBrightness;

    vec4 finalColor = vec4(finalHighlight, color.a);

    finalColor.rgb = mix(color.rgb, finalHighlight, 0.2);

    gl_FragColor = finalColor;
}