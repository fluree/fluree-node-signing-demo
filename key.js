#!/usr/bin/env node

import { generateKeyPair, getSinFromPublicKey } from "@fluree/crypto-utils";

const {privateKey, publicKey} = generateKeyPair();
const authId = getSinFromPublicKey(publicKey);
console.log(privateKey)
console.log(authId)
