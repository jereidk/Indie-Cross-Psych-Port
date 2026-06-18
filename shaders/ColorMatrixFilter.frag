#pragma header

uniform int colorblind;
uniform float gamma;
uniform float brightness;
uniform float contrast;
uniform float saturation;
uniform float vignetteStrength;

void main() {
    vec4 texColor = flixel_texture2D(bitmap, openfl_TextureCoordv);
    vec4 finalColor = vec4(0.0);

    mat3 colorMatrix[9];
    colorMatrix[0] = mat3(1.0);
    colorMatrix[1] = mat3(
        0.567, 0.433, 0.0,
        0.558, 0.442, 0.0,
        0.0, 0.242, 0.758
    );
    colorMatrix[2] = mat3(
        0.817, 0.183, 0.0,
        0.333, 0.667, 0.0,
        0.0, 0.125, 0.875
    );
    colorMatrix[3] = mat3(
        0.625, 0.375, 0.0,
        0.7, 0.3, 0.0,
        0.0, 0.0, 1.0
    );
    colorMatrix[4] = mat3(
        0.8, 0.2, 0.0,
        0.258, 0.742, 0.0,
        0.0, 0.142, 0.858
    );
    colorMatrix[5] = mat3(
        0.95, 0.05, 0.0,
        0.0, 0.433, 0.567,
        0.0, 0.475, 0.525
    );
    colorMatrix[6] = mat3(
        0.967, 0.033, 0.0,
        0.0, 0.733, 0.267,
        0.0, 0.183, 0.817
    );
    colorMatrix[7] = mat3(
        0.299, 0.587, 0.114,
        0.299, 0.587, 0.114,
        0.299, 0.587, 0.114
    );
    colorMatrix[8] = mat3(
        0.618, 0.320, 0.062,
        0.163, 0.775, 0.062,
        0.163, 0.320, 0.516
    );

    mat3 selectedMatrix = colorMatrix[colorblind];

    finalColor.rgb = pow(texColor.rgb, vec3(gamma)) * selectedMatrix;

    finalColor.rgb += brightness / 200.0;
    finalColor.rgb = (finalColor.rgb - 0.5) * contrast + 0.5;
    
    float vignette = distance(openfl_TextureCoordv.xy, vec2(0.5)) * 2.0;
    finalColor.rgb *= 1.0 - vignetteStrength * vignette * vignette;
    
    vec3 grey = vec3(dot(finalColor.rgb, vec3(0.299, 0.587, 0.114)));
    finalColor.rgb = mix(grey, finalColor.rgb, saturation);
    finalColor.a = 1.0;

    gl_FragColor = finalColor;
}