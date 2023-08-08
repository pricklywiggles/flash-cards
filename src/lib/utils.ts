type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

function isObject<T>(item: T): item is T extends object ? T : never {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export const deepMerge = <T>(target: T, source: DeepPartial<T>): T => {
  let output: T = Object.assign({}, target);

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const keyT = key as keyof T;
      const sourceKey = source[keyT];
      const targetKey = target[keyT];

      if (
        sourceKey !== undefined &&
        isObject(sourceKey) &&
        isObject(targetKey)
      ) {
        output[keyT] = deepMerge(targetKey, sourceKey);
      } else if (sourceKey !== undefined) {
        output[keyT] = sourceKey as any;
      }
    });
  }
  return output;
};
