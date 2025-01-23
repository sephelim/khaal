#version 300 es
/**
 * basic/fragment.fs
 * Sephelim, Ian
 * The basic fragment shader for any object. This includes calculations
 * for diffuse and ambient lighting.
 *
 * AGPLv3
 * (c) 2025 the Selenium Development Team
 * This source file is under the AGPLv3. For information on what that
 * means, see the LICENSE.md file that should have been provided alongside
 * this project, or https://www.gnu.org/licenses/agpl-3.0.md.
 */

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
 * If true the normals of the object will be shown. This is useful for
 * debugging purposes.
 */
uniform bool b_show_normals;

/**
 * The position of the current screen fragment. This is used for diffuse
 * lighting effects.
 */
in highp vec3 fragment_position;
/**
 * The calculated surface normal of the object. This is used for lighting
 * calculations.
 */
in mediump vec3 vertex_normal;

/**
 * The produced RGBA color for the screen fragment.
 */
out lowp vec4 FragmentColor;

/**
 * The strength of the ambient light in the scene. This helps to offset straight
 * black in a nighttime environment, for example.
 */
const lowp float ambient_strength = 0.75;

void main() {
    highp vec3 light_direction = normalize(v3_light_position - fragment_position);

    highp float diff = max(dot(vertex_normal, light_direction), 0.0);
    // The light is white-colored.
    highp vec3 diffuse = diff * vec3(1.0, 1.0, 1.0);

    highp vec3 result = (ambient_strength + diffuse) * v3_model_color;
    FragmentColor = vec4(result, 1.0);

    if (b_show_normals)
     FragmentColor = vec4(vertex_normal, 1.0);
}