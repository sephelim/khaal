#version 300 es
/**
 * basic/fragment.fs
 * Sephelim
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
 * The global dye color of the model. This is mixed with the texture
 * color.
 */
in lowp vec3 model_color;

/**
 * The produced RGBA color for the screen fragment.
 */
out lowp vec4 FragmentColor;

/**
 * The strength of the ambient light in the scene. This helps to offset straight
 * black in a nighttime environment, for example.
 */
const lowp float ambient_strength = 0.35;

/**
 * The ambient/environmental light affecting this screen fragment.
 */
const lowp vec3 ambient_light = ambient_strength * vec3(1.0, 1.0, 1.0);

void main()
{
    FragmentColor = vec4(ambient_light * model_color, 1.0);
}