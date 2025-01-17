'use strict';
import {Selenium} from '../Selenium/Selenium.js';

import {GLMatrix} from '../Selenium/Dependencies/GLMatrix.js';

export async function Main() {
  await Selenium.Graphics.Shaders.Register('basic');

  // GL.viewport(0, 0, window.innerWidth, window.innerHeight);
  const position_buffer =
      Selenium.Graphics.Buffers.CreateVertexObject(new Float32Array([
        100.0, 100.0, -100.0, 1.0, 0.5, 0.5,  // v1 (top right)
        0.0,   100.0, -100.0, 1.0, 0.5, 0.5,  // v2 (top left)
        100.0, 0.0,   -100.0, 1.0, 0.5, 0.5,  // v3 (bottom right)
        0.0,   0.0,   -100.0, 0.0, 0.5, 0.5,  // v4 (bottom left)
        100.0, 0.0,   -100.0, 0.0, 0.5, 0.5,  // v5 (bottom right)
        0.0,   100.0, -100.0, 0.0, 0.5, 0.5   // v6 (top left)
      ]));
  // A stride of 24 will skip color components.
  GL.vertexAttribPointer(0, 3, GL.FLOAT, false, 24, 0);
  GL.enableVertexAttribArray(0);
  GL.vertexAttribPointer(1, 3, GL.FLOAT, false, 24, 12);
  GL.enableVertexAttribArray(1);

  Selenium.Graphics.Shaders.GetUniform('basic', 'm4_projection_matrix');

  Selenium.RegisterRenderer(() => {
    Selenium.Graphics.ClearScreen(0.0, 0.0, 0.0);
    Selenium.Graphics.Shaders.SetUniform(
        'basic', 'm4_projection_matrix', Selenium.Graphics.Projection);

    Selenium.Graphics.Shaders.Use('basic');
    GL.drawArrays(GL.TRIANGLES, 0, 6);
  });
}