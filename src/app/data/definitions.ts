export interface UINT {
  dim: number;
  bits: boolean[]; // du poids fort au poids faible, dims éléments
  overflow: boolean;
}

/* Renvoie la négation bit à bit de e.
 * Les attributs dim et overflow du résultat sont les même que ceux du paramètre e.
 * Exemple: inverse({dim: 4, bits: [true, false, false, true], overflow: false})
 *   revoie {dim: 4, bits: [false, true, true, false], overflow: false}
 */
export function inverse(e: UINT): UINT {
  return {
    ...e,
    overflow: e.overflow,
    bits: e.bits.map( b => !b)
  };
}

/* Additionne a et b. On suppose que a et b ont la même dimension (a.dim === b.dim)
 * Le UINT résultat a la même dimension que a et b.
 * Indication: utilisez une boucle ou la méthode reduceRight des tableaux
 */
export function add(a: UINT, b: UINT): UINT {
  return a.bits.reduceRight( ({bits, overflow}, v, i) => ({
      dim: a.dim,
      bits: [ overflow ? a.bits[i] && b.bits[i] : a.bits[i] || b.bits[i]
            , ...bits],
      overflow: overflow ? a.bits[i] || b.bits[i] : a.bits[i] && b.bits[i]
    } as UINT),
    {bits: [], overflow: false, dim: a.dim} as UINT
  );
}

/* Renvoie le nombre représenté par le paramètre ui de type UINT
 * Si l'attribut overflow de ui est vrai, alors le résultat de la fonction est NaN
 * Exemples :
 *   toNumber({dim: 2, bits: [true, true], overflow: false}) === 3
 *   toNumber({dim: 1, bits: [true], overflow: true}) === NaN
 *   toNumber({dim: 0, bits: [], overflow: false}) === 0
 */
export function toNumber(ui: UINT): number {
  return ui.overflow ? NaN : ui.bits.reduce( (acc, v) => acc * 2 + (v ? 1 : 0), 0);
}

/* Renvoie le UINT de dimension dim représenté par le paramètre n de type number
 * Si n n'est pas représentable par un UINT de dimension dim, alors l'attribut overflow du résultat est vrai
 * Exemples :
 *   toUINT(3, 2) === {dim: 2, bits: [true, true], overflow: false}
 *   toUINT(3, 1) === {dim: 1, bits: [true], overflow: true}
 *   toUINT(0, 0) === {dim: 0, bits: [], overflow: false}
 */
export function toUINT(n: number, dim: number): UINT {
  if (isNaN(n)) {
    return {dim, bits: Array(dim).fill(false), overflow: true };
  }
  const bits: boolean[] = [];
  for (let i = 0; i < dim; i++) {
    bits.push( !!(n % 2) );
    n = Math.floor(n / 2);
  }
  return {dim, bits: bits.reverse(), overflow: n > 0};
}

