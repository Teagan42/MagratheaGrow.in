codec = {
    magic: "codec",
    str_2_b64: h,
    str_2_uri_param: l,
    uri_param_2_str: c,
    uri_2_obj: function(a) {
        var b = {},
            d, e, g, f, h, l, q = a.length,
            r = 0 < q && "-" == a.charAt(0) ? "-" : "=",
            v = "-" == r ? "-" : "&",
            u = "-" == v ? "_" : "%";
        for (l = 1; l < q; ++l) {
            for (e = l; l < q && r != (d = a.charAt(l)) && d != v; ++l);
            f = l - e;
            for (g = l += l < q && r == d ? 1 : 0; l < q && v != a.charAt(l); ++l);
            h = l - g;
            0 < f && 0 < h && (b[a.substr(e, f)] = c(a.substr(g, h), u))
        }
        return b
    },
    obj_2_url: g,
    json_txt_2_url: function(a, c) {
        var b = a.indexOf("("),
            d = a.lastIndexOf(")");
        0 < b && d > b && (a = a.substring(b + 1, d));
        return g(f(a), c)
    },
    obj_2_form: q,
    json_txt_2_form: function(a, c) {
        var b = a.indexOf("("),
            d = a.lastIndexOf(")");
        0 < b && d > b && (a = a.substring(b + 1, d));
        return q(f(a), c)
    },
    obj_2_str: r,
    str_2_html: function(a) {
        for (var c = 0; c < y.length; ++c) a = a.replace(RegExp(y[c][0], "g"), y[c][1]);
        return a
    },
    html_2_str: function(a) {
        for (var c = y.length - 1; 0 <= c; --c) a =
            a.replace(RegExp(y[c][1], "g"), y[c][0]);
        return a
    },
    ubb_2_html: function(a) {
        for (var c, b = D.length; 0 <= b; --b) c = D[b], a = a.replace(c.s, c.d);
        return a
    },
    hex_2_uri_param: function(a) {
        var c, b = "";
        for (c = 0; c < a.length; ++c) b += (0 == (1 & c) ? "%" : "") + a.charAt(c);
        return b
    },
    nid: function(a, c, b, e, g, f, l, q) {
        a = d(a);
        c = c ? d(c) : "";
        e = e ? d(e) : "";
        f = f ? d("0x" + l[q](f)) : "";
        g = (a ? t(64 + a.length) + a : "") + (c ? t(96 + c.length) + c : "") + (e ? t(128 + e.length) + e : "") + (g ? t(160 + g.length) + g : "");
        b = g + (b ? t(0 + b.length) + b : "") + (f ? t(0 + f.length) + f : "");
        s_md5 = d("0x" + l[q](b));
        return h(t(32 + s_md5.length) + s_md5 + g, 1)
    }
};