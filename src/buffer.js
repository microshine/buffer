var Buffer = (function () {
    //helpers begin
    function isNull(v) {
        return v === null;
    }

    function isUndefined(v) {
        return v === undefined;
    }

    function isEmpty(v) {
        return isUndefined(v) || isNull(v);
    }

    function isString(v) {
        return isNaN(v)
    }

    function isNumber(v) {
        return !isNaN(v)
    }

    function isArray(v) {
        return Array.isArray(v)
    }
    //helpers end

    function Buffer() {

        var buffer = null;

        function init(v, enc) {
            if (v) {
                if (typeof v == "number")
                    //Number
                    buffer = new Uint8Array(v);
                else if (Array.isArray(v)) {
                    //Array
                    buffer = new Uint8Array(v);
                }
                else if (typeof v == "string") {
                    //String
                    if (!enc) enc = "utf8"; //default utf8
                    if (!string.hasOwnProperty(enc))
                        throw new Error("Unknown encoding type (" + enc + ")");
                    buffer = string[enc].from(v);
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
        return buffer;
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
                var b = new Uint8Array(s.length);
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

    string.ascii = string.binary;

    Uint8Array.prototype.toString = function (encoding, start, end) {
        if (!encoding) encoding = "utf8";
        if (!start) start = 0;
        if (!end) end = this.length;

        if (!string.hasOwnProperty(encoding))
            throw new Error("Unknown encoding type (" + encoding + ")");
        var n = this;
        if (!(isEmpty(start) && isEmpty(end)))
            n = this.slice(start, end);
        return string[encoding].to(n);
    }

    Uint8Array.prototype.slice = function (start, end) {
        if (isEmpty(start)) start = 0;
        if (isEmpty(end)) end = this.length;

        var size = end - start;
        var n = new Buffer(size)

        for (var i = start; i < end || i < this.length; i++) {
            n[i] = this[i];
        }
        return n;
    }

    Uint8Array.prototype.toJSON = function () {
        var obj = {
            type: "Buffer",
            data: []
        }
        for (var i = 0; i < this.length; i++)
            obj.data.push(this[i]);
        return obj;
    }

    Uint8Array.prototype.fill = function (value, offset, end) {
        if (isEmpty(offset) || offset < 0) offset = 0;
        if (isEmpty(end) || end < 0) end = this.length;

        if (isString(value) && value.length == 1)
            value = value.charCodeAt(i);
        else if (isNumber(value)) { }
        else
            throw new TypeError("Parameter 1 has wron value.");

        for (var i = offset; i < end || i < this.length; i++)
            this[i] = value;

        return this;
    }

    Uint8Array.prototype.equals = function (otherBuffer) {
        if (isEmpty(otherBuffer))
            throw new TypeError('Parameter 1 can not be Empty');
        if (this.length !== otherBuffer.length)
            return false;
        for (var i = 0; i < this.length; i++)
            if (this[i] !== otherBuffer[i])
                return false;
        return true;
    }

    Uint8Array.prototype.compare = function (otherBuffer) {
        if (isEmpty(otherBuffer))
            throw new TypeError('Parameter 1 can not be Empty');
        for (var i = 0; i < this.length; i++)
            if (this[i] !== otherBuffer[i])
                if (this[i] < otherBuffer[i])
                    return -1;
                else
                    return 1;
        if (i < otherBuffer.length)
            return -1;
        return 0;
    }

    Buffer.isBuffer = function (obj) {
        return (b instanceof Uint8Array);
    }

    Buffer.byteLength = function (string, encoding) {
        if (!isString(string))
            throw new TypeError("Parameter 1 must be String");
        var b = new Buffer(string, encoding);
        return b.length;
    }

    Buffer.concat = function (list, totalLength) {
        if (isEmpty(list)) throw new TypeError("Parameter 1 can not be Empty");
        if (!isArray(list))
            list = [list];
        if (list.length == 0) return new Buffer(0);
        //check buffers
        for (var i in list) {
            if (!Buffer.isBuffer(list[i]))
                throw new TypeError("Parameter 1 is not Buffer");
        }
        //create new Buffer    
        if (isEmpty(totalLength) || !isNumber(totalLength)) {
            totalLength = 0;
            for (var i in list) {
                totalLength += list[i].length;
            }
        }
        var res = new Buffer(totalLength);
        var k = 0;
        for (var i in list) {
            var it = list[i];
            for (var j = 0; j < it.length; j++) {
                res[k++] = it[j];
                if (k > totalLength)
                    return res;
            }
        }
        return res;
    }

    return Buffer;
})();