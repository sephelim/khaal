'use strict';
import {Selenium} from '../Selenium/Selenium.js';
import {GLMatrix} from '../Selenium/Dependencies/GLMatrix.js';

export async function Main() {
  await Selenium.Graphics.Shaders.Register('basic');

  const cube = new Selenium.Graphics.Basic.Cube({x: 100, y: 0, z: 0});

  Selenium.RegisterRenderer(() => {
    Selenium.Graphics.ClearScreen(0.0, 0.0, 0.0);
    Selenium.Graphics.Shaders.SetUniform(
        'basic', 'm4_projection_matrix', Selenium.Graphics.Projection);

    cube.Render('basic');
  });
}