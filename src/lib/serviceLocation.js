import { packageName } from "./runTimeConfig";

function getScriptSrc (jsFileName) {
  const myScript = document.querySelector(
    `script[src*="${jsFileName}"]`
  );
  return myScript ? myScript.src : '';
}

function getBasePath (scriptSrc) {
  return scriptSrc.split('/').slice(0,-1).join('/') || '/';
}

export const scriptSrc = getScriptSrc(`${packageName}.js`);
export const basePath = getBasePath(scriptSrc);
