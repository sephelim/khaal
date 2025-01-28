#version 300 es

uniform lowp vec4 v4_text_color;

uniform sampler2D s2_glyph_texture;

in lowp vec2 vertex_texture;

out lowp vec4 fragment_color;

void main() {
    fragment_color = texture(s2_glyph_texture, vertex_texture) * v4_text_color;
}