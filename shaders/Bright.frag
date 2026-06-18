#pragma header

uniform float brightness;
uniform float contrast;
uniform float gamma;

void main()
{
    vec4 col = texture2D(bitmap, openfl_TextureCoordv);
    
    // Aplicar corrección de gamma, brillo y contraste
    vec3 correctedColor = pow(col.rgb, vec3(gamma)); // Corrección de gamma
    correctedColor = (correctedColor - 0.5) * contrast + 0.5; // Corrección de contraste
    correctedColor += brightness; // Corrección de brillo
    
    // Ajustar los valores para mantenerlos en el rango [0, 1]
    correctedColor = clamp(correctedColor, 0.0, 1.0);
    
    gl_FragColor = vec4(correctedColor, col.a);
}