import * as Undici from "undici";

Object.defineProperties(globalThis, {
  fetch: { value: Undici.fetch, writable: true, configurable: true },
  FormData: { value: Undici.FormData, writable: true, configurable: true },
  Headers: { value: Undici.Headers, writable: true, configurable: true },
  Request: { value: Undici.Request, writable: true, configurable: true },
  Response: { value: Undici.Response, writable: true, configurable: true },
});
