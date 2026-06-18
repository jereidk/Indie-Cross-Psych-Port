#pragma header

uniform float progress;
uniform bool reverse;
uniform float diamondPixelSize;

void main() {
    float xFraction = fract(gl_FragCoord.x / diamondPixelSize);
    float yFraction = fract(gl_FragCoord.y / diamondPixelSize);
    float xDistance = abs(xFraction - 0.5);
    float yDistance = abs(yFraction - 0.5);
        
    float target = xDistance + yDistance + openfl_TextureCoordv.y;
    float actualProgress = progress * 2.0;
        
    if (reverse) {
        if (target < actualProgress) discard;
    } else {
        if (target > actualProgress) discard;
    }

    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}