const concat = (baseUrl: string, path: string) => {
  return (
    '/' + baseUrl.split('/').concat(path.split('/')).filter((part) => part.length > 0).join('/')
  );
};

export class NestedPath {
  private readonly base: string;

  constructor(base: string) {
    this.base = base;
  }

  public getPath(path: string) {
    return concat(this.base, path);
  }

  public nest(path: string) {
    return new NestedPath(concat(this.base, path));
  }
}
