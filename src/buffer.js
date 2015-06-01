var Buffer = (function () {
    function Buffer() {

        this.buffer = null;

        function init(v, enc) {
            if (v) {
                if (typeof v == "number")
                    this.buffer = new Uint8Array(v);
                else if (Array.isArray(v)) {
                    this.buffer = new Uint8Array(v);
                }
                else if (typeof v == "string") {
                    if (!enc) enc = "utf8";
                    if (!string.hasOwnProperty(enc))
                        throw new Error("Unknown encoding type (" + enc + ")");
                    this.buffer = string[enc].from(v);
                }
                else if (v instanceof Buffer) {

                }
                else
                    throw new TypeError("Wrong type of parameter 1");
            }
        }

        this.toString = function () {
        }

        init.apply(this, arguments)
        return this.buffer;
    }

    var string = {
        binary: {
            to: function (b) {
                var str = "";
                for (var i in b) {
                    str += String.fromCharCode(b[i]);
                }
                return str;
            },
            from: function (s) {
                b = new Uint8Array(s.length)
                for (var i = 0; i < s.length; i++) {
                    var code = s.charCodeAt(i);
                    if (code > 255)
                        throw new TypeError("String is not binary (at index " + i + ")");
                    b[i] = code;
                }
                return b;
            }
        },
        utf8: {
            to: function (b) {
                var s = string.binary.to(b);
                return decodeURIComponent(escape(s))
            },
            from: function (s) {
                return string.binary.from(unescape(encodeURIComponent(s)));
            }
        },
        base64: {
            to: function (b) {
                var s = string.binary.to(b);
                return btoa(s);
            },
            from: function (s) {
                return string.binary.from(atob(s));
            }
        }
    }

    Uint8Array.prototype.toString = function (encoding, start, end) {
        if (!encoding) encoding = "utf8";
        if (!start) start = 0;
        if (!end) end = this.length;

        if (!string.hasOwnProperty(encoding))
            throw new Error("Unknown encoding type (" + encoding + ")");
        return string[encoding].to(this);
    }

    return Buffer;
})();