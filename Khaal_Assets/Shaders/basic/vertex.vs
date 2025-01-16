#version 300 es

// The W coordinate defaults to 1, which perfectly suits us because we don't
// want it to have bearing on positional calculations.
layout(location =  0) in vec4 position;
layout(location = 1) in vec4 color;

out vec4 fragment_color;

uniform mat4 m4_projection_matrix;
uniform mat4 m4_view_matrix;

void main()
{
    fragment_color = color;
    gl_Position = m4_projection_matrix * position;
}