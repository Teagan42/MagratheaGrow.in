dh = {
    prime: "791658605174853458830696113306796803",
    g: "5",
    gen_private: function() {
        return vb.RandomInt(64)
    },
    gen_public: function(a) {
        return vb.PowMod("5", a, "791658605174853458830696113306796803")
    },
    gen_shared_secret: function(a, c) {
        return vb.PowMod(c, a, "791658605174853458830696113306796803")
    }
};
