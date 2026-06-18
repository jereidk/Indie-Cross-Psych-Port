#pragma header  

uniform float threshold;
uniform float intensity;
uniform float blurSize;

const int NUM_SAMPLES = 5; // Número de muestras para el desenfoque gaussiano

// Función de desenfoque gaussiano separable
vec4 GaussianBlur(in vec2 Coord, in sampler2D Tex, in vec2 TexelSize, in float deviation)
{
    vec4 Color = vec4(0.0);
    float totalWeight = 0.0;
    
    // Muestreo múltiple para una aproximación más precisa
    for (int i = 0; i < NUM_SAMPLES; ++i) {
        // Calcular la posición de la muestra y el peso gaussiano
        float offset = float(i - (NUM_SAMPLES - 1) / 2);
        float weight = exp(-0.5 * offset * offset / (deviation * deviation));
        
        // Acumular el color ponderado y el peso total
        Color += texture(Tex, Coord + vec2(TexelSize.x * offset, 0.0)) * weight;
        totalWeight += weight;
    }

    // Normalizar el color acumulado dividiendo por el peso total
    return Color / totalWeight;
}

void main()
{
    vec2 uv = openfl_TextureCoordv;
    vec2 TexelSize = 1.0 / vec2(1280, 720);
    vec4 Color = texture(bitmap, uv);

    if (intensity > 0.0)
    {
        // Aplicar desenfoque gaussiano horizontal
        vec4 HorizontalBlur = GaussianBlur(uv, bitmap, TexelSize, blurSize);
        
        // Aplicar desenfoque gaussiano vertical intercambiando las componentes de TexelSize
        vec4 VerticalBlur = GaussianBlur(uv, bitmap, TexelSize.yx, blurSize);
        
        // Combinar resultados horizontal y verticalmente
        vec4 BlurResult = (HorizontalBlur + VerticalBlur) / 2.0;
        
        // Aplicar umbral y mezclar con la imagen original
        vec4 Highlight = clamp(BlurResult - threshold, 0.0, 1.0) * intensity;
        gl_FragColor = mix(Color, vec4(1.0), Highlight);
    }
    else
    {
        gl_FragColor = Color;
    }
}