# OnError Callback Library For Typescript

## Introduction

This TypeScript library provides the type signature for an `OnError()` callback function.

Use this to delegate error handling to the code that is calling your library.

## Quick Start

```
# run this from your Terminal
npm install @ganbarodigital/ts-on-error
```

```typescript
// add this import to your Typescript code
import { OnError } from "@ganbarodigital/ts-on-error/V1"
```

__VS Code users:__ once you've added a single import anywhere in your project, you'll then be able to auto-import anything else that this library exports.

## V1 API

### OnError()

```typescript
export type OnError<E = object, T = never> = (reason: symbol, description: string, extra: E) => T;
```

`OnError()` is a _function type_. It provides a standard function signature to use in error callbacks.

For example:

```typescript
export const corruptState = Symbol("CORRUPT STATE");

export function doWork(input: object, onError: OnError<object, object>) {
    // a made-up problem
    if (input.property1 === undefined) {
        // tell the error handler what went wrong
        // and give it an opportunity to fix things too
        input = onError(corruptState, "'property1' is missing", input);
    }
}
```

The idea here is to make it easier to reuse code, by splitting up the error checking and the error handling:

* your library code is responsible for the error checking
* whoever is calling your library code is responsible for the error handling

`OnError()` takes three parameters:

* `reason: symbol` is the type of error that has occurred. The calling code will use this to work out what to do with the error.
* `description: string` is a human-readable explanation of the error. This should be suitable for adding to a log file.
* `extra: E` is a data bag, containing any extra information relevant to the error. By default, it is an object. We've made it a generic type, so that you can override its type and avoid using type-guards at runtime.

By default, an `OnError()` handler does not return. It should `throw` an `Error` of some kind.

If it's possible for the error handler to recover from the error, you can change the return type from `never` to whatever suits.

## NPM Scripts

### npm run clean

Use `npm run clean` to delete all of the compiled code.

### npm run build

Use `npm run build` to compile the Typescript into plain Javascript. The compiled code is placed into the `lib/` folder.

`npm run build` does not compile the unit test code.

### npm run test

Use `npm run test` to compile and run the unit tests. The compiled code is placed into the `lib/` folder.

### npm run cover

Use `npm run cover` to compile the unit tests, run them, and see code coverage metrics.

Metrics are written to the terminal, and are also published as HTML into the `coverage/` folder.