// users/:id
export function buildRoutePath(path) {
  const routerParametersRegex = /:(\w+)/g;
  const pathWithParameters = path.replaceAll(routerParametersRegex, '(?<$1>[a-zA-Z0-9\-_]+)');

  const pathRegex = new RegExp(`^${pathWithParameters}(?<query>\\?(.*))?$`);

  return pathRegex;
}