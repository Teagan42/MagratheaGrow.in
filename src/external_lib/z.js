z.send_msg = function(b, c, d, f) {
    "mmq_pick" != b && D.create(b);
    rpc.call({
        srv: a.location.protocol + "//" + f.ip + "/",
        to: f.to,
        type: b,
        data: c,
        ref: f,
        "static": !1,
        way: "json",
        qid: null == f.qid ? null : f.qid,
        on_ack: function(a, f) {
            "mmq_pick" != b && D.destroy(b);
            if (a && a.data && a.data.Result && a.data.Result.SubCode && "mmq_pick" != b) {
                if ("InvalidSession" == a.data.Result.Reason || "accounts.sid.invalid" ==
                    a.data.Result.SubCode || "accounts.nid.invalid" == a.data.Result.SubCode || "accounts.lid.invalid" == a.data.Result.SubCode || "ccms.session.invalid" == a.data.Result.SubCode) "" > a.from_handle ? (c.Session && (c.Session = {
                    Nid: acs.create_nid(acs.ctrl({
                        type: "get_info"
                    }))
                }), c.Nid && (c.Nid = acs.create_nid(acs.ctrl({
                    type: "get_info"
                }))), acs.send_msg(b, c, d, f)) : 5 < e(new Date) - O ? ("cacs_login_req" != b && ("cacs_dh_req" != b && "mmq_pick" != b && "CcmSubscribeRequest" != b) && (F = {
                        type: b,
                        data: c,
                        on_ack: d,
                        ref: f,
                        send_msg: 1
                    }), ms.ctrl({
                        type: "mmq_destroy"
                    }),
                    setTimeout(function() {
                        r(H)
                    }, 1E3)) : 5 > e(new Date) - O && setTimeout(function() {
                    "cacs_login_req" != b && ("cacs_dh_req" != b && "mmq_pick" != b && "CcmSubscribeRequest" != b) && (F = {
                        type: b,
                        data: c,
                        on_ack: d,
                        ref: f,
                        send_msg: 1
                    });
                    ms.ctrl({
                        type: "mmq_destroy"
                    });
                    setTimeout(function() {
                        r(H)
                    }, 1E3)
                }, parseInt(3E4 * Math.random() + 3E4));
                if ("permission.denied" == a.data.Result.SubCode && "CcmDiskCtrlRequest" != b) return m.system_prompt_box(Vc, 240, -200), -1
            }
            a && (a.data && ("permission.denied" == a.data.result || "permission.denied" == a.data.Result)) && m.system_prompt_box(Vc);
            "object" == typeof a ? ("cacs_login_req" == b && (O = e(new Date)), 0 == v(a.type, a.data) && d(a.type, a.data, f)) : "cancel" != a && 0 == v(a.type, a.data) && d(a, a, f)
        }
    })
};

z.create_nid = function(a) {
    ++a.seq;
    return codec.nid(a.seq, a.sid, a.share_key, 0, null, null, md5_ex, "hex")
};

z.create_nid_base_lid = function(a) {
    ++a.seq;
    return codec.nid(a.seq, a.lid, a.share_key, 2, null, null, md5_ex, "hex")
};