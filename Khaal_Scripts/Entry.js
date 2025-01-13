'use strict';
import {Selenium} from '../Selenium/Selenium.js';

export function Main() {
  Selenium.RegisterShader('basic');
  Selenium.RegisterRenderer((gl) => {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clearColor(1.0, 0.0, 0.0, 1.0);
  });
}