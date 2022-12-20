// httpsRequest.js
// This module is an https request wrapped in a promise design to be used
// to interact with the ICON Blockchain
//
// Imports
import SDK from "@espanicon/espanicon-sdk";

const foo = new SDK();
export const customRequest = foo.queryMethod;
// export = customRequest;
