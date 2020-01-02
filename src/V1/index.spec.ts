//
// Copyright (c) 2020-present Ganbaro Digital Ltd
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
//
//   * Re-distributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//
//   * Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in
//     the documentation and/or other materials provided with the
//     distribution.
//
//   * Neither the names of the copyright holders nor the names of his
//     contributors may be used to endorse or promote products derived
//     from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
// FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
// INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
// LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
// ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//
import { OnError } from ".";

describe("OnError", () => {
    it("accepts a symbol as the first param", () => {
        const testFunc: OnError<object, symbol> = (reason, description, extra) => {
            return reason;
        };

        const inputValue = Symbol("TEST");
        const actualValue = testFunc(inputValue, "hello", {});

        expect(actualValue).toBe(inputValue);
    });

    it("accepts a description as the second param", () => {
        const testFunc: OnError<object, string> = ( reason, description, extra) => {
            return description;
        };

        const inputValue = "this is a reason";
        const actualValue = testFunc(Symbol("IGNORE"), inputValue, {});

        expect(actualValue).toBe(inputValue);
    });

    it("accepts an object as the third param", () => {
        const testFunc: OnError<object, object> = ( reason, description, extra) => {
            return extra;
        };

        const inputValue = {
            extra: "data",
        };
        const actualValue = testFunc(Symbol("IGNORE"), "hello", inputValue);

        expect(actualValue).toBe(inputValue);
    });

    it("does not return by default", () => {
        const testFunc: OnError = ( reason, description, extra) => {
            throw new Error("we never return!");
        };

        expect(() => {testFunc(Symbol("IGNORE"), "", {}); }).toThrow();
    });

});
