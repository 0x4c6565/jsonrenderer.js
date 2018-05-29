# jsonrenderer.js
A JavaScript library for rendering JSON objects as HTML. Requires jQuery.

## Usage

```js
var rendered = JsonRenderer.render({
  "array1": [
    1,
    2,
    3
  ],
  "boolean": true,
  "null": null,
  "number": 123,
  "object": {
    "a": "b",
    "c": "d",
    "e": "f"
  },
  "array2": [
    {
      "a": 123
    },
    {
      "b": false
    }
  ],
  "string": "Hello World"
});

$('#rendered').append(rendered);
```

## Demo

http://jsonrenderer.lee.io/
