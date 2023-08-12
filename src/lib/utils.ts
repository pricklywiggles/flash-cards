import Hashids from "hashids";
export type NumberLike = bigint | number;
const hashids = new Hashids();

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

function isObject<T>(item: T): item is T extends object ? T : never {
  return item && typeof item === "object" && !Array.isArray(item);
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

export const log = (...args: any[]) => {
  console.log(JSON.stringify(args, null, 2));
};

export const encodeId = hashids.encode.bind(hashids);
export const decodeUuid = (uuid: string) => {
  const id = hashids.decode(uuid)[0];
  if (typeof id === "number") {
    return id;
  }
  if (typeof id === "bigint") {
    console.log("Found a bigint id", { id });
    return Number(id);
  }
  throw new Error(`Invalid id: ${id}`);
};
