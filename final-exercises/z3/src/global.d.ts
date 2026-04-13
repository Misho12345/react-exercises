type AwaitedValue<T> = T extends PromiseLike<infer U> ? U : T;

interface PromiseFulfilledResult<T> {
  status: "fulfilled";
  value: T;
}

interface PromiseRejectedResult {
  status: "rejected";
  reason: unknown;
}

type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;

interface PromiseConstructor {
  allSettled<T extends readonly unknown[] | []>(
    values: T
  ): Promise<{ [P in keyof T]: PromiseSettledResult<AwaitedValue<T[P]>> }>;
}
