export function createFragment() {
  return new DocumentFragment();
}

export function createElement(name: string) {
  return document.createElement(name);
}

export function createText(text?: string) {
  return new Text(text);
}
