#pragma header

uniform float progress;

void main(void)
{
    vec4 buttonColor = flixel_texture2D(bitmap, openfl_TextureCoordv);
    float mixFactor = smoothstep(0.1, 1.0, progress);
    vec4 glowColor = vec4(buttonColor.rgb, buttonColor.a * 0.2);
    vec4 mixedColor = mix(buttonColor, glowColor, mixFactor);

    float blurRadius = 0.08 * progress;
    float blurIntensity = 0.5 * progress;

    vec4 blurredColor = mixedColor;
    for (float x = -1.0; x <= 1.0; x += 1.0) {
        for (float y = -1.0; y <= 1.0; y += 1.0) {
            float offsetX = x * blurRadius;
            float offsetY = y * blurRadius;
            blurredColor += flixel_texture2D(bitmap, openfl_TextureCoordv + vec2(offsetX, offsetY)) * blurIntensity;
        }
    }

    gl_FragColor = blurredColor;
}