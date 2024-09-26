export function isLowerThanString(max: number) {
  return (val: string): boolean | string => {
    return (
      !val ||
      val.length < max ||
      `La chaîne de caractère doit être inférieur à ${max} caractères`
    );
  };
}

export function isGreaterThanString(min: number) {
  return (val: string): boolean | string => {
    return (
      !val ||
      min < val.length ||
      `La chaîne de caractère doit être supérieur à ${min} caractères`
    );
  };
}

export function isRequired(val: string): boolean | string {
  return (
    (val !== undefined && val !== null && val !== "") || "Le champ est requis"
  );
}

export function isAlpha(val: string): boolean | string {
  return (
    /^[A-Za-z]+$/.test(val) ||
    "Ne pas utiliser de characteres spéciaux ni de chiffres"
  );
}
