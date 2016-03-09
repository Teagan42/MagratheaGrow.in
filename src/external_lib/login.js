/* LOGIN */

// a="cacs_dh_ack" 
/* c={
    "key_b2a": "691383002184463697512032428860961048",
    "lid": "0x10301b",
    "result": "",
    "tid": "0x15c9a468"
}*/
/* e={
    "flag": 0,
    "ip": "us.mipcm.com:7443",
    "secret_key": "9616139599004509966",
    "to": "ccm",
    "user": "Teagan42"
}*/

a = dh.gen_shared_secret(e.secret_key, c.key_b2a);
local_storage.set(y.cacs_tid_str, c.tid);
A.tid = c.tid;
A.lid = c.lid;
A.share_key = a;
var g = CryptoJS.MD5(C),
    h = local_storage.get("remember_msg_info");
h && (h = eval("(" + h + ")"), h.pass == C && (g = CryptoJS.enc.Hex.parse(h.pass)));
h = f(g, a);
z.send_msg("cacs_login_req", {
        lid: c.lid,
        Nid: acs.create_nid_base_lid(acs.ctrl({
            type: "get_info"
        })),
        user: e.user,
        pass: h,
        session_req: 1,
        param: [{
            name: "appid",
            value: m.hostname
        }]
    }, function(a, b, c) {
        q(a, b, c) /* CALL BACK */
    }, {
        ip: e.ip,
        user: e.user,
        lid_relate: {
            lid: c.lid,
            share_key: a
        },
        pass: g.toString(),
        remember: e.flag,
        to: "ccm"
    }
);


/* EXAMPLE INPUTS */
// a = "cacs_login_ack"
/* b = {
    addr: "71.229.177.75",
    guest: 0,
    result: "",
    seq: 9768,
    sid: "0x90d89"
}*/
/* c = {
    ip: "us.mipcm.com:7443",
    lid_relate: {
        lid: "0x1079e3"
        share_key: "3543072622226693604479375249974363"
    },
    pass: "ed5e9c91ff9acf087ffe1602603a0e01",
    remember: 0,
    to: "ccm",
    user: "Teagan42"
}*/
function q(a, b, c) {
    if ("" == b.result) Qa.activation ? (Qa.activation = !1, t({
            str: Hg,
            callback_func: function() {
                Qa.r = "";
                m.login_waiting_flag = 1;
                A.sid = b.sid;
                A.seq = b.seq;
                A.addr = b.addr;
                H = {
                    user: c.user,
                    pass: c.pass,
                    lid: c.lid_relate.lid,
                    share_key: c.lid_relate.share_key
                };
                c.remember && h({
                    str: y.remember_msg_str,
                    data: {
                        user: c.user,
                        pass: c.pass,
                        lid: c.lid_relate.lid,
                        share_key: c.lid_relate.share_key
                    }
                })
            }
        })) : ("bb" == Qa.r && (Qa.r = ""), m.login_waiting_flag = 1, A.sid = b.sid, A.seq = b.seq, A.addr = b.addr, H = {
            user: c.user,
            pass: c.pass,
            lid: c.lid_relate.lid,
            share_key: c.lid_relate.share_key
        }, c.remember && h({
            str: y.remember_msg_str,
            data: {
                user: c.user,
                pass: c.pass,
                lid: c.lid_relate.lid,
                share_key: c.lid_relate.share_key
            }
        })), a = /^\d/, m.login_status = a.exec(c.user) ? "ipc" : "register_user",
        E = !0, "ipc" == m.login_status && "1" != Qa.skip ? (I || (I = new N({
            parent: mx("#login_page"),
            on_event: function(a) {
                return x(a)
            }
        })), I.ctrl({
            type: "ipc_pass_set",
            data: {
                user: c.user,
                pass: C
            }
        })) : ms.ctrl({
            type: "ccm_get_device",
            data: {
                ip: c.ip
            }
        });
    else {
        if (Qa.activation) return Qa.activation = !1, Qa.r = "", t({
            alert: !0,
            str: Ig,
            callback_func: function() {
                activation_login = !0
            }
        }), -1;
        if ("use" == G) {
            G = "used";
            var a = dh.gen_private(),
                e = dh.gen_public(a);
            z.send_msg("cacs_dh_req", {
                bnum_prime: dh.prime,
                root_num: dh.g,
                key_a2b: e,
                tid: local_storage.get(y.cacs_tid_str) ||
                    0
            }, function(a, b, c) {
                d(a, b, c)
            }, {
                ip: m.server_device,
                to: "ccm",
                secret_key: a,
                user: c.user,
                flag: c.flag
            })
        } else {
            if (b.result == rh || b.result == Hh) return a = /^\d/, a.exec(c.user) ? (I || (I = new N({
                parent: mx("#login_page"),
                on_event: function(a) {
                    return x(a)
                }
            })), I.ctrl({
                type: "guiding_connection",
                data: {
                    user: c.user,
                    pass: C,
                    now_handle_info: A,
                    flag: c.flag
                }
            })) : u({
                parent: mx("#signin_name"),
                color: "red",
                position: "right",
                disappear_way: "time",
                str: Ic
            }), m.login_waiting_flag = 1, -1;
            if (b.result == fh || b.result == uh) return u({
                parent: mx("#sign_in"),
                color: "red",
                position: "right",
                disappear_way: "time",
                str: Fe
            }), m.login_waiting_flag = 1, -1;
            if (b.result == Vh || b.result == Wh) return u({
                parent: mx("#sign_in"),
                color: "red",
                position: "right",
                disappear_way: "time",
                str: fa
            }), m.login_waiting_flag = 1, -1;
            if (b.result == Qh) return u({
                parent: mx("#signin_name"),
                color: "red",
                position: "right",
                disappear_way: "time",
                str: Jg
            }), m.login_waiting_flag = 1, -1
        }
    }
    }
