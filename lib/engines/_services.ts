/* eslint-disable @typescript-eslint/no-explicit-any */
// Permissive engine-services stub.
//
// In the Kodagen factory the `@kodagen/{engine}-engine` packages are real
// workspace packages installed at provision time. This generated site ships
// against the shared Kodagen DB2, where those packages are not vendored, so we
// provide a typed stub that keeps the admin code type-checking and degrades
// gracefully (list calls return []) until the real engine package is linked.

// The awaited result must behave both as an array (so `.map`/`.find` callbacks
// receive a typed `any` element instead of an implicit-any error) and as an
// object (so single-record engine calls can read properties).
type AnyResult = any[] & Record<string, any>;
type ServiceFn = (...args: any[]) => Promise<AnyResult>;

export const services: Record<string, ServiceFn> = new Proxy(
  {},
  {
    get() {
      return async () => [] as unknown as AnyResult;
    },
  },
) as Record<string, ServiceFn>;
