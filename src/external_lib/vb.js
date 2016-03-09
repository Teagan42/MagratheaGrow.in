vb = {
    Base: 10,
    PowMod: function(e,
        f, l) {
        var e = d(e, this.Base),
            f = d(f, this.Base),
            l = d(l, this.Base),
            s = e,
            e = l.length,
            e = b(0, (s.length > e ? s.length : e) * D, 0);
        q(e, s);
        var f = B(f, 2),
            l = B(l, 2),
            t, x;
        Ma.length != l.length && (Ma = g(l));
        if (0 == (l[0] & 1)) {
            q(Ma, e);
            for (r(e, 1); !h(f, 0);) {
                f[0] & 1 && C(e, Ma, l);
                u(f, 2);
                s = Ma;
                x = l;
                var I = void 0,
                    O = void 0,
                    S = void 0,
                    I = t = void 0;
                for (t = s.length; 0 < t && !s[t - 1]; t--);
                I = t > x.length ? 2 * t : 2 * x.length;
                N.length != I && (N = Array(I));
                r(N, 0);
                for (I = 0; I < t; I++) {
                    S = N[2 * I] + s[I] * s[I];
                    N[2 * I] = S & E;
                    S >>= D;
                    for (O = I + 1; O < t; O++) S = N[I + O] + 2 * s[I] * s[O] + S, N[I + O] = S & E, S >>= D;
                    N[I +
                        t] = S
                }
                v(N, x);
                q(s, N)
            }
        } else {
            r(Ma, 0);
            for (s = l.length; 0 < s && !l[s - 1]; s--);
            x = H;
            I = 0;
            for (t = l.length - 1; 0 <= t; t--) I = (I * H + l[t]) % H;
            x -= a(I, H);
            Ma[s] = 1;
            C(e, Ma, l);
            Y.length != e.length ? Y = g(e) : q(Y, e);
            for (s = f.length - 1; 0 < s & !f[s]; s--);
            if (0 == f[s]) r(e, 1);
            else {
                for (t = 1 << D - 1; t && !(f[s] & t); t >>= 1);
                for (;;) {
                    if (!(t >>= 1)) {
                        s--;
                        if (0 > s) {
                            y(e, Z, l, x);
                            break
                        }
                        t = 1 << D - 1
                    }
                    y(e, e, l, x);
                    t & f[s] && y(e, Y, l, x)
                }
            }
        }
        e = B(e, 1);
        return e = c(e, this.Base)
    },
    RandomInt: function(a) {
        var d;
        d = b(0, 0, Math.floor((a - 1) / D) + 2);
        var e, g;
        for (e = 0; e < d.length; e++) d[e] = 0;
        g = Math.floor((a -
            1) / D) + 1;
        for (e = 0; e < g; e++) d[e] = Math.floor(Math.random() * (1 << D - 1));
        d[g - 1] &= (2 << (a - 1) % D) - 1;
        return c(d, this.Base)
    }
};