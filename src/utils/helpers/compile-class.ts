type Arg = string | undefined | boolean | null | Arg[];

export const compileClass = (...classNames: Arg[]): string => {
  return classNames.reduce<string>((acc, current) => {
    if (!current) {
      return acc;
    }

    if (Array.isArray(current)) {
      return compileClass(...current);
    }

    if (current === true) {
      return acc;
    }

    return (acc + ' ' + current.replace(' ', '')).trim();
  }, '');
};
