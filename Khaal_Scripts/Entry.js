'use strict';
import {Selenium} from '../Selenium/Selenium.js';
import {GLMatrix} from '../Selenium/Dependencies/GLMatrix.js';

/**
 *
 * @param {WebGL2RenderingContext} gl
 */
export async function Main(gl) {
  await Selenium.Input.Keyboard.LoadMap('default');
  Selenium.Input.Keyboard.Enable();

  await Selenium.Graphics.Shaders.Register('basic');
  Selenium.Graphics.Shaders.Use('basic');

  const cube = new Selenium.Graphics.Basic.Cube({x: 500, y: 100, z: -25});

  //! we need an arrow basic shape class
  const lines_buffer = Selenium.Graphics.Buffers.VO(new Float32Array([
    0.0,  0.0,  0.0,  1.0, 0.0, 0.0,  // origin
    50.0, 0.0,  0.0,  1.0, 0.0, 0.0,  // north
    0.0,  0.0,  0.0,  0.0, 1.0, 0.0,  // orgin
    0.0,  50.0, 0.0,  0.0, 1.0, 0.0,  // east
    0.0,  0.0,  0.0,  0.0, 0.0, 1.0,  // orgin
    0.0,  0.0,  50.0, 0.0, 0.0, 1.0,  // up
  ]))[0];
  // A stride of 24 will skip color components.
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0);
  gl.enableVertexAttribArray(0);

  gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12);
  gl.enableVertexAttribArray(1);

  Selenium.Graphics.Camera.SetView('basic');
  Selenium.Graphics.Shaders.SetUniform(
      'basic', 'v3_light_position', GLMatrix.Vec3.fromValues(50, 500, 50));

  Selenium.RegisterRenderer(() => {
    Selenium.Graphics.ClearScreen(0.0, 0.0, 0.0);
    Selenium.Graphics.Shaders.SetUniform(
        'basic', 'm4_projection_matrix', Selenium.Graphics.Projection);
    Selenium.Graphics.Shaders.SetUniform('basic', 'b_show_normals', false);

    cube.Render('basic');

    if (Selenium.Data.Mode == 0) {
      const model_matrix = GLMatrix.Mat4.create();

      GLMatrix.Mat4.translate(
          model_matrix, model_matrix, GLMatrix.Vec3.fromValues(50, 0, -25));
      Selenium.Graphics.Shaders.SetUniform(
          'basic', 'm4_model_matrix', model_matrix);
      Selenium.Graphics.Shaders.SetUniform(
          'basic', 'v3_model_color', GLMatrix.Vec3.fromValues(1.0, 0.25, 0.5));

      gl.bindVertexArray(lines_buffer);
      gl.drawArrays(gl.LINES, 0, 6);
    }
  });
}