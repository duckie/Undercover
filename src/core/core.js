var UndercoverEngine = {};

UndercoverEngine.author = "Jean-Bernard Jansen";
UndercoverEngine.version = 1;
UndercoverEngine.revision = "0.1";

// Exception
UndercoverEngine.AssertException = function(message) { this.message = message; }

UndercoverEngine.AssertException.prototype.toString = function () {
  return 'Undercover exception: ' + this.message;
}

function assert(exp, message) {
  if (!exp) {
    throw new AssertException(message);
  }
}