export type ElementType<T extends ReadonlyArray<unknown>> =
  T extends ReadonlyArray<infer ElementType> ? ElementType : never;

// export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type ValueOf<T> = T[keyof T];

export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
