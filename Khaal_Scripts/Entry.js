'use strict';
import {Selenium} from '../Selenium/Selenium.js';
import {GLMatrix} from '../Selenium/Dependencies/GLMatrix.js';

export async function Main() {
  await Selenium.Graphics.Shaders.Register('basic');

  const cube = new Selenium.Graphics.Basic.Cube({x: 100, y: 0, z: 0});
  // GL.viewport(0, 0, window.innerWidth, window.innerHeight);
  const position_buffer =
      Selenium.Graphics.Buffers.CreateVertexObject(new Float32Array([
        50.0, 50.0, 0.0, 1.0, 0.5, 0.5,  // v1 (top right)
        0.0,  50.0, 0.0, 1.0, 0.5, 0.5,  // v2 (top left)
        50.0, 0.0,  0.0, 1.0, 0.5, 0.5,  // v3 (bottom right)
        0.0,  0.0,  0.0, 0.0, 0.5, 0.5,  // v4 (bottom left)
        50.0, 0.0,  0.0, 0.0, 0.5, 0.5,  // v5 (bottom right)
        0.0,  50.0, 0.0, 0.0, 0.5, 0.5   // v6 (top left)
      ]));

  // A stride of 24 will skip color components.
  GL.vertexAttribPointer(0, 3, GL.FLOAT, false, 24, 0);
  GL.enableVertexAttribArray(0);
  GL.vertexAttribPointer(1, 3, GL.FLOAT, false, 24, 12);
  GL.enableVertexAttribArray(1);

  const lines_buffer =
      Selenium.Graphics.Buffers.CreateVertexObject(new Float32Array([
        0.0,  0.0,  0.0,  1, 0, 0,  // orgin
        50.0, 0.0,  0.0,  1, 0, 0,  // north
        0.0,  0.0,  0.0,  0, 1, 0,  // orgin
        0.0,  50.0, 0.0,  0, 1, 0,  // east
        0.0,  0.0,  0.0,  0, 0, 1,  // orgin
        0.0,  0.0,  50.0, 0, 0, 1,  // up
      ]));
  // A stride of 24 will skip color components.
  GL.vertexAttribPointer(0, 3, GL.FLOAT, false, 24, 0);
  GL.enableVertexAttribArray(0);
  GL.vertexAttribPointer(1, 3, GL.FLOAT, false, 24, 12);
  GL.enableVertexAttribArray(1);

  Selenium.RegisterRenderer(() => {
    Selenium.Graphics.ClearScreen(0.0, 0.0, 0.0);
    Selenium.Graphics.Shaders.SetUniform(
        'basic', 'm4_projection_matrix', Selenium.Graphics.Projection);

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    Selenium.Graphics.Shaders.Use('basic');
    GL.bindVertexArray(position_buffer)
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        let transformVector = GLMatrix.Vec3.fromValues(x * 50, y * 50, 0)
        const model_matrix = GLMatrix.Mat4.create();

        GLMatrix.Mat4.fromTranslation(model_matrix, transformVector);

        Selenium.Graphics.Shaders.SetUniform(
            'basic', 'm4_model_matrix', model_matrix);

        GL.drawArrays(GL.TRIANGLES, 0, 6);
      }
    }
    if (Selenium.Data.debugging) {
      let transformVector = GLMatrix.Vec3.fromValues(0, 0, 0)
      const model_matrix = GLMatrix.Mat4.create();

      GLMatrix.Mat4.fromTranslation(model_matrix, transformVector);

      Selenium.Graphics.Shaders.SetUniform(
          'basic', 'm4_model_matrix', model_matrix);

      GL.bindVertexArray(lines_buffer);
      GL.drawArrays(GL.LINES, 0, 6)
    }
  });
}