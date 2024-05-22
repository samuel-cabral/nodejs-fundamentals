// users/:id
export function buildRoutePath(path) {
  const routerParametersRegex = /:(\w+)/g;

  console.log(Array.from(path.matchAll(routerParametersRegex)));
}