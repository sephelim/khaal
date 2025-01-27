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

  await Selenium.Assets.Shaders.Register('basic');
  Selenium.Assets.Shaders.Use('basic');

  //! need global texture table to save memory!

  const cube = new Selenium.Graphics.Basic.Cube({x: 500, y: 100, z: -25});
  const pyramid = new Selenium.Graphics.Basic.Pyramid({x: 500, y: 200, z: -25});
  await cube.SetBackground('placeholder.png');
  await pyramid.SetBackground('placeholder2.png');

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

  Selenium.Input.Camera.SetView('basic');
  Selenium.Assets.Shaders.SetUniform(
      'basic', 'v3_light_position', GLMatrix.Vec3.fromValues(50, 500, 50));

  Selenium.RegisterRenderer(() => {
    Selenium.Graphics.ClearScreen(0.0, 0.0, 0.0);
    Selenium.Assets.Shaders.SetUniform(
        'basic', 'm4_projection_matrix', Selenium.Graphics.Projection);
    Selenium.Assets.Shaders.SetUniform('basic', 'b_show_normals', false);

    cube.Render('basic');  //? why gone when second shape
    pyramid.Render('basic');

    if (Selenium.Data.Mode == 0) {
      const model_matrix = GLMatrix.Mat4.create();

      GLMatrix.Mat4.translate(
          model_matrix, model_matrix, GLMatrix.Vec3.fromValues(50, 0, -25));
      Selenium.Assets.Shaders.SetUniform(
          'basic', 'm4_model_matrix', model_matrix);
      Selenium.Assets.Shaders.SetUniform(
          'basic', 'v3_model_color', GLMatrix.Vec3.fromValues(1.0, 0.25, 0.5));

      gl.bindVertexArray(lines_buffer);
      gl.drawArrays(gl.LINES, 0, 6);
    }
  });
}