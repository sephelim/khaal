#version 300 es

// The W coordinate defaults to 1, which perfectly suits us because we don't
// want it to have bearing on positional calculations.
layout(location = 0) in vec4 position;
layout(location = 1) in vec3 normal;

out vec3 fragment_color;
out vec3 normal_value;
out vec3 fragment_position;

uniform vec3 v3_model_color;
uniform mat4 m4_projection_matrix;
// Matrix to apply individual tiles's position transformations
uniform mat4 m4_model_matrix;

void main() {
    fragment_color = v3_model_color;
    normal_value = normal;

    gl_Position = m4_projection_matrix * m4_model_matrix * position;
}