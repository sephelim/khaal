#version 300 es

// The color of the vertex in normalized RGB values.
in lowp vec3 fragment_color;
in lowp vec3 normal_value;
in lowp vec3 fragment_position;

// This should probably be modular somewhere.
lowp vec3 light_color = vec3(1.0, 1.0, 1.0);
lowp vec3 light_position = vec3(1.2, 1.0, 2.0);

out lowp vec4 FragmentColor;

void main()
{
    lowp vec3 normal = normalize(normal_value);
    lowp vec3 light_direction = normalize(light_position - fragment_position);
    lowp float light_intensity = max(dot(normal, light_direction), 0.0);
    lowp vec3 diffuse = light_intensity * light_color;

    FragmentColor = vec4(diffuse * fragment_color, 1.0);
}