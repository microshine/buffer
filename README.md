#Buffer
JavaScript Buffer like [Node.JS buffer](https://nodejs.org/api/buffer.html). `Buffer` class extends `Uint8Array`.

###new Buffer(size)
`Number` **size**

When called with a length argument, a buffer containing length zeroes is created.

### new Buffer(array)
`TypedArray` **array**

When called with a `array` argument, which can be an object of any of the typed array types (such as Int32Array), the `array` gets copied into a new typed array. Each value in `array` is converted to the corresponding type of the constructor before being copied into the new array.

### new Buffer(str[, encoding])
`String` **str** - string to encode.
`String` **encoding** - encoding to use, *Optional*.

Allocates a new buffer containing the given str. encoding defaults to `utf8`.

### static Buffer.isBuffer(obj)
`Buffer` obj
Return `Boolean`

Returns true if `obj` is instance of `Buffer`.

### static Buffer.byteLength(str[, encoding])
`String` **str** - string to encode.
`String` **encoding** - encoding to use, *Optional*.
Return `Number`

Gives the actual byte length of a string. encoding defaults to `utf8`. This is not the same as `String.prototype.length` since that returns the number of characters in a string.

### static Buffer.concat(list[, totalLength])
`Array` | `Buffer` **list** - Array List of `Buffer` objects to concat
`Number` **totalLength** - Number Total length of the buffers when concatenated

Returns a new buffer which is the result of concatenating all the buffers in the list together.

If **totalLength** is not provided, it is read from the buffers in the list. However, this adds an additional loop to the function, so it is faster to provide the length explicitly.

### Buffer.compare(otherBuffer)
`Buffer` **otherBuffer**

Returns a `Number` indicating whether this comes before or after or is the same as the **otherBuffer** in sort order.

If **otherBuffer** is not `Buffer` then `TypeError` exception is thrown.

###static Buffer.compare(buf1, buf2)
`Buffer` **buf1**
`Buffer` **buf2**

The same as `Buffer.compare(otherBuffer)`. Useful for sorting an Array of Buffers:

If **buf1** or **buf2** are not `Buffer` then `TypeError` exception is thrown.

###Buffer.length
Gets the number of elements contained in the `Buffer` instance.

###Buffer.toString([encoding[, start[, end]]])
Decodes and returns a `String` from buffer data encoded using the specified character set encoding. If **encoding** is undefined or null, then encoding defaults to `utf8`. The **start** and **end** parameters default to 0 and `buffer.length` when `undefined`.

Example:
```
var buf = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
    buf[i] = i + 97; // 97 is ASCII a
}
buf.toString('ascii'); // outputs: abcdefghijklmnopqrstuvwxyz
buf.toString('ascii', 0, 5); // outputs: abcde
buf.toString('utf8', 0, 5); // outputs: abcde
buf.toString(undefined, 0, 5); // encoding defaults to 'utf8', outputs abcde
```

###Buffer.toJSON()
Returns a JSON-representation of the Buffer instance. JSON.stringify implicitly calls this function when stringifying a Buffer instance.

Example:
```
var buf = new Buffer('test');
var json = JSON.stringify(buf);

console.log(json);
// '{"type":"Buffer","data":[116,101,115,116]}'

var copy = JSON.parse(json, function(key, value) {
    return value && value.type === 'Buffer'
      ? new Buffer(value.data)
      : value;
  });

console.log(copy);
// <Buffer 116 101 115 116>
```

###Buffer[index]
`Number` **index** - the zero-based index of the element to get or set. 

Gets or sets the element at the specified index. The values refer to individual bytes, so the legal range is between 0x00 and 0xFF hex or 0 and 255.

###Buffer.equals(otherBuffer)
`Buffer` **otherBuffer**

Returns a `Boolean` of whether this and **otherBuffer** have the same bytes.

###Buffer.slice([start[, end]])
`Number` **start** *Optional*, *Default: 0*
`Number` **end** *Optional*, *Default: Buffer.length*

Returns a new buffer sliced from the **start** to the **end**.

###Buffer.reduce(callback[, initValue])
`Function` **callback**
Function to execute on each value in the array, taking four arguments:

- **previousValue**
The value previously returned in the last invocation of the callback, or initialValue, if supplied. (See below.)
- **currentValue**
The current element being processed in the array.
- **index**
The index of the current element being processed in the array.
- **array**
The array reduce was called upon.

`Variant` **initValue**
Object to use as the first argument to the first call of the callback. *Optional*

Applies a function against an accumulator and each value of the array (from left-to-right) has to reduce it to a single value.

###Buffer.forEach(callback[, thisArg])
Executes a provided function once per array element.

`Function` **callback**
Function to execute for each element, taking three arguments:

- **currentValue**
The current element being processed in the array.
- **index**
The index of the current element being processed in the array.
- **array**
The array reduce was called upon.

`Variant` **thisArg**
Value to use as this when executing callback. *Optional*

If a **thisArg** parameter is provided to `forEach()`, it will be passed to callback when invoked, for use as its this value.  Otherwise, the value `currentValue` will be passed for use as its this value.

###Buffer.every(callback[, thisArg])
Method tests whether all elements in the array pass the test implemented by the provided function.

`Function` **callback**
Function to execute for each element, taking two arguments:

- **currentValue**
The current element being processed in the array.
- **index**
The index of the current element being processed in the array.
- **array**
The array reduce was called upon.

`Variant` **thisArg**
Value to use as this when executing callback. *Optional*

```
var buf = new Buffer('test'); //Buffer [116, 101, 115, 116]
var res = buf.every(function (v,i,array) {
    if (this > 200)
        return true;
});
console.log(res); //false
```

###Buffer.some(callback[, thisArg])
Method tests whether some element in the array passes the test implemented by the provided function.

`Function` **callback**
Function to execute for each element, taking two arguments:

- **currentValue**
The current element being processed in the array.
- **index**
The index of the current element being processed in the array.
- **array**
The array reduce was called upon.

`Variant` **thisArg**
Value to use as this when executing callback. *Optional*

Example:
```
var buf = new Buffer('test'); //Buffer [116, 101, 115, 116]
var res = buf.some(function (v,i,array) {
    if (this < 110)
        return true;
});
console.log(res); //true
```