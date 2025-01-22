#version 300 es
/**
 * basic/vertex.vs
 * Sephelim
 * The basic vertex shader for any object. This includes outputs for lighting,
 * projection, and all that interesting shader stuff.
 *
 * AGPLv3
 * (c) 2025 the Selenium Development Team
 * This source file is under the AGPLv3. For information on what that
 * means, see the LICENSE.md file that should have been provided alongside
 * this project, or https://www.gnu.org/licenses/agpl-3.0.md.
 */

// The (X, Y, Z) position of the vertex.
layout(location = 0) in highp vec3 position;
// The (U, V, W) normal of the vertex.
layout(location = 1) in mediump vec3 normal;

/**
 * The projection matrix of the scene. Every vertex is passed through
 * this matrix before being displayed--providing a worldspace-to-screenspace
 * conversion.
 */
uniform highp mat4 m4_projection_matrix;
/**
 * The camera view matrix. Self-explanatory.
 */
uniform highp mat4 m4_view_matrix;
/**
 * The matrix to be supplied for this specific model. This includes data like
 * rotation, position, ecetera.
 */
uniform highp mat4 m4_model_matrix;
/**
 * The position of the light in the scene. This is used for diffuse calculations.
 */
uniform highp vec3 v3_light_position;
/**
 * The passed-in global model color. This is a sort of "dye"--it is
 * mixed over any provided texture. This should be normalized.
 */
uniform lowp vec3 v3_model_color;

/**
 * The position of the current fragment onscreen. This is the vertex position
 * multiplied by the model matrix. This is passed to the fragment shader for use
 * in lighting calculations.
 */
out highp vec3 fragment_position;
/**
 * The normals of this vertex. This is provided for lighting purposes to the 
 * fragment shader.
 */
out mediump vec3 vertex_normal;
/**
 * The light position output to the fragment shader.
 */
out highp vec3 light_position;
/**
 * The color output to the fragment shader. This is used to calculate the color
 * of the current screen fragment, along with lighting effects.
 */
out lowp vec3 model_color;

void main() {
    highp vec4 transformed_position = m4_view_matrix * m4_model_matrix * 
        vec4(position, 1.0);
    fragment_position = transformed_position.xyz;

    light_position = v3_light_position;
    vertex_normal = normal;
    model_color = v3_model_color;

    gl_Position = m4_projection_matrix * transformed_position;
}