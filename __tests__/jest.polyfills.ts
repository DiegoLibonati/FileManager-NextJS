import * as NodeBuffer from "node:buffer";
import * as NodeStreamWeb from "node:stream/web";
import * as NodeUtil from "node:util";
import * as NodeWorkerThreads from "node:worker_threads";

Object.defineProperties(globalThis, {
  TextDecoder: {
    value: NodeUtil.TextDecoder,
    writable: true,
    configurable: true,
  },
  TextEncoder: {
    value: NodeUtil.TextEncoder,
    writable: true,
    configurable: true,
  },
  ReadableStream: {
    value: NodeStreamWeb.ReadableStream,
    writable: true,
    configurable: true,
  },
  WritableStream: {
    value: NodeStreamWeb.WritableStream,
    writable: true,
    configurable: true,
  },
  TransformStream: {
    value: NodeStreamWeb.TransformStream,
    writable: true,
    configurable: true,
  },
  MessagePort: {
    value: NodeWorkerThreads.MessagePort,
    writable: true,
    configurable: true,
  },
  MessageChannel: {
    value: NodeWorkerThreads.MessageChannel,
    writable: true,
    configurable: true,
  },
  BroadcastChannel: {
    value: NodeWorkerThreads.BroadcastChannel,
    writable: true,
    configurable: true,
  },
  Blob: { value: NodeBuffer.Blob, writable: true, configurable: true },
  File: { value: NodeBuffer.File, writable: true, configurable: true },
});
