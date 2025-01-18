#version 300 es

// The W coordinate defaults to 1, which perfectly suits us because we don't
// want it to have bearing on positional calculations.
layout(location = 0) in vec4 position;


out vec4 fragment_color;

uniform vec3 v3_model_color;
uniform mat4 m4_projection_matrix;
// Matrix to apply individual tiles's position transformations
uniform mat4 m4_model_matrix;

void main() {
    fragment_color = vec4(v3_model_color, 1.0);
    gl_Position = m4_projection_matrix * m4_model_matrix * position;
}