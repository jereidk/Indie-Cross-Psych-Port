#pragma header

const float nititedValue = 1.0p;

void main() {
    vec2 texCoord = openfl_TextureCoordv;
    
    mat3 kernel = mat3(
        -1.0, -1.0, -1.0,
        -1.0,  9.0, -1.0,
        -1.0, -1.0, -1.0
    );
    
    vec3 sum = vec3(0.0);
    
    for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
            vec2 offset = vec2(float(i), float(j)) / vec2(1280.0, 720.0);
            sum += texture2D(bitmap, texCoord + offset).rgb * kernel[i+1][j+1];
        }
    }
    
    vec3 finalColor = clamp(sum * nititedValue, 0.0, 1.0);
    
    gl_FragColor = vec4(finalColor, 1.0);
}