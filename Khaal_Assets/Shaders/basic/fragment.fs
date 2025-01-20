#version 300 es

// The color of the vertex in normalized RGB values.
in lowp vec4 fragment_color;

out lowp vec4 FragmentColor;

void main()
{
    FragmentColor = fragment_color;
}