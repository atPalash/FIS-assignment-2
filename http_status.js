// HTTP constants taken from android docs and RFC 2616.

module.exports = {

// Informational 1xx

  HTTP_CONTINUE: 100,
  HTTP_SWITCH_PROTOCOLS: 101,

// Successful 2xx

  HTTP_OK: 200,                 // OK
  HTTP_CREATED: 201,            // Created
  HTTP_ACCEPTED: 202,           // Accepted
  HTTP_NOT_AUTHORITATIVE: 203,  // Not authoritative
  HTTP_NO_CONTENT: 204,         // No content
  HTTP_RESET: 205,              // Reset
  HTTP_PARTIAL: 206,            // Partial

// Redirection 3xx

  HTTP_MULT_CHOICE: 300,        // Multiple choices
  HTTP_MOVED_PERM: 301,         // Moved permanently
  HTTP_MOVED_TEMP: 302,         // Moved temporarily
  HTTP_SEE_OTHER: 303,          // See other
  HTTP_NOT_MODIFIED: 304,       // Not modified
  HTTP_USE_PROXY: 305,          // Use proxy
  HTTP_TEMP_REDIRECT: 307,      // Temporary redirection

// Client error 4xx

  HTTP_BAD_REQUEST: 400,        // Bad Request
  HTTP_UNAUTHORIZED: 401,       // Unauthorized
  HTTP_PAYMENT_REQUIRED: 402,   // Payment required
  HTTP_FORBIDDEN: 403,          // Forbidden
  HTTP_NOT_FOUND: 404,          // Not found
  HTTP_BAD_METHOD: 405,         // Bad Method
  HTTP_NOT_ACCEPTABLE: 406,     // Not acceptable
  HTTP_PROXY_AUTH: 407,         // Proxy authentication required
  HTTP_CLIENT_TIMEOUT: 408,     // Client Timeout
  HTTP_CONFLICT: 409,           // Conflict
  HTTP_GONE: 410,               // Gone
  HTTP_LENGTH_REQUIRED: 411,    // Length required
  HTTP_PRECON_FAILED: 412,      // Precondition failed
  HTTP_ENTITY_TOO_LARGE: 413,   // Entity too large
  HTTP_REQ_TOO_LONG: 414,       // Request too long
  HTTP_UNSUPPORTED_TYPE: 415,   // Unsupported type

// Server Error 5xx

  HTTP_INTERNAL_ERROR: 500,     // Internal error
  HTTP_NOT_IMPLEMENTED: 501,    // Not implemented
  HTTP_BAD_GATEWAY: 502,        // Bad Gateway
  HTTP_UNAVAILABLE: 503,        // Unavailable
  HTTP_GATEWAY_TIMEOUT: 504,    // Gateway timeout
  HTTP_VERSION: 505             // Version not supported

};
