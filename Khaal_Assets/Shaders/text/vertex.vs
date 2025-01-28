#version 300 es

layout(location = 0) in highp vec3 position;
layout(location = 1) in lowp vec2 texture;

uniform mat4 m4_projection_matrix;
uniform mat4 m4_model_matrix;

out lowp vec2 vertex_texture;

void main() {
    vertex_texture = texture;
    gl_Position = m4_projection_matrix * m4_model_matrix * vec4(position, 1.0);
}