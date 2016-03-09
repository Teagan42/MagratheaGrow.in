CryptoJS = CryptoJS || function(a, f) {
    var e = {},
        b = e.lib = {},
        d = function() {},
        h = b.Base = {
            extend: function(a) {
                d.prototype = this;
                var c = new d;
                a && c.mixIn(a);
                c.$super = this;
                return c
            },
            create: function() {
                var a = this.extend();
                a.init.apply(a, arguments);
                return a
            },
            init: function() {},
            mixIn: function(a) {
                for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
                a.hasOwnProperty("toString") && (this.toString = a.toString)
            },
            clone: function() {
                return this.$super.extend(this)
            }
        },
        l = b.WordArray = h.extend({
            init: function(a, c) {
                a = this.words = a || [];
                this.sigBytes =
                    c != f ? c : 4 * a.length
            },
            toString: function(a) {
                return (a || g).stringify(this)
            },
            concat: function(a) {
                var c = this.words,
                    b = a.words,
                    d = this.sigBytes,
                    a = a.sigBytes;
                this.clamp();
                if (d % 4)
                    for (var e = 0; e < a; e++) c[d + e >>> 2] |= (b[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 24 - 8 * ((d + e) % 4);
                else if (65535 < b.length)
                    for (e = 0; e < a; e += 4) c[d + e >>> 2] = b[e >>> 2];
                else c.push.apply(c, b);
                this.sigBytes += a;
                return this
            },
            clamp: function() {
                var c = this.words,
                    b = this.sigBytes;
                c[b >>> 2] &= 4294967295 << 32 - 8 * (b % 4);
                c.length = a.ceil(b / 4)
            },
            clone: function() {
                var a = h.clone.call(this);
                a.words = this.words.slice(0);
                return a
            },
            random: function(c) {
                for (var b = [], d = 0; d < c; d += 4) b.push(4294967296 * a.random() | 0);
                return l.create(b, c)
            }
        }),
        c = e.enc = {},
        g = c.Hex = {
            stringify: function(a) {
                for (var c = a.words, a = a.sigBytes, b = [], d = 0; d < a; d++) {
                    var e = c[d >>> 2] >>> 24 - 8 * (d % 4) & 255;
                    b.push((e >>> 4).toString(16));
                    b.push((e & 15).toString(16))
                }
                return b.join("")
            },
            parse: function(a) {
                for (var c = a.length, b = [], d = 0; d < c; d += 2) b[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
                return l.create(b, c / 2)
            }
        },
        q = c.Latin1 = {
            stringify: function(a) {
                for (var c =
                        a.words, a = a.sigBytes, b = [], d = 0; d < a; d++) b.push(String.fromCharCode(c[d >>> 2] >>> 24 - 8 * (d % 4) & 255));
                return b.join("")
            },
            parse: function(a) {
                for (var c = a.length, b = [], d = 0; d < c; d++) b[d >>> 2] |= (a.charCodeAt(d) & 255) << 24 - 8 * (d % 4);
                return l.create(b, c)
            }
        },
        r = c.Utf8 = {
            stringify: function(a) {
                try {
                    return decodeURIComponent(escape(q.stringify(a)))
                } catch (c) {
                    throw Error("Malformed UTF-8 data");
                }
            },
            parse: function(a) {
                return q.parse(unescape(encodeURIComponent(a)))
            }
        },
        s = b.BufferedBlockAlgorithm = h.extend({
            reset: function() {
                this._data = l.create();
                this._nDataBytes = 0
            },
            _append: function(a) {
                "string" == typeof a && (a = r.parse(a));
                this._data.concat(a);
                this._nDataBytes += a.sigBytes
            },
            _process: function(c) {
                var b = this._data,
                    d = b.words,
                    e = b.sigBytes,
                    g = this.blockSize,
                    h = e / (4 * g),
                    h = c ? a.ceil(h) : a.max((h | 0) - this._minBufferSize, 0),
                    c = h * g,
                    e = a.min(4 * c, e);
                if (c) {
                    for (var f = 0; f < c; f += g) this._doProcessBlock(d, f);
                    f = d.splice(0, c);
                    b.sigBytes -= e
                }
                return l.create(f, e)
            },
            clone: function() {
                var a = h.clone.call(this);
                a._data = this._data.clone();
                return a
            },
            _minBufferSize: 0
        });
    b.Hasher = s.extend({
        init: function() {
            this.reset()
        },
        reset: function() {
            s.reset.call(this);
            this._doReset()
        },
        update: function(a) {
            this._append(a);
            this._process();
            return this
        },
        finalize: function(a) {
            a && this._append(a);
            this._doFinalize();
            return this._hash
        },
        clone: function() {
            var a = s.clone.call(this);
            a._hash = this._hash.clone();
            return a
        },
        blockSize: 16,
        _createHelper: function(a) {
            return function(c, b) {
                return a.create(b).finalize(c)
            }
        },
        _createHmacHelper: function(a) {
            return function(c, b) {
                return t.HMAC.create(a, b).finalize(c)
            }
        }
    });
    var t = e.algo = {};
    return e
}(Math);