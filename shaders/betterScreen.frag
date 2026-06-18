#pragma header

#define iChannel0 bitmap
#define texture flixel_texture2D
#define fragColor gl_FragColor
#define fragCoord openfl_TextureCoordv
#define mainImage main

uniform float iTime;

void mainImage()
{
    vec2 uv = fragCoord.xy;
    
    vec3 color = texture(iChannel0, uv).rgb;
    color = pow(color, vec3(1.2));
    
    vec3 sharpColor = texture(iChannel0, uv - 0.001).rgb * 1.0;
    sharpColor -= texture(iChannel0, uv - 0.002).rgb;
    sharpColor += texture(iChannel0, uv + 0.001).rgb * 1.0;
    sharpColor -= texture(iChannel0, uv + 0.002).rgb;
    color += sharpColor;
    
    fragColor = vec4(color, 1.0);
}