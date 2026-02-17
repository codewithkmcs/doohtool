const crypto = require('crypto');

// Patch the crypto module itself because Vite might be importing it directly
if (!crypto.getRandomValues) {
    // Node 15+ has webcrypto
    if (crypto.webcrypto && crypto.webcrypto.getRandomValues) {
        crypto.getRandomValues = crypto.webcrypto.getRandomValues.bind(crypto.webcrypto);
    } else {
        // Manual polyfill
        crypto.getRandomValues = (arr) => {
            if (!arr) return arr;
            const bytes = crypto.randomBytes(arr.length);
            arr.set(bytes);
            return arr;
        };
    }
}

// Also patch globalThis.crypto
if (!globalThis.crypto) {
    globalThis.crypto = crypto;
} else {
    if (!globalThis.crypto.getRandomValues) {
        globalThis.crypto.getRandomValues = crypto.getRandomValues;
    }
}
