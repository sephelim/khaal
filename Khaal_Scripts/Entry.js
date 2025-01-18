'use strict';
import {Selenium} from '../Selenium/Selenium.js';
import {GLMatrix} from '../Selenium/Dependencies/GLMatrix.js';

export async function Main() {
  await Selenium.Graphics.Shaders.Register('basic');

  const cube = new Selenium.Graphics.Basic.Cube({x: 200, y: 0, z: 0});

  const lines_buffer =
      Selenium.Graphics.Buffers.CreateVertexObject(new Float32Array([
        0.0, 0.0, 0.0,   // origin
        50.0, 0.0, 0.0,  // north
        0.0, 0.0, 0.0,   // orgin
        0.0, 50.0, 0.0,  // east
        0.0, 0.0, 0.0,   // orgin
        0.0, 0.0, 50.0,  // up
      ]))[0];
  // A stride of 24 will skip color components.
  GL.vertexAttribPointer(0, 3, GL.FLOAT, false, 0, 0);
  GL.enableVertexAttribArray(0);

  Selenium.RegisterRenderer(() => {
    Selenium.Graphics.ClearScreen(0.0, 0.0, 0.0);
    Selenium.Graphics.Shaders.SetUniform(
        'basic', 'm4_projection_matrix', Selenium.Graphics.Projection);

    cube.Render('basic');

    if (Selenium.Data.Mode == 0) {
      let transformVector = GLMatrix.Vec3.fromValues(50, 0, -25);
      const model_matrix = GLMatrix.Mat4.create();
      GLMatrix.Mat4.fromTranslation(model_matrix, transformVector);

      Selenium.Graphics.Shaders.SetUniform(
          'basic', 'm4_model_matrix', model_matrix);
      Selenium.Graphics.Shaders.SetUniform(
          'basic', 'v3_model_color', GLMatrix.Vec3.fromValues(1.0, 1.0, 0.0));

      GL.bindVertexArray(lines_buffer);
      GL.drawArrays(GL.LINES, 0, 6)
    }
  });
}