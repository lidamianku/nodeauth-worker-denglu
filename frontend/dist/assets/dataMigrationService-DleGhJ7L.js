const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/qr-utils-BFVygUr2.js","assets/element-plus-CR1uB1eY.js","assets/vue-core-Daban9YF.js","assets/element-plus-Dh61In7b.css"])))=>i.map(i=>d[i]);
import { _ as ae, __tla as __tla_0 } from "./pdf-utils-DATcFnLh.js";
import { p as K, v as ce, b as re, __tla as __tla_1 } from "./vaultService-CUiv3Dhs.js";
import { l as D, d as pe, e as ge, __tla as __tla_2 } from "./index-B0Ct1a8G.js";
import { a as le } from "./argon2-browser-BgxASEiS.js";
import { l as he, __tla as __tla_3 } from "./resourceRegistry-2cgyZWwn.js";
import { argon2id as ye } from "./hash-wasm-Dup_VHWH.js";
import { unzipSync as me } from "./compression-utils-CXh1ITwj.js";
import { a as we } from "./qr-utils-BFVygUr2.js";
import { B as Ae, S as oe, a as _e, b as J, c as Se, d as be, M as Ee, F as ve, e as fe, f as xe, g as Ie } from "./wa-sqlite-D0naBMh4.js";
import "./vue-core-Daban9YF.js";
import "./element-plus-CR1uB1eY.js";
import "./simplewebauthn-3qpiAaRi.js";
import "./tanstack-query-C-OQsQoR.js";
let qe;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })(),
    (()=>{
        try {
            return __tla_1;
        } catch  {}
    })(),
    (()=>{
        try {
            return __tla_2;
        } catch  {}
    })(),
    (()=>{
        try {
            return __tla_3;
        } catch  {}
    })()
]).then(async ()=>{
    function Y(i) {
        const n = new Uint8Array(i.length / 2);
        for(let t = 0; t < i.length; t += 2)n[t / 2] = parseInt(i.substring(t, t + 2), 16);
        return n;
    }
    function Te(i) {
        const n = atob(i), t = new Uint8Array(n.length);
        for(let e = 0; e < n.length; e++)t[e] = n.charCodeAt(e);
        return t;
    }
    function ee(i) {
        try {
            return JSON.parse(i);
        } catch  {
            return null;
        }
    }
    const Pe = {
        decodePayload (i) {
            const n = [];
            let t = 0;
            function e() {
                let p = 0, s = 0;
                for(; t < i.length;){
                    const a = i[t++];
                    if (p |= (a & 127) << s, (a & 128) === 0) break;
                    s += 7;
                }
                return p;
            }
            for(; t < i.length;){
                const p = i[t++], s = p >> 3, a = p & 7;
                if (s === 1 && a === 2) {
                    const o = e(), y = t + o;
                    let g = null, m = "", w = "", A = "SHA1", x = 6;
                    for(; t < y;){
                        const E = i[t++], l = E >> 3, r = E & 7;
                        if (l === 1 && r === 2) {
                            const f = e(), d = i.slice(t, t + f), c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
                            let h = 0, u = 0, _ = "";
                            for(let S = 0; S < d.length; S++)for(u = u << 8 | d[S], h += 8; h >= 5;)_ += c[u >>> h - 5 & 31], h -= 5;
                            h > 0 && (_ += c[u << 5 - h & 31]), g = _, t += f;
                        } else if (l === 2 && r === 2) {
                            const f = e();
                            m = new TextDecoder().decode(i.slice(t, t + f)), t += f;
                        } else if (l === 3 && r === 2) {
                            const f = e();
                            w = new TextDecoder().decode(i.slice(t, t + f)), t += f;
                        } else if (l === 4 && r === 0) {
                            const f = e();
                            f === 2 ? A = "SHA256" : f === 3 ? A = "SHA512" : f === 4 && (A = "MD5");
                        } else if (l === 5 && r === 0) e() === 2 && (x = 8);
                        else if (l === 6 && r === 0) e();
                        else if (r === 0) e();
                        else if (r === 2) t += e();
                        else break;
                    }
                    if (g) {
                        let E = m, l = w;
                        if (!l && m.includes(":")) {
                            const r = m.split(":");
                            l = r[0].trim(), E = r[1].trim();
                        }
                        n.push({
                            service: l || "Unknown",
                            account: E || "Unknown",
                            secret: g,
                            algorithm: A,
                            digits: x,
                            period: 30,
                            category: ""
                        });
                    }
                    t = y;
                } else if (a === 0) e();
                else if (a === 2) t += e();
                else break;
            }
            return n;
        }
    }, de = {
        _splitCsvLine (i) {
            const n = [];
            let t = 0;
            for(; t <= i.length;){
                if (t === i.length) {
                    n.push("");
                    break;
                }
                if (i[t] === '"') {
                    let e = "";
                    for(t++; t < i.length;)if (i[t] === '"') if (i[t + 1] === '"') e += '"', t += 2;
                    else {
                        t++;
                        break;
                    }
                    else e += i[t++];
                    n.push(e.trim()), i[t] === "," && t++;
                } else {
                    const e = i.indexOf(",", t);
                    if (e === -1) {
                        n.push(i.slice(t).trim());
                        break;
                    }
                    n.push(i.slice(t, e).trim()), t = e + 1;
                }
            }
            return n;
        },
        parseCsv (i) {
            const n = i.split(`
`).filter((l)=>l.trim());
            if (n.length < 2) return [];
            const t = this._splitCsvLine(n[0]).map((l)=>l.toLowerCase()), e = [], p = t.includes("login_totp"), s = t.includes("otpauth") && !t.includes("title"), a = t.includes("otpauth") && t.includes("title"), o = t.includes("totp") && t.includes("vault") && t.includes("createtime"), y = t.includes("otpurl") && t.includes("title") && t.includes("username"), g = t.includes("issuer") || t.includes("secret") || t.includes("name"), m = [
                "otpauth",
                "login_totp",
                "totp",
                "mfa",
                "two_factor_code",
                "secret",
                "otpurl",
                "nodeauth",
                "authenticator"
            ], w = [
                "name",
                "title",
                "item name",
                "issuer",
                "label"
            ], A = [
                "username",
                "login",
                "login_username",
                "account",
                "email"
            ], x = (l)=>l ? l.toString().trim().replace(/[\s-]/g, "").toUpperCase() : "", E = t.some((l)=>m.includes(l));
            if (!p && !s && !a && !o && !y && !g && !E) return [];
            for(let l = 1; l < n.length; l++){
                const r = this._splitCsvLine(n[l]), f = {};
                if (t.forEach((d, c)=>{
                    f[d] = r[c] || "";
                }), a) {
                    const d = (f.otpauth || "").trim();
                    if (d && d.startsWith("otpauth://")) {
                        const c = K(d);
                        c && (c.service = f.title || c.service, c.account = f.username || c.account, e.push(c));
                    }
                } else if (p || s) {
                    const d = (f.login_totp || f.otpauth || f.totp || "").trim();
                    if (d) {
                        let c = null;
                        if (d.startsWith("otpauth://")) c = K(d);
                        else {
                            const h = x(d);
                            /^[A-Z2-7]+=*$/.test(h) && (c = {
                                service: f.name || "Unknown",
                                account: f.login_username || "Unknown",
                                secret: h,
                                algorithm: "SHA-1",
                                digits: 6,
                                period: 30,
                                category: ""
                            });
                        }
                        c && (c.service = f.name || c.service, c.account = f.login_username || c.account, e.push(c));
                    }
                } else if (o) {
                    const d = (f.totp || "").trim();
                    if (d && d.startsWith("otpauth://")) {
                        const c = K(d);
                        c && (c.service = f.name || c.service, c.account = f.username || c.account, c.category = f.vault || "", e.push(c));
                    }
                } else if (y) {
                    const d = (f.otpurl || "").trim();
                    if (d && d.startsWith("otpauth://")) {
                        const c = K(d);
                        c && (c.service = f.title || c.service, c.account = f.username || c.account, c.category = f.category || "", e.push(c));
                    }
                } else {
                    const d = t.find((h)=>m.includes(h)), c = d ? (f[d] || "").trim() : "";
                    if (c) if (c.toLowerCase().startsWith("otpauth://")) {
                        const h = K(c);
                        if (h) {
                            const u = t.find((S)=>w.includes(S)), _ = t.find((S)=>A.includes(S));
                            h.service = f[u] || h.service, h.account = f[_] || h.account, e.push(h);
                        }
                    } else {
                        const h = x(c);
                        if (/^[A-Z2-7]+=*$/.test(h)) {
                            const _ = t.find((b)=>w.includes(b)), S = t.find((b)=>A.includes(b));
                            e.push({
                                service: f[_] || "Unknown",
                                account: f[S] || "Unknown Account",
                                secret: h,
                                algorithm: (f.algorithm || "SHA1").toUpperCase().replace(/^SHA-?1$/, "SHA-1").replace(/^SHA-?256$/, "SHA-256").replace(/^SHA-?512$/, "SHA-512"),
                                digits: parseInt(f.digits || "6", 10),
                                period: parseInt(f.period || "30", 10),
                                category: ""
                            });
                        }
                    }
                }
            }
            return e;
        }
    };
    var se = {
        exports: {}
    }, ue;
    function Oe() {
        return ue || (ue = 1, (function(i, n) {
            (function(t) {
                function p(l) {
                    const r = new Uint32Array([
                        1116352408,
                        1899447441,
                        3049323471,
                        3921009573,
                        961987163,
                        1508970993,
                        2453635748,
                        2870763221,
                        3624381080,
                        310598401,
                        607225278,
                        1426881987,
                        1925078388,
                        2162078206,
                        2614888103,
                        3248222580,
                        3835390401,
                        4022224774,
                        264347078,
                        604807628,
                        770255983,
                        1249150122,
                        1555081692,
                        1996064986,
                        2554220882,
                        2821834349,
                        2952996808,
                        3210313671,
                        3336571891,
                        3584528711,
                        113926993,
                        338241895,
                        666307205,
                        773529912,
                        1294757372,
                        1396182291,
                        1695183700,
                        1986661051,
                        2177026350,
                        2456956037,
                        2730485921,
                        2820302411,
                        3259730800,
                        3345764771,
                        3516065817,
                        3600352804,
                        4094571909,
                        275423344,
                        430227734,
                        506948616,
                        659060556,
                        883997877,
                        958139571,
                        1322822218,
                        1537002063,
                        1747873779,
                        1955562222,
                        2024104815,
                        2227730452,
                        2361852424,
                        2428436474,
                        2756734187,
                        3204031479,
                        3329325298
                    ]);
                    let f = 1779033703, d = 3144134277, c = 1013904242, h = 2773480762, u = 1359893119, _ = 2600822924, S = 528734635, b = 1541459225;
                    const T = new Uint32Array(64);
                    function P(V) {
                        let Q = 0, B = V.length;
                        for(; B >= 64;){
                            let M = f, $ = d, z = c, j = h, I = u, k = _, F = S, q = b, H, U, Z, X, te;
                            for(U = 0; U < 16; U++)Z = Q + U * 4, T[U] = (V[Z] & 255) << 24 | (V[Z + 1] & 255) << 16 | (V[Z + 2] & 255) << 8 | V[Z + 3] & 255;
                            for(U = 16; U < 64; U++)H = T[U - 2], X = (H >>> 17 | H << 15) ^ (H >>> 19 | H << 13) ^ H >>> 10, H = T[U - 15], te = (H >>> 7 | H << 25) ^ (H >>> 18 | H << 14) ^ H >>> 3, T[U] = (X + T[U - 7] | 0) + (te + T[U - 16] | 0) | 0;
                            for(U = 0; U < 64; U++)X = (((I >>> 6 | I << 26) ^ (I >>> 11 | I << 21) ^ (I >>> 25 | I << 7)) + (I & k ^ ~I & F) | 0) + (q + (r[U] + T[U] | 0) | 0) | 0, te = ((M >>> 2 | M << 30) ^ (M >>> 13 | M << 19) ^ (M >>> 22 | M << 10)) + (M & $ ^ M & z ^ $ & z) | 0, q = F, F = k, k = I, I = j + X | 0, j = z, z = $, $ = M, M = X + te | 0;
                            f = f + M | 0, d = d + $ | 0, c = c + z | 0, h = h + j | 0, u = u + I | 0, _ = _ + k | 0, S = S + F | 0, b = b + q | 0, Q += 64, B -= 64;
                        }
                    }
                    P(l);
                    let N, R = l.length % 64, O = l.length / 536870912 | 0, C = l.length << 3, G = R < 56 ? 56 : 120, L = l.slice(l.length - R, l.length);
                    for(L.push(128), N = R + 1; N < G; N++)L.push(0);
                    return L.push(O >>> 24 & 255), L.push(O >>> 16 & 255), L.push(O >>> 8 & 255), L.push(O >>> 0 & 255), L.push(C >>> 24 & 255), L.push(C >>> 16 & 255), L.push(C >>> 8 & 255), L.push(C >>> 0 & 255), P(L), [
                        f >>> 24 & 255,
                        f >>> 16 & 255,
                        f >>> 8 & 255,
                        f >>> 0 & 255,
                        d >>> 24 & 255,
                        d >>> 16 & 255,
                        d >>> 8 & 255,
                        d >>> 0 & 255,
                        c >>> 24 & 255,
                        c >>> 16 & 255,
                        c >>> 8 & 255,
                        c >>> 0 & 255,
                        h >>> 24 & 255,
                        h >>> 16 & 255,
                        h >>> 8 & 255,
                        h >>> 0 & 255,
                        u >>> 24 & 255,
                        u >>> 16 & 255,
                        u >>> 8 & 255,
                        u >>> 0 & 255,
                        _ >>> 24 & 255,
                        _ >>> 16 & 255,
                        _ >>> 8 & 255,
                        _ >>> 0 & 255,
                        S >>> 24 & 255,
                        S >>> 16 & 255,
                        S >>> 8 & 255,
                        S >>> 0 & 255,
                        b >>> 24 & 255,
                        b >>> 16 & 255,
                        b >>> 8 & 255,
                        b >>> 0 & 255
                    ];
                }
                function s(l, r, f) {
                    l = l.length <= 64 ? l : p(l);
                    const d = 64 + r.length + 4, c = new Array(d), h = new Array(64);
                    let u, _ = [];
                    for(u = 0; u < 64; u++)c[u] = 54;
                    for(u = 0; u < l.length; u++)c[u] ^= l[u];
                    for(u = 0; u < r.length; u++)c[64 + u] = r[u];
                    for(u = d - 4; u < d; u++)c[u] = 0;
                    for(u = 0; u < 64; u++)h[u] = 92;
                    for(u = 0; u < l.length; u++)h[u] ^= l[u];
                    function S() {
                        for(let b = d - 1; b >= d - 4; b--){
                            if (c[b]++, c[b] <= 255) return;
                            c[b] = 0;
                        }
                    }
                    for(; f >= 32;)S(), _ = _.concat(p(h.concat(p(c)))), f -= 32;
                    return f > 0 && (S(), _ = _.concat(p(h.concat(p(c))).slice(0, f))), _;
                }
                function a(l, r, f, d, c) {
                    let h;
                    for(m(l, (2 * f - 1) * 16, c, 0, 16), h = 0; h < 2 * f; h++)g(l, h * 16, c, 16), y(c, d), m(c, 0, l, r + h * 16, 16);
                    for(h = 0; h < f; h++)m(l, r + h * 2 * 16, l, h * 16, 16);
                    for(h = 0; h < f; h++)m(l, r + (h * 2 + 1) * 16, l, (h + f) * 16, 16);
                }
                function o(l, r) {
                    return l << r | l >>> 32 - r;
                }
                function y(l, r) {
                    m(l, 0, r, 0, 16);
                    for(let f = 8; f > 0; f -= 2)r[4] ^= o(r[0] + r[12], 7), r[8] ^= o(r[4] + r[0], 9), r[12] ^= o(r[8] + r[4], 13), r[0] ^= o(r[12] + r[8], 18), r[9] ^= o(r[5] + r[1], 7), r[13] ^= o(r[9] + r[5], 9), r[1] ^= o(r[13] + r[9], 13), r[5] ^= o(r[1] + r[13], 18), r[14] ^= o(r[10] + r[6], 7), r[2] ^= o(r[14] + r[10], 9), r[6] ^= o(r[2] + r[14], 13), r[10] ^= o(r[6] + r[2], 18), r[3] ^= o(r[15] + r[11], 7), r[7] ^= o(r[3] + r[15], 9), r[11] ^= o(r[7] + r[3], 13), r[15] ^= o(r[11] + r[7], 18), r[1] ^= o(r[0] + r[3], 7), r[2] ^= o(r[1] + r[0], 9), r[3] ^= o(r[2] + r[1], 13), r[0] ^= o(r[3] + r[2], 18), r[6] ^= o(r[5] + r[4], 7), r[7] ^= o(r[6] + r[5], 9), r[4] ^= o(r[7] + r[6], 13), r[5] ^= o(r[4] + r[7], 18), r[11] ^= o(r[10] + r[9], 7), r[8] ^= o(r[11] + r[10], 9), r[9] ^= o(r[8] + r[11], 13), r[10] ^= o(r[9] + r[8], 18), r[12] ^= o(r[15] + r[14], 7), r[13] ^= o(r[12] + r[15], 9), r[14] ^= o(r[13] + r[12], 13), r[15] ^= o(r[14] + r[13], 18);
                    for(let f = 0; f < 16; ++f)l[f] += r[f];
                }
                function g(l, r, f, d) {
                    for(let c = 0; c < d; c++)f[c] ^= l[r + c];
                }
                function m(l, r, f, d, c) {
                    for(; c--;)f[d++] = l[r++];
                }
                function w(l) {
                    if (!l || typeof l.length != "number") return !1;
                    for(let r = 0; r < l.length; r++){
                        const f = l[r];
                        if (typeof f != "number" || f % 1 || f < 0 || f >= 256) return !1;
                    }
                    return !0;
                }
                function A(l, r) {
                    if (typeof l != "number" || l % 1) throw new Error("invalid " + r);
                    return l;
                }
                function x(l, r, f, d, c, h, u) {
                    if (f = A(f, "N"), d = A(d, "r"), c = A(c, "p"), h = A(h, "dkLen"), f === 0 || (f & f - 1) !== 0) throw new Error("N must be power of 2");
                    if (f > 2147483647 / 128 / d) throw new Error("N too large");
                    if (d > 2147483647 / 128 / c) throw new Error("r too large");
                    if (!w(l)) throw new Error("password must be an array or buffer");
                    if (l = Array.prototype.slice.call(l), !w(r)) throw new Error("salt must be an array or buffer");
                    r = Array.prototype.slice.call(r);
                    let _ = s(l, r, c * 128 * d);
                    const S = new Uint32Array(c * 32 * d);
                    for(let I = 0; I < S.length; I++){
                        const k = I * 4;
                        S[I] = (_[k + 3] & 255) << 24 | (_[k + 2] & 255) << 16 | (_[k + 1] & 255) << 8 | (_[k + 0] & 255) << 0;
                    }
                    const b = new Uint32Array(64 * d), T = new Uint32Array(32 * d * f), P = 32 * d, N = new Uint32Array(16), R = new Uint32Array(16), O = c * f * 2;
                    let C = 0, G = null, L = !1, V = 0, Q = 0, B, M;
                    const $ = u ? parseInt(1e3 / d) : 4294967295, z = typeof setImmediate < "u" ? setImmediate : setTimeout, j = function() {
                        if (L) return u(new Error("cancelled"), C / O);
                        let I;
                        switch(V){
                            case 0:
                                M = Q * 32 * d, m(S, M, b, 0, P), V = 1, B = 0;
                            case 1:
                                I = f - B, I > $ && (I = $);
                                for(let F = 0; F < I; F++)m(b, 0, T, (B + F) * P, P), a(b, P, d, N, R);
                                if (B += I, C += I, u) {
                                    const F = parseInt(1e3 * C / O);
                                    if (F !== G) {
                                        if (L = u(null, C / O), L) break;
                                        G = F;
                                    }
                                }
                                if (B < f) break;
                                B = 0, V = 2;
                            case 2:
                                I = f - B, I > $ && (I = $);
                                for(let F = 0; F < I; F++){
                                    const q = (2 * d - 1) * 16, H = b[q] & f - 1;
                                    g(T, H * P, b, P), a(b, P, d, N, R);
                                }
                                if (B += I, C += I, u) {
                                    const F = parseInt(1e3 * C / O);
                                    if (F !== G) {
                                        if (L = u(null, C / O), L) break;
                                        G = F;
                                    }
                                }
                                if (B < f) break;
                                if (m(b, 0, S, M, P), Q++, Q < c) {
                                    V = 0;
                                    break;
                                }
                                _ = [];
                                for(let F = 0; F < S.length; F++)_.push(S[F] >> 0 & 255), _.push(S[F] >> 8 & 255), _.push(S[F] >> 16 & 255), _.push(S[F] >> 24 & 255);
                                const k = s(l, _, h);
                                return u && u(null, 1, k), k;
                        }
                        u && z(j);
                    };
                    if (!u) for(;;){
                        const I = j();
                        if (I != null) return I;
                    }
                    j();
                }
                const E = {
                    scrypt: function(l, r, f, d, c, h, u) {
                        return new Promise(function(_, S) {
                            let b = 0;
                            u && u(0), x(l, r, f, d, c, h, function(T, P, N) {
                                if (T) S(T);
                                else if (N) u && b !== 1 && u(1), _(new Uint8Array(N));
                                else if (u && P !== b) return b = P, u(P);
                            });
                        });
                    },
                    syncScrypt: function(l, r, f, d, c, h) {
                        return new Uint8Array(x(l, r, f, d, c, h));
                    }
                };
                i.exports = E;
            })();
        })(se)), se.exports;
    }
    var Fe = Oe();
    const De = {
        async decryptDatabase (i, n) {
            const t = i.header.slots;
            if (!t || !t.length) throw new Error("Aegis: 找不到密钥槽");
            const e = i.db, p = i.header.params;
            let s = null;
            const a = new TextEncoder().encode(n);
            for (const A of t)if (A.type === 1) {
                const x = Y(A.salt), E = await Fe.scrypt(a, x, A.n, A.r, A.p, 32), l = Y(A.key), r = Y(A.key_params.nonce), f = Y(A.key_params.tag), d = new Uint8Array(l.length + f.length);
                d.set(l), d.set(f, l.length);
                try {
                    const c = await window.crypto.subtle.importKey("raw", E, {
                        name: "AES-GCM"
                    }, !1, [
                        "decrypt"
                    ]), h = await window.crypto.subtle.decrypt({
                        name: "AES-GCM",
                        iv: r
                    }, c, d);
                    s = new Uint8Array(h);
                    break;
                } catch  {
                    continue;
                }
            }
            if (!s) throw new Error("Aegis: 密码错误或不支持的加密格式 (缺少 Scrypt)");
            const o = Te(e), y = Y(p.nonce), g = Y(p.tag), m = new Uint8Array(o.length + g.length);
            m.set(o), m.set(g, o.length);
            const w = await window.crypto.subtle.importKey("raw", s, {
                name: "AES-GCM"
            }, !1, [
                "decrypt"
            ]);
            try {
                const A = await window.crypto.subtle.decrypt({
                    name: "AES-GCM",
                    iv: y
                }, w, m);
                return JSON.parse(new TextDecoder().decode(A));
            } catch  {
                throw new Error("Aegis: 数据库载荷解密失败");
            }
        }
    }, Le = {
        name: "Proton Authenticator (.json)",
        fileType: "application/json, text/plain",
        async parse (i, n) {
            let t;
            try {
                t = JSON.parse(i);
            } catch  {
                throw new Error("INVALID_FORMAT_OR_PASSWORD");
            }
            if (t.version !== 1 || !t.salt || !t.content) throw new Error("INVALID_FORMAT_OR_PASSWORD");
            if (!n) throw new Error("PASSWORD_REQUIRED");
            try {
                const e = atob(t.salt), p = new Uint8Array(e.length);
                for(let d = 0; d < e.length; d++)p[d] = e.charCodeAt(d);
                const s = atob(t.content), a = new Uint8Array(s.length);
                for(let d = 0; d < s.length; d++)a[d] = s.charCodeAt(d);
                const o = a.slice(0, 12), y = a.slice(12), m = (await le.hash({
                    pass: n,
                    salt: p,
                    time: 2,
                    mem: 19 * 1024,
                    hashLen: 32,
                    parallelism: 1,
                    type: le.ArgonType.Argon2id,
                    distPath: "/"
                })).hash, w = await window.crypto.subtle.importKey("raw", m, {
                    name: "AES-GCM"
                }, !1, [
                    "decrypt"
                ]), A = new TextEncoder().encode("proton.authenticator.export.v1"), x = await window.crypto.subtle.decrypt({
                    name: "AES-GCM",
                    iv: o,
                    additionalData: A,
                    tagLength: 128
                }, w, y), E = new TextDecoder().decode(x), r = JSON.parse(E).entries || [], f = [];
                for (const d of r)if (d.content && d.content.uri) {
                    const c = K(d.content.uri);
                    c && f.push(c);
                }
                return f;
            } catch (e) {
                throw D.error("Proton Authenticator decryption failed:", e), new Error("INVALID_FORMAT_OR_PASSWORD");
            }
        }
    }, Ne = {
        name: "Proton Pass (.pgp)",
        fileType: "text/plain",
        async parse (i, n) {
            try {
                const t = await he("openpgp"), e = t?.default || t, p = await e.readMessage({
                    armoredMessage: i
                }), { data: s } = await e.decrypt({
                    message: p,
                    passwords: [
                        n
                    ],
                    format: "utf8"
                }), a = JSON.parse(s), o = [], y = a.vaults || {};
                for(const g in y){
                    const w = y[g].items || [];
                    for (const A of w){
                        const x = A.data || {}, E = x.content || {}, l = x.metadata || {};
                        if (E.totpUri) {
                            const r = K(E.totpUri);
                            r && (l.name && (r.service = l.name), E.itemUsername && (r.account = E.itemUsername), o.push(r));
                        }
                    }
                }
                return o;
            } catch (t) {
                throw D.error("Proton Pass PGP decryption failed:", t), new Error("INVALID_FORMAT_OR_PASSWORD");
            }
        }
    }, Re = {
        isEnteEncrypted (i) {
            return i && typeof i.kdfParams == "object" && typeof i.encryptedData == "string" && typeof i.encryptionNonce == "string";
        },
        async decryptAndParse (i, n) {
            let t;
            try {
                t = typeof i == "string" ? JSON.parse(i) : i;
            } catch  {
                throw new Error("INVALID_FORMAT_OR_PASSWORD");
            }
            if (!this.isEnteEncrypted(t)) throw new Error("INVALID_FORMAT_OR_PASSWORD");
            if (!n) throw new Error("PASSWORD_REQUIRED");
            const e = ie(t.kdfParams.salt), p = ie(t.encryptionNonce), s = ie(t.encryptedData), { opsLimit: a, memLimit: o } = t.kdfParams, y = Math.floor(o / 1024);
            let g;
            try {
                g = await ye({
                    password: n,
                    salt: e,
                    parallelism: 1,
                    iterations: a,
                    memorySize: y,
                    hashLength: 32,
                    outputType: "binary"
                });
            } catch  {
                throw new Error("INVALID_FORMAT_OR_PASSWORD");
            }
            let m;
            try {
                const E = await Ue(), l = E.crypto_secretstream_xchacha20poly1305_init_pull(p, g), r = E.crypto_secretstream_xchacha20poly1305_pull(l, s);
                if (!r || !r.message) throw new Error("no result");
                m = r.message;
            } catch  {
                throw new Error("INVALID_FORMAT_OR_PASSWORD");
            }
            const A = new TextDecoder().decode(m).split(`
`), x = [];
            for (const E of A){
                const l = E.trim();
                if (!l.startsWith("otpauth://")) continue;
                const r = K(l);
                r && r.secret && x.push(r);
            }
            return x;
        }
    };
    function ie(i) {
        const n = i.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(i.length / 4) * 4, "="), t = atob(n), e = new Uint8Array(t.length);
        for(let p = 0; p < t.length; p++)e[p] = t.charCodeAt(p);
        return e;
    }
    let ne = null;
    async function Ue() {
        if (ne) return ne;
        const i = await he("libsodium"), n = i?.default || i;
        return await n.ready, ne = n, ne;
    }
    class v extends Error {
        constructor(n, t = "MIGRATION_ERROR", e = null){
            super(n), this.name = "migrationError", this.code = t, this.details = e;
        }
    }
    class Ce extends Ae {
        name = "memory";
        mapNameToFile = new Map;
        mapIdToFile = new Map;
        constructor(){
            super();
        }
        close() {
            for (const n of this.mapIdToFile.keys())this.xClose(n);
        }
        xOpen(n, t, e, p) {
            n = n || Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
            let s = this.mapNameToFile.get(n);
            if (!s) if (e & oe) s = {
                name: n,
                flags: e,
                size: 0,
                data: new ArrayBuffer(0)
            }, this.mapNameToFile.set(n, s);
            else return _e;
            return this.mapIdToFile.set(t, s), p.setInt32(0, e, !0), J;
        }
        xClose(n) {
            const t = this.mapIdToFile.get(n);
            return t && (this.mapIdToFile.delete(n), t.flags & Se && this.mapNameToFile.delete(t.name)), J;
        }
        xRead(n, t, e) {
            const p = this.mapIdToFile.get(n), s = Math.min(e, p.size), o = Math.min(e + t.byteLength, p.size) - s;
            return o && t.set(new Uint8Array(p.data, s, o)), o < t.byteLength ? (t.fill(0, o), be) : J;
        }
        xWrite(n, t, e) {
            const p = this.mapIdToFile.get(n);
            if (e + t.byteLength > p.data.byteLength) {
                const s = Math.max(e + t.byteLength, 2 * p.data.byteLength), a = new ArrayBuffer(s);
                new Uint8Array(a).set(new Uint8Array(p.data, 0, p.size)), p.data = a;
            }
            return new Uint8Array(p.data, e, t.byteLength).set(t), p.size = Math.max(p.size, e + t.byteLength), J;
        }
        xTruncate(n, t) {
            const e = this.mapIdToFile.get(n);
            return e.size = Math.min(e.size, t), J;
        }
        xFileSize(n, t) {
            const e = this.mapIdToFile.get(n);
            return t.setBigInt64(0, BigInt(e.size), !0), J;
        }
        xDelete(n, t) {
            return this.mapNameToFile.delete(n), J;
        }
        xAccess(n, t, e) {
            const p = this.mapNameToFile.get(n);
            return e.setInt32(0, p ? 1 : 0, !0), J;
        }
    }
    class Me extends Ce {
        name = "memory-async";
        constructor(){
            super();
        }
        async close() {
            for (const n of this.mapIdToFile.keys())await this.xClose(n);
        }
        xOpen(n, t, e, p) {
            return this.handleAsync(async ()=>super.xOpen(n, t, e, p));
        }
        xClose(n) {
            return this.handleAsync(async ()=>super.xClose(n));
        }
        xRead(n, t, e) {
            return this.handleAsync(async ()=>super.xRead(n, t, e));
        }
        xWrite(n, t, e) {
            return this.handleAsync(async ()=>super.xWrite(n, t, e));
        }
        xTruncate(n, t) {
            return this.handleAsync(async ()=>super.xTruncate(n, t));
        }
        xFileSize(n, t) {
            return this.handleAsync(async ()=>super.xFileSize(n, t));
        }
        xDelete(n, t) {
            return this.handleAsync(async ()=>super.xDelete(n, t));
        }
        xAccess(n, t, e) {
            return this.handleAsync(async ()=>super.xAccess(n, t, e));
        }
    }
    let W;
    W = {
        SALT_LEN: 32,
        IV_LEN: 12,
        ITERATIONS: 1e4,
        ALGORITHM: "aes-256-gcm",
        KDF: "PBKDF2"
    };
    qe = {
        detectFileType (i, n) {
            if (i instanceof ArrayBuffer || i instanceof Uint8Array) {
                const e = i instanceof Uint8Array ? i : new Uint8Array(i), p = "SQLite format 3";
                let s = !0;
                for(let a = 0; a < p.length && a < e.length; a++)if (e[a] !== p.charCodeAt(a)) {
                    s = !1;
                    break;
                }
                if (s) return "phonefactor";
                try {
                    const a = new TextDecoder("utf-8", {
                        fatal: !1
                    }).decode(e);
                    if (a.includes("accounts") && (a.includes("oath_secret_key") || a.includes("encrypted_oath_secret_key"))) return "phonefactor";
                } catch  {}
            }
            if (n && n.toLowerCase().includes("phonefactor")) return "phonefactor";
            let t = i;
            if (i instanceof ArrayBuffer || i instanceof Uint8Array) try {
                const e = i instanceof Uint8Array ? i : new Uint8Array(i);
                t = new TextDecoder("utf-8", {
                    fatal: !1
                }).decode(e);
            } catch  {
                t = "";
            }
            if (n && n.toLowerCase().endsWith(".csv")) {
                const e = typeof t == "string" ? t.split(`
`)[0].toLowerCase() : "";
                return e.includes("login_totp") ? "bitwarden_pass_csv" : e.includes("title") && e.includes("otpauth") ? "1password_csv" : e.includes("otpauth") ? "bitwarden_auth_csv" : e.includes("totp") && e.includes("vault") && e.includes("createtime") ? "proton_pass_csv" : e.includes("otpurl") && e.includes("title") && e.includes("username") ? "dashlane_csv" : "generic_csv";
            }
            if (typeof t == "string" && t.trim().startsWith("otpauth://")) return "generic_text";
            if (typeof t == "string") {
                const e = ee(t);
                if (e) {
                    if (Array.isArray(e.items) && Array.isArray(e.folders)) return "bitwarden_pass_json";
                    if (Array.isArray(e.items) && (e.encrypted === !1 || !("encrypted" in e))) return "bitwarden_auth_json";
                    if (e.encrypted === !0 && e.app === "nodeauth") return "nodeauth_encrypted";
                    if (e.version === 1 && Array.isArray(e.accounts) && (e.accounts.length === 0 || e.accounts[0].issuerName)) return "lastpass_auth_json";
                    if (e.app === "nodeauth" || Array.isArray(e.accounts) || Array.isArray(e.vault) || Array.isArray(e.secrets)) return "nodeauth_json";
                    if (e.schemaVersion && e.servicesEncrypted && typeof e.servicesEncrypted == "string") return "2fas_encrypted";
                    if (e.schemaVersion && Array.isArray(e.services)) return "2fas";
                    if (e.version === 1 && e.db && typeof e.db == "object" && Array.isArray(e.db.entries)) return "aegis";
                    if (e.version === 1 && e.header && e.db && typeof e.db == "string") return "aegis_encrypted";
                    if (e.version === 1 && typeof e.salt == "string" && typeof e.content == "string") return "proton_auth_encrypted";
                    if (e.kdfParams && typeof e.encryptedData == "string") return "ente_encrypted";
                    if (e.encrypted === !0 && e.passwordProtected === !0 && e.encKeyValidation_DO_NOT_EDIT) return "bitwarden_pass_encrypted";
                    if (e.shared_secret && (e.account_name || e.SteamID)) return "steam_mafile";
                }
            }
            if (typeof t == "string" && t.includes("-----BEGIN PGP MESSAGE-----")) return "proton_pass_pgp";
            if (n) {
                const e = n.toLowerCase();
                if (e.endsWith(".2fas")) return "2fas";
                if (e.endsWith(".txt")) return "generic_text";
                if (e.endsWith(".mafile")) return "steam_mafile";
                if (e.endsWith(".1pux")) return "1password_pux";
            }
            return "unknown";
        },
        async fetchAllVault () {
            const i = await ce.getVault({
                limit: 9999
            });
            if (!i.success) throw new v("无法获取账号数据", "VAULT_FETCH_FAILED");
            return i.vault || [];
        },
        async exportData (i, n, t, e = "generic") {
            const s = {
                version: "2.0",
                app: "nodeauth",
                timestamp: new Date().toISOString()
            };
            if (n === "nodeauth_encrypted" || n === "encrypted") {
                if (!t) throw new v("加密导出需要密码", "MISSING_PASSWORD");
                const a = {
                    ...s,
                    accounts: i
                }, o = await ge(a, t);
                return JSON.stringify({
                    ...s,
                    encrypted: !0,
                    data: o,
                    note: "This file is encrypted with your export password (AES-GCM-256 + PBKDF2)."
                }, null, 2);
            }
            if (n === "generic_json") {
                const a = i.map((o)=>({
                        issuer: o.service || "Unknown",
                        account: o.account || "",
                        secret: o.secret,
                        type: "TOTP",
                        digits: o.digits || 6,
                        period: o.period || 30,
                        algorithm: (o.algorithm || "SHA1").toUpperCase().replace("SHA-", "SHA")
                    }));
                return JSON.stringify({
                    version: "1.0",
                    exportDate: new Date().toISOString(),
                    count: a.length,
                    secrets: a
                }, null, 2);
            }
            if (n === "nodeauth_json") return JSON.stringify({
                ...s,
                encrypted: !1,
                accounts: i
            }, null, 2);
            if (n === "2fas") {
                const a = i.map((o, y)=>{
                    const g = (o.algorithm || "SHA1").replace("SHA-1", "SHA1").replace("SHA-256", "SHA256").replace("SHA-512", "SHA512");
                    return {
                        name: o.service,
                        secret: o.secret,
                        otp: {
                            source: "manual",
                            account: o.account || "",
                            digits: o.digits || 6,
                            period: o.period || 30,
                            algorithm: g,
                            tokenType: "TOTP",
                            counter: 0
                        },
                        order: {
                            position: y
                        },
                        badge: {
                            color: "Default"
                        },
                        updatedAt: Date.now(),
                        icon: {
                            selected: "Label",
                            label: {
                                text: (o.service || "?").slice(0, 2).toUpperCase(),
                                backgroundColor: "Default"
                            },
                            iconCollection: {
                                id: "A5B3FB65-4EC5-43E6-8EC1-49E24CA9E7AD"
                            }
                        }
                    };
                });
                return JSON.stringify({
                    schemaVersion: 4,
                    appVersionCode: 50316,
                    appVersionName: "5.3.16",
                    appOrigin: "ios",
                    groups: [],
                    services: a
                });
            }
            if (n === "aegis") {
                const a = i.map((o)=>({
                        type: "totp",
                        uuid: crypto.randomUUID(),
                        name: o.account || o.service,
                        issuer: o.service,
                        info: {
                            secret: o.secret,
                            algo: (o.algorithm || "SHA1").replace("SHA-", "SHA"),
                            digits: o.digits || 6,
                            period: o.period || 30
                        }
                    }));
                return JSON.stringify({
                    version: 1,
                    header: {
                        slots: null,
                        params: null
                    },
                    db: {
                        version: 3,
                        entries: a
                    }
                }, null, 2);
            }
            if (n === "generic_text") return i.map((a)=>re({
                    service: a.service,
                    account: a.account,
                    secret: a.secret,
                    algorithm: a.algorithm,
                    digits: a.digits,
                    period: a.period
                })).join(`
`);
            if (n === "bitwarden_auth_csv") {
                let a = `name,secret,totp,favorite,folder
`;
                return i.forEach((o)=>{
                    const y = `"${o.service}${o.account ? ":" + o.account : ""}"`, g = `"${re({
                        service: o.service,
                        account: o.account,
                        secret: o.secret,
                        algorithm: o.algorithm,
                        digits: o.digits,
                        period: o.period
                    })}"`;
                    a += `${y},${o.secret},${g},0,
`;
                }), a;
            }
            if (n === "generic_csv") {
                let a = `name,issuer,secret,algorithm,digits,period,type
`;
                return i.forEach((o)=>{
                    const y = `"${o.account}"`, g = `"${o.service}"`;
                    a += `${y},${g},${o.secret},${o.algorithm},${o.digits},${o.period},TOTP
`;
                }), a;
            }
            if (n === "bitwarden_auth_json") {
                const a = i.map((o)=>{
                    const y = re({
                        service: o.service,
                        account: o.account,
                        secret: o.secret,
                        algorithm: o.algorithm,
                        digits: o.digits,
                        period: o.period
                    });
                    return {
                        favorite: !1,
                        id: crypto.randomUUID().toUpperCase(),
                        login: {
                            totp: y,
                            username: o.account || ""
                        },
                        name: o.service,
                        type: 1
                    };
                });
                return JSON.stringify({
                    encrypted: !1,
                    items: a
                });
            }
            throw new v("未知的导出类型: " + n, "UNKNOWN_EXPORT_TYPE");
        },
        async exportAsGaMigration (i) {
            if (!i || i.length === 0) throw new v("没有账户可以迁移", "EMPTY_VAULT");
            const n = 10, t = [];
            for(let g = 0; g < i.length; g += n)t.push(i.slice(g, g + n));
            const e = Math.floor(Math.random() * 2147483647), p = await ae(()=>import("./qr-utils-BFVygUr2.js").then((g)=>g.b), __vite__mapDeps([0,1,2,3])), s = [];
            function a(g, m) {
                for(; g >= 128;)m.push(g & 127 | 128), g >>>= 7;
                m.push(g);
            }
            function o(g, m) {
                const w = new TextEncoder().encode(g);
                a(w.length, m);
                for(let A = 0; A < w.length; A++)m.push(w[A]);
            }
            function y(g, m) {
                a(g.length, m);
                for(let w = 0; w < g.length; w++)m.push(g[w]);
            }
            for(let g = 0; g < t.length; g++){
                const m = t[g], w = [];
                w.push(16), a(1, w), w.push(24), a(t.length, w), w.push(32), a(g, w), w.push(40), a(e, w);
                for (const l of m){
                    const r = [], f = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", d = l.secret.toUpperCase().replace(/=+$/, "").replace(/[^A-Z2-7]/g, ""), c = [];
                    let h = 0, u = 0;
                    for(let T = 0; T < d.length; T++){
                        const P = f.indexOf(d[T]);
                        P !== -1 && (u = u << 5 | P, h += 5, h >= 8 && (c.push(u >>> h - 8 & 255), h -= 8));
                    }
                    c.length > 0 && (r.push(10), y(c, r));
                    const _ = l.account || l.service;
                    _ && (r.push(18), o(_, r)), l.service && (r.push(26), o(l.service, r));
                    let S = 1;
                    l.algorithm === "SHA256" ? S = 2 : l.algorithm === "SHA512" && (S = 3), r.push(32), a(S, r);
                    let b = 1;
                    l.digits === 8 && (b = 2), r.push(40), a(b, r), r.push(48), a(2, r), w.push(10), a(r.length, w);
                    for(let T = 0; T < r.length; T++)w.push(r[T]);
                }
                let A = "";
                for(let l = 0; l < w.length; l++)A += String.fromCharCode(w[l]);
                const x = `otpauth-migration://offline?data=${encodeURIComponent(btoa(A))}`, E = await p.toDataURL(x, {
                    errorCorrectionLevel: "M",
                    width: 480,
                    margin: 2
                });
                s.push(E);
            }
            return s;
        },
        async exportAsHtml (i) {
            const n = await ae(()=>import("./qr-utils-BFVygUr2.js").then((e)=>e.b), __vite__mapDeps([0,1,2,3])), t = [];
            t.push(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>NodeAuth 备份报告</title>
        <style>
          body { font-family: -apple-system, system-ui, sans-serif; padding: 20px; color: #333; max-width: 1000px; margin: 0 auto; line-height: 1.5; }
          .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #eaeaea; padding-bottom: 20px; }
          .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
          .card { border: 1px solid #ddd; border-radius: 8px; padding: 15px; text-align: center; display: flex; flex-direction: column; align-items: center; background: white; page-break-inside: avoid; }
          .qr-img { width: 160px; height: 160px; margin: 10px 0; border: 1px solid #eee; }
          .service { font-weight: bold; font-size: 1.1em; color: #1a73e8; margin-bottom: 5px; word-break: break-all; }
          .account { color: #555; font-size: 0.9em; margin-bottom: 15px; word-break: break-all; }
          .code { font-family: monospace; background: #f5f5f5; padding: 5px 10px; border-radius: 4px; font-size: 1.2em; letter-spacing: 2px; }
          .footer { text-align: center; margin-top: 50px; color: #888; font-size: 0.9em; page-break-before: auto; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
            .card { box-shadow: none; border: 1px solid #999; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>NodeAuth 二步验证账户备份</h1>
          <p>生成时间：${new Date().toLocaleString()}</p>
          <p class="no-print" style="color: #d93025; font-weight: bold;">⚠️ 警告：此页面包含敏感信息，请妥善保管。请使用浏览器打印功能将其保存为 PDF 或打印成纸质备份。</p>
          <button class="no-print" onclick="window.print()" style="padding: 10px 20px; background: #1a73e8; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">打印 / 导出 PDF</button>
        </div>
        <div class="grid">
    `);
            for (const e of i){
                const p = re({
                    service: e.service,
                    account: e.account,
                    secret: e.secret,
                    algorithm: e.algorithm,
                    digits: e.digits,
                    period: e.period
                });
                try {
                    const s = await n.toDataURL(p, {
                        errorCorrectionLevel: "M",
                        margin: 2
                    });
                    t.push(`
          <div class="card">
            <div class="service">${e.service}</div>
            <div class="account">${e.account || "-"}</div>
            <img class="qr-img" src="${s}" alt="QR Code">
            <div class="code">${e.secret.replace(/(.{4})/g, "$1 ").trim()}</div>
            <div style="font-size: 0.8em; color: #888; margin-top: 8px;">${e.algorithm} / ${e.digits} / ${e.period}s</div>
          </div>
        `);
                } catch  {}
            }
            return t.push(`
        </div>
        <div class="footer"><p>This report was securely generated in the browser for backup purposes.</p></div>
      </body>
      </html>
    `), t.join(`
`);
        },
        async decrypt2FasEncrypted (i, n) {
            try {
                const t = n.servicesEncrypted;
                if (!t || typeof t != "string") throw new v("无效的 2FAS 加密数据：找不到 servicesEncrypted 字段", "INVALID_2FAS_ENCRYPTED");
                const e = t.split(":");
                if (e.length < 3) throw new v("无效的 2FAS 加密格式：应为 salt:iv:ciphertext", "INVALID_2FAS_FORMAT");
                const s = [
                    e[0],
                    e[1],
                    e.slice(2).join(":")
                ].map((c)=>Uint8Array.from(atob(c.replace(/\s+/g, "")), (h)=>h.charCodeAt(0))), a = (c)=>{
                    const h = c.reduce((S, b)=>S + b.length, 0), u = new Uint8Array(h);
                    let _ = 0;
                    for (const S of c)u.set(S, _), _ += S.length;
                    return u;
                };
                let o, y, g;
                const m = s.findIndex((c)=>c.length === W.IV_LEN);
                if (m !== -1 && (y = s.splice(m, 1)[0], s.length > 0)) {
                    let c = 0;
                    for(let h = 1; h < s.length; h++)s[h].length < s[c].length && (c = h);
                    o = s.splice(c, 1)[0], g = s.length === 1 ? s[0] : a(s);
                }
                if (!o || !y || !g) {
                    let c = !1;
                    const h = [
                        {
                            salt: s[1],
                            iv: s[2],
                            cipher: s[0],
                            name: "bufs[1]=salt, bufs[2]=iv, bufs[0]=cipher"
                        },
                        {
                            salt: s.length > 1 && s[1].length >= 44 ? s[1].slice(0, 32) : null,
                            iv: s.length > 1 && s[1].length >= 44 ? s[1].slice(32, 44) : null,
                            cipher: s[0],
                            name: "salt/iv extracted from bufs[1]"
                        },
                        {
                            salt: s[0].slice(0, 32),
                            iv: s[0].slice(32, 44),
                            cipher: s[0].slice(44),
                            name: "salt/iv extracted from bufs[0]"
                        }
                    ];
                    for (const u of h)if (!(!u.salt || !u.iv || !u.cipher) && u.iv.length === W.IV_LEN) try {
                        const _ = new TextEncoder().encode(i), S = await crypto.subtle.importKey("raw", _, {
                            name: "PBKDF2"
                        }, !1, [
                            "deriveKey"
                        ]), b = await crypto.subtle.deriveKey({
                            name: "PBKDF2",
                            salt: u.salt,
                            iterations: W.ITERATIONS,
                            hash: "SHA-256"
                        }, S, {
                            name: "AES-GCM",
                            length: 256
                        }, !1, [
                            "decrypt"
                        ]);
                        if (u.cipher.length >= 16) {
                            const T = u.cipher.slice(u.cipher.length - 16), P = u.cipher.slice(0, u.cipher.length - 16), N = await crypto.subtle.decrypt({
                                name: "AES-GCM",
                                iv: u.iv
                            }, b, new Uint8Array([
                                ...P,
                                ...T
                            ])), R = new TextDecoder().decode(N);
                            JSON.parse(R), o = u.salt, y = u.iv, g = u.cipher, c = !0, D.debug("[decrypt2FasEncrypted] permutation succeeded with:", u.name);
                            break;
                        }
                    } catch  {}
                    !c && !o && (o = s[0], y = s[1], g = s[2], o.length !== W.SALT_LEN && y.length === W.SALT_LEN && ([o, y] = [
                        y,
                        o
                    ]), y.length !== W.IV_LEN && g.length === W.IV_LEN && ([y, g] = [
                        g,
                        y
                    ]));
                }
                if (D.debug("[decrypt2FasEncrypted] chosen mapping lengths salt,iv,cipher=", o?.length, y?.length, g?.length), o.length < 16) throw new v(`salt 长度过短：${o.length}`, "INVALID_SALT_LEN");
                if (y.length !== W.IV_LEN) throw new v(`IV 长度错误：期望 ${W.IV_LEN}，实际 ${y.length}`, "INVALID_IV_LEN");
                const w = new TextEncoder().encode(i), A = await crypto.subtle.importKey("raw", w, {
                    name: "PBKDF2"
                }, !1, [
                    "deriveKey"
                ]), x = await crypto.subtle.deriveKey({
                    name: "PBKDF2",
                    salt: o,
                    iterations: W.ITERATIONS,
                    hash: "SHA-256"
                }, A, {
                    name: "AES-GCM",
                    length: 256
                }, !1, [
                    "decrypt"
                ]);
                if (D.debug("[decrypt2FasEncrypted] key derived"), g.length < 16) throw new v("密文过短（无法包含 auth tag）", "CIPHERTEXT_TOO_SHORT");
                const E = g.slice(g.length - 16), l = g.slice(0, g.length - 16), r = await crypto.subtle.decrypt({
                    name: "AES-GCM",
                    iv: y
                }, x, new Uint8Array([
                    ...l,
                    ...E
                ])), f = new TextDecoder().decode(r), d = JSON.parse(f);
                if (!Array.isArray(d)) throw new v("解密后的数据不是数组格式", "INVALID_DECRYPTED_FORMAT");
                return d;
            } catch (t) {
                throw t instanceof v ? t : new v(`2FAS 解密失败：${t.message || String(t)}`, "TWOFAS_DECRYPTION_FAILED", t);
            }
        },
        async decryptBitwardenPassEncrypted (i, n) {
            try {
                const t = n.salt, e = n.kdfIterations, p = n.kdfType;
                if (p !== 0) throw new v(`不支持的 KDF 类型: ${p}`, "UNSUPPORTED_BITWARDEN_KDF");
                const s = new TextEncoder().encode(t), a = new TextEncoder().encode(i), o = await crypto.subtle.importKey("raw", a, {
                    name: "PBKDF2"
                }, !1, [
                    "deriveBits"
                ]), y = await crypto.subtle.deriveBits({
                    name: "PBKDF2",
                    salt: s,
                    iterations: e,
                    hash: "SHA-256"
                }, o, 256), g = new Uint8Array(y), m = await this._hkdfExpandSha256(g, "enc", 32), w = await this._hkdfExpandSha256(g, "mac", 32), A = async (l, r, f)=>{
                    const d = l.split(".");
                    if (d[0] !== "2") throw new Error("Unsupported encryption type");
                    const c = d[1].split("|"), h = Uint8Array.from(atob(c[0]), (O)=>O.charCodeAt(0)), u = Uint8Array.from(atob(c[1]), (O)=>O.charCodeAt(0)), _ = Uint8Array.from(atob(c[2]), (O)=>O.charCodeAt(0)), S = await crypto.subtle.importKey("raw", f, {
                        name: "HMAC",
                        hash: "SHA-256"
                    }, !1, [
                        "sign"
                    ]), b = new Uint8Array(h.length + u.length);
                    b.set(h, 0), b.set(u, h.length);
                    const T = new Uint8Array(await crypto.subtle.sign("HMAC", S, b));
                    if (_.length !== T.length) return null;
                    let P = 0;
                    for(let O = 0; O < _.length; O++)P |= _[O] ^ T[O];
                    if (P !== 0) return null;
                    const N = await crypto.subtle.importKey("raw", r, {
                        name: "AES-CBC"
                    }, !1, [
                        "decrypt"
                    ]), R = await crypto.subtle.decrypt({
                        name: "AES-CBC",
                        iv: h
                    }, N, u);
                    return new TextDecoder().decode(R);
                };
                if (!await A(n.encKeyValidation_DO_NOT_EDIT, m, w)) throw new Error("MAC verification failed");
                const E = await A(n.data, m, w);
                return JSON.parse(E);
            } catch (t) {
                throw new v(`Bitwarden 解密失败: ${t.message}`, "BITWARDEN_DECRYPTION_FAILED", t);
            }
        },
        async _hkdfExpandSha256 (i, n, t) {
            const e = new TextEncoder().encode(n || ""), p = await crypto.subtle.importKey("raw", i, {
                name: "HMAC",
                hash: "SHA-256"
            }, !1, [
                "sign"
            ]), s = new Uint8Array(t);
            let a = new Uint8Array(0), o = 0, y = 1;
            for(; o < t;){
                const g = new Uint8Array(a.length + e.length + 1);
                g.set(a, 0), g.set(e, a.length), g[g.length - 1] = y & 255, a = new Uint8Array(await crypto.subtle.sign("HMAC", p, g));
                const m = Math.min(a.length, t - o);
                s.set(a.slice(0, m), o), o += m, y++;
            }
            return s;
        },
        bytesToBase32 (i) {
            const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
            let t = 0, e = 0, p = "";
            for(let s = 0; s < i.length; s++)for(e = e << 8 | i[s], t += 8; t >= 5;)t -= 5, p += n[e >>> t & 31];
            for(t > 0 && (p += n[e << 5 - t & 31]); p.length % 8;)p += "=";
            return p;
        },
        base64ToBase32 (i) {
            try {
                const n = atob(i.trim()), t = new Uint8Array(n.length);
                for(let e = 0; e < n.length; e++)t[e] = n.charCodeAt(e);
                return this.bytesToBase32(t);
            } catch (n) {
                throw new Error(`Base64 转 Base32 失败: ${n.message}`);
            }
        },
        async parsePhoneFactor (i) {
            console.log("[PhoneFactor] parsePhoneFactor 开始");
            let n = null, t = null, e = null, p = null;
            try {
                if (i && i.main && i.main.buffer) n = new Uint8Array(i.main.buffer), i.wal && i.wal.buffer && (t = new Uint8Array(i.wal.buffer)), i.shm && i.shm.buffer && (e = new Uint8Array(i.shm.buffer));
                else if (i instanceof ArrayBuffer || i instanceof Uint8Array) n = new Uint8Array(i);
                else throw new v("无法识别传入的 PhoneFactor 数据格式", "INVALID_PHONEFACTOR_INPUT");
                console.log("[PhoneFactor] 文件提取完成", {
                    mainBufLen: n?.byteLength,
                    walBufLen: t?.byteLength ?? 0,
                    shmBufLen: e?.byteLength ?? 0
                }), console.log("[PhoneFactor] 调用 SQLiteESMFactory...");
                const s = await Ee();
                console.log("[PhoneFactor] SQLiteESMFactory 完成，创建 sqlite3...");
                const a = ve(s);
                console.log("[PhoneFactor] sqlite3 Factory 完成"), p = new Me;
                const o = `vfs-${Date.now()}`;
                p.name = o, a.vfs_register(p), console.log("[PhoneFactor] VFS 注册完成:", o);
                const y = "PhoneFactor", g = (d, c)=>{
                    const h = c.buffer.slice(c.byteOffset, c.byteOffset + c.byteLength);
                    p.mapNameToFile.set(d, {
                        name: d,
                        flags: oe | fe | xe,
                        size: c.byteLength,
                        data: h
                    });
                };
                g(y, n);
                const m = t && t.byteLength > 0;
                m && g(`${y}-wal`, t), e && e.byteLength > 0 && g(`${y}-shm`, e), console.log("[PhoneFactor] 注入文件到 VFS 完成", {
                    main: y,
                    hasWal: m,
                    hasShm: !!(e && e.byteLength > 0)
                }), console.log("[PhoneFactor] 调用 open_v2...");
                const w = await a.open_v2(y, fe | oe, o);
                D.info("[PhoneFactor] open_v2 成功"), D.info("[PhoneFactor] 执行 PRAGMA locking_mode..."), await a.exec(w, "PRAGMA locking_mode = EXCLUSIVE;"), D.info("[PhoneFactor] 执行 PRAGMA journal_mode..."), await a.exec(w, "PRAGMA journal_mode = DELETE;"), D.info("[PhoneFactor] PRAGMA 完成");
                let A = !1;
                if (await a.exec(w, "SELECT name FROM sqlite_master WHERE type='table' AND name='accounts'", (d)=>{
                    A = !0;
                }), D.info(`[PhoneFactor] accounts 表存在: ${A}`), !A) throw await a.close(w), new v("不是有效的Microsoft Authenticator数据文件", "INVALID_PHONEFACTOR_FILE");
                const x = [];
                let E = 0, l = 0, r = 0;
                const f = /^[A-Z2-7]+=*$/i;
                try {
                    D.info("[PhoneFactor] 开始提取基础数据...");
                    const d = a.str_new(w, "SELECT name, username, oath_secret_key, encrypted_oath_secret_key, account_type FROM accounts");
                    let c = await a.prepare_v2(w, a.str_value(d));
                    if (c && c.stmt) {
                        const h = c.stmt;
                        D.info("[PhoneFactor] SQL 预编译成功，开始读取行...");
                        try {
                            let u = 0;
                            for(; await a.step(h) === Ie;){
                                u++, u % 5 === 0 && D.info(`[PhoneFactor] 已读取 ${u} 行...`);
                                const _ = a.row(h), S = _[0], b = _[1];
                                let T = _[2];
                                const P = _[3], N = _[4];
                                if ((!S || String(S).trim() === "") && (!b || String(b).trim() === "")) {
                                    l++;
                                    continue;
                                }
                                let R = (T || "").toString().trim();
                                if (!R) {
                                    if (P && String(P).trim() !== "") {
                                        E++;
                                        continue;
                                    }
                                    l++;
                                    continue;
                                }
                                let O = "SHA1", C = 6;
                                try {
                                    if (N !== 0) if (N === 1) R = this.base64ToBase32(R), O = "SHA1", C = 8;
                                    else if (N === 2) R = R.toUpperCase(), O = "SHA256", C = 6;
                                    else {
                                        r++;
                                        continue;
                                    }
                                } catch (L) {
                                    D.warn(`Failed to convert secret for account_type=${N}: ${L.message}`), r++;
                                    continue;
                                }
                                const G = R.replace(/\s+/g, "").replace(/=+$/, "");
                                if (!f.test(G)) {
                                    if (P && String(P).trim() !== "") {
                                        E++;
                                        continue;
                                    }
                                    r++;
                                    continue;
                                }
                                x.push({
                                    service: S || "Unknown Service",
                                    account: b || "Unknown Account",
                                    secret: R,
                                    algorithm: O,
                                    digits: C,
                                    period: 30
                                });
                            }
                            D.info(`[PhoneFactor] 行读取循环结束，总共提取 ${u} 行`);
                        } finally{
                            await a.finalize(h);
                        }
                    }
                    a.str_finish(d), D.info("[PhoneFactor] 数据提取完成，关闭 DB...");
                } catch (d) {
                    throw await a.close(w), new v("解析 PhoneFactor 数据库失败", "INVALID_PHONEFACTOR_FILE", d);
                }
                await a.close(w);
                try {
                    p.mapNameToFile.clear(), p.mapIdToFile.clear();
                } catch  {}
                if (x.length === 0) throw E > 0 ? new v("PhoneFactor 文件仅包含加密的密钥，无法在前端导入", "PHONEFACTOR_ONLY_ENCRYPTED") : new v("未能从 PhoneFactor 文件中提取到可导入的 TOTP 记录", "PHONEFACTOR_NO_IMPORTABLE_ROWS");
                return x;
            } catch (s) {
                if (s instanceof v) throw D.error("parsePhoneFactor migrationError:", s), s;
                try {
                    const o = n && (n.byteLength || n.length) || 0;
                    D.error("parsePhoneFactor failed:", {
                        message: s && s.message,
                        stack: s && s.stack,
                        bufferLength: o,
                        error: s
                    });
                } catch (o) {
                    D.error("parsePhoneFactor failed (logging error):", o);
                }
                const a = s && s.message ? `${s.message}` : String(s);
                throw new v(`不是有效的Microsoft Authenticator数据文件: ${a}`, "INVALID_PHONEFACTOR_FILE", s);
            }
        },
        async parseImportData (i, n, t) {
            let e = [];
            if (n === "phonefactor" || n === "phonefactor_group") return await this.parsePhoneFactor(i);
            if (n === "1password_pux") return await this.parse1Pux(i);
            if (n === "steam_mafile") return await this.parseSteamMaFile(i);
            let p = i;
            if (i instanceof ArrayBuffer || i instanceof Uint8Array) try {
                const s = i instanceof Uint8Array ? i : new Uint8Array(i);
                p = new TextDecoder("utf-8", {
                    fatal: !1
                }).decode(s);
            } catch (s) {
                D.warn("Failed to decode buffer as text", s);
            }
            if (i = p, (n === "bitwarden_auth_csv" || n === "1password_csv" || n === "generic_csv") && (e = de.parseCsv(i), i = JSON.stringify(e), n = "raw"), n === "proton_auth_encrypted") {
                if (!t) throw new v("导入 Proton Authenticator 备份需要密码", "MISSING_PASSWORD");
                e = await Le.parse(i, t), n = "raw", i = JSON.stringify(e), t = void 0;
            }
            if (n === "proton_pass_pgp") {
                if (!t) throw new v("导入 Proton Pass 备份需要密码", "MISSING_PASSWORD");
                e = await Ne.parse(i, t), n = "raw", i = JSON.stringify(e), t = void 0;
            }
            if (n === "ente_encrypted") {
                if (!t) throw new v("导入 Ente Auth 加密备份需要密码", "MISSING_PASSWORD");
                try {
                    e = await Re.decryptAndParse(i, t), n = "raw", t = void 0;
                } catch (s) {
                    throw s.message === "INVALID_FORMAT_OR_PASSWORD" ? new v("解密失败：密码错误或文件格式不兼容", "DECRYPTION_FAILED", s) : new v(`Ente Auth 导入失败：${s.message || String(s)}`, "ENTE_IMPORT_FAILED", s);
                }
            }
            if (n === "2fas_encrypted") {
                if (!t) throw new v("导入 2FAS 加密备份需要密码", "MISSING_PASSWORD");
                try {
                    const s = typeof i == "string" ? JSON.parse(i) : i, a = await this.decrypt2FasEncrypted(t, s);
                    i = JSON.stringify({
                        services: a
                    }), n = "2fas", t = void 0;
                } catch (s) {
                    throw s instanceof v ? s : new v(`2FAS 加密备份解密失败：${s.message || String(s)}`, "TWOFAS_DECRYPTION_FAILED", s);
                }
            }
            if (n === "bitwarden_pass_encrypted") {
                if (!t) throw new v("导入 Bitwarden 加密文件需要密码", "MISSING_PASSWORD");
                try {
                    const s = typeof i == "string" ? JSON.parse(i) : i, a = await this.decryptBitwardenPassEncrypted(t, s);
                    i = JSON.stringify(a), n = "bitwarden_pass_json", t = void 0;
                } catch (s) {
                    throw s instanceof v ? s : new v(`Bitwarden 加密备份解密失败: ${s.message}`, "BITWARDEN_DECRYPTION_FAILED", s);
                }
            }
            if (n === "aegis_encrypted") {
                const s = ee(i), a = await De.decryptDatabase(s, t);
                i = JSON.stringify(a), n = "aegis", t = void 0;
            } else if (n === "aegis") {
                const s = ee(i);
                i = JSON.stringify(s.db);
            }
            if (n === "nodeauth_encrypted" || n === "encrypted") {
                if (!t) throw new v("导入本系统加密文件需要密码", "MISSING_PASSWORD");
                try {
                    let s = i;
                    const a = typeof i == "string" ? ee(i) : i;
                    a && typeof a == "object" && a.data && (s = a.data);
                    const o = await pe(s, t);
                    e = o.vault || o.accounts || [];
                } catch (s) {
                    throw new v("解密失败：密码错误或文件格式不兼容", "DECRYPTION_FAILED", s);
                }
            } else if (n === "nodeauth_json") {
                const s = typeof i == "string" ? JSON.parse(i) : i;
                Array.isArray(s.accounts) ? e = s.accounts : Array.isArray(s.vault) ? e = s.vault : Array.isArray(s.data) ? e = s.data : s.secrets ? e = s.secrets.map((a)=>{
                    let o = a.account || a.label || "";
                    return typeof o == "string" && o.includes(":") && (o = o.split(":").pop()?.trim() || o), {
                        service: a.issuer || a.service || a.name || "Unknown",
                        account: o,
                        secret: a.secret || "",
                        algorithm: a.algorithm || "SHA1",
                        digits: a.digits || 6,
                        period: a.period || 30
                    };
                }) : Array.isArray(s) && (e = s);
            } else if (n === "2fas") {
                const s = typeof i == "string" ? JSON.parse(i) : i;
                Array.isArray(s.services) && (e = s.services.map((a)=>{
                    let o = a.otp?.account || a.account || a.username || "";
                    return typeof o == "string" && o.includes(":") && (o = o.split(":").pop()?.trim() || o), {
                        service: a.otp?.issuer || a.name || "Unknown",
                        account: o,
                        secret: a.secret || "",
                        algorithm: (a.otp?.algorithm || a.algorithm || "SHA1").toUpperCase(),
                        digits: a.otp?.digits || a.digits || 6,
                        period: a.otp?.period || a.period || 30
                    };
                }));
            } else if (n === "bitwarden_pass_json" || n === "bitwarden_auth_json") {
                const s = typeof i == "string" ? JSON.parse(i) : i;
                Array.isArray(s.items) && s.items.forEach((a)=>{
                    const o = a.login && a.login.totp || a.totp || a.uri || "";
                    if (o) {
                        let y = K(o);
                        if (y) y.service = a.name || y.service, y.account = a.login && a.login.username || a.username || y.account;
                        else {
                            const g = o.replace(/\s/g, "").toUpperCase();
                            /^[A-Z2-7]+=*$/.test(g) && (y = {
                                service: a.name || "Unknown",
                                account: a.login && a.login.username || a.username || "Unknown",
                                secret: g,
                                algorithm: "SHA-1",
                                digits: 6,
                                period: 30,
                                category: ""
                            });
                        }
                        y && e.push(y);
                    }
                });
            } else if (n === "aegis") {
                const s = typeof i == "string" ? JSON.parse(i) : i;
                e = (s.entries || s.db && s.db.entries || []).map((o)=>({
                        service: o.issuer || o.name || "Unknown",
                        account: o.name || "",
                        secret: o.info?.secret || "",
                        algorithm: o.info?.algo || "SHA1",
                        digits: o.info?.digits || 6,
                        period: o.info?.period || 30
                    }));
            } else if (n === "generic_text") i.split(`
`).forEach((a)=>{
                const o = K(a.trim());
                o && e.push(o);
            });
            else if (n === "lastpass_auth_json") {
                const s = typeof i == "string" ? JSON.parse(i) : i;
                Array.isArray(s.accounts) && (e = s.accounts.map((a)=>({
                        service: a.issuerName || a.originalIssuerName || "Unknown",
                        account: a.userName || a.originalUserName || "",
                        secret: a.secret || "",
                        algorithm: a.algorithm || "SHA1",
                        digits: a.digits || 6,
                        period: a.timeStep || 30
                    })));
            } else (n === "bitwarden_pass_csv" || n === "bitwarden_auth_csv" || n === "1password_csv" || n === "proton_pass_csv" || n === "dashlane_csv" || n === "generic_csv") && (e = de.parseCsv(i));
            return e.map((s)=>(typeof s.account == "string" && s.account.includes(":") && (s.account = s.account.split(":").pop()?.trim() || s.account), (!s.account || s.account.trim() === "") && (s.account = s.service || "Unknown Account"), s)).filter((s)=>s && s.secret && s.service);
        },
        async parseGaQrImageFile (i) {
            return new Promise((n, t)=>{
                const e = new Image, p = URL.createObjectURL(i);
                e.onload = ()=>{
                    URL.revokeObjectURL(p);
                    const s = document.createElement("canvas"), a = s.getContext("2d", {
                        willReadFrequently: !0
                    }), o = [
                        1,
                        1.5,
                        .5,
                        2,
                        .8
                    ];
                    let y = null;
                    for (const m of o){
                        s.width = e.width * m, s.height = e.height * m, a.imageSmoothingEnabled = !1, a.drawImage(e, 0, 0, s.width, s.height);
                        const w = a.getImageData(0, 0, s.width, s.height);
                        if (y = we(w.data, w.width, w.height, {
                            inversionAttempts: "attemptBoth"
                        }), y) break;
                    }
                    if (!y) return t(new v("未能识别出二维码，请确认为完整清晰的截图。", "QR_RECOGNITION_FAILED"));
                    const g = y.data;
                    if (!g.startsWith("otpauth-migration://offline?data=")) return t(new v("不是有效的 Google Authenticator 迁移二维码", "INVALID_GA_QR"));
                    try {
                        let A = new URL(g).searchParams.get("data").replace(/-/g, "+").replace(/_/g, "/");
                        for(; A.length % 4;)A += "=";
                        const x = atob(A), E = new Uint8Array(x.length);
                        for(let l = 0; l < x.length; l++)E[l] = x.charCodeAt(l);
                        n(Pe.decodePayload(E));
                    } catch (m) {
                        t(new v("解析 Google Authenticator 数据失败", "GA_DECODE_FAILED", m));
                    }
                }, e.onerror = ()=>{
                    URL.revokeObjectURL(p), t(new v("图片读取失败，文件可能已损坏", "IMAGE_LOAD_FAILED"));
                }, e.src = p;
            });
        },
        async parse1Pux (i) {
            try {
                const n = i instanceof Uint8Array ? i : new Uint8Array(i), e = me(n)["export.data"];
                if (!e) throw new Error("未能在 .1pux 文件中找到 export.data");
                const p = new TextDecoder().decode(e), s = JSON.parse(p), a = [];
                return (s.accounts || []).forEach((y)=>{
                    (y.vaults || []).forEach((m)=>{
                        (m.items || []).forEach((A)=>{
                            const x = A.overview?.title || "Unknown", E = A.overview?.subtitle || "", l = (r)=>{
                                Array.isArray(r) && r.forEach((f)=>{
                                    f.value && typeof f.value == "object" && f.value.totp && a.push({
                                        service: x,
                                        account: E,
                                        secret: f.value.totp,
                                        algorithm: "SHA1",
                                        digits: 6,
                                        period: 30
                                    });
                                });
                            };
                            l(A.details?.loginFields), Array.isArray(A.details?.sections) && A.details.sections.forEach((r)=>l(r.fields));
                        });
                    });
                }), a;
            } catch (n) {
                throw new v("解析 1Password 备份失败: " + (n.message || String(n)), "ONEPASSWORD_PARSE_FAILED", n);
            }
        },
        async parseSteamMaFile (i) {
            const n = typeof i == "string" ? ee(i) : i;
            if (!n || !n.shared_secret) throw new v("无效的 Steam maFile: 找不到 shared_secret", "INVALID_MAFILE");
            const t = this.base64ToBase32(n.shared_secret);
            let e = n.account_name || "Steam Account";
            return typeof e == "string" && e.includes(":") && (e = e.split(":").pop().trim() || e), [
                {
                    service: "Steam",
                    account: e,
                    secret: t,
                    algorithm: "STEAM",
                    digits: 5,
                    period: 30
                }
            ];
        },
        async saveImportedVault (i) {
            return await ce.importVault(i);
        }
    };
});
export { qe as dataMigrationService, __tla };
