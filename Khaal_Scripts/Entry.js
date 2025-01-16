'use strict';
import { Selenium } from '../Selenium/Selenium.js';

import { GLMatrix } from '../Selenium/Dependencies/GLMatrix.js';

export async function Main() {
    await Selenium.Graphics.Shaders.Register('basic');

    GL.viewport(0, 0, window.innerWidth, window.innerHeight);
    const position_buffer =
        Selenium.Graphics.Buffers.CreateVertexObject(new Float32Array([
            100.0, 100.0, -100.0, 1.0, 0.5, 0.5,  // v1 (top right)
            0.0, 100.0, -100.0, 1.0, 0.5, 0.5,  // v2 (top left)
            100.0, 0.0, -100.0, 1.0, 0.5, 0.5,  // v3 (bottom right)
            0.0, 0.0, -100.0, 0.0, 0.5, 0.5,  // v4 (bottom left)
            100.0, 0.0, -100.0, 0.0, 0.5, 0.5,  // v5 (bottom right)
            0.0, 100.0, -100.0, 0.0, 0.5, 0.5   // v6 (top left)
        ]));
    // A stride of 24 will skip color components.
    GL.vertexAttribPointer(0, 3, GL.FLOAT, false, 24, 0);
    GL.enableVertexAttribArray(0);
    GL.vertexAttribPointer(1, 3, GL.FLOAT, false, 24, 12);
    GL.enableVertexAttribArray(1);

    const projection_matrix = GLMatrix.Mat4.create();
    GLMatrix.Mat4.ortho(
        projection_matrix, 0.0, window.innerWidth, window.innerHeight, 0.0, 0,
        400.0);

    GLMatrix.Mat4.translate(
        projection_matrix, projection_matrix,
        GLMatrix.Vec3.fromValues(150, 150, -150));

    GLMatrix.Mat4.rotateX(
        projection_matrix, projection_matrix, GLMatrix.ToRadians(45));
    GLMatrix.Mat4.rotateZ(
        projection_matrix, projection_matrix, GLMatrix.ToRadians(45));



    GLMatrix.Mat4.scale(
        projection_matrix, projection_matrix, GLMatrix.Vec3.fromValues(1, 1, 1));

    Selenium.Graphics.Shaders.GetUniform('basic', 'm4_projection_matrix');
    Selenium.Graphics.Shaders.SetUniform(
        'basic', 'm4_projection_matrix', projection_matrix);

    Selenium.Graphics.Shaders.GetUniform('basic', 'm4_model_matrix');

    Selenium.RegisterRenderer(() => {
        Selenium.Graphics.ClearScreen();

        // Tell WebGL how to pull out the positions from the position
        // buffer into the vertexPosition attribute.

        Selenium.Graphics.Shaders.Use('basic');
        GL.drawArrays(GL.TRIANGLES, 0, 6);

    });
}