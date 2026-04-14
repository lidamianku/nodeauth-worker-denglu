const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/qr-utils-BFVygUr2.js","assets/element-plus-CR1uB1eY.js","assets/vue-core-Daban9YF.js","assets/element-plus-Dh61In7b.css"])))=>i.map(i=>d[i]);
import { _ as o, __tla as __tla_0 } from "./pdf-utils-DATcFnLh.js";
let a, i;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    a = {
        SECURITY: [
            {
                name: "openpgp",
                loader: ()=>o(()=>import("./openpgp-DrHuyQ_D.js"), []),
                probe: "openpgp"
            },
            {
                name: "libsodium",
                loader: ()=>o(()=>import("./libsodium-wrappers-CYqOfR_H.js"), []),
                probe: "sodium"
            },
            {
                name: "hash-wasm",
                loader: ()=>o(()=>import("./hash-wasm-Dup_VHWH.js"), []),
                probe: "hash-wasm"
            }
        ],
        UTILITIES: [
            {
                name: "qrcode",
                loader: ()=>o(()=>import("./qr-utils-BFVygUr2.js").then((r)=>r.b), __vite__mapDeps([0,1,2,3])),
                probes: [
                    "qrcode",
                    "qrparser",
                    "vaultservice",
                    "login"
                ]
            },
            {
                name: "jsqr",
                loader: ()=>o(()=>import("./qr-utils-BFVygUr2.js").then((r)=>r.j), __vite__mapDeps([0,1,2,3])),
                probes: [
                    "jsqr",
                    "qrparser",
                    "datamigration"
                ]
            },
            {
                name: "fflate",
                loader: ()=>o(()=>import("./compression-utils-CXh1ITwj.js"), []),
                probes: [
                    "fflate",
                    "pako",
                    "zlib",
                    "datamigration"
                ]
            }
        ],
        ENGINES: [
            {
                name: "argon2",
                url: "/argon2.wasm",
                probe: "argon2"
            },
            {
                name: "sqlite",
                url: "/sql-wasm.wasm",
                probe: "sql-wasm"
            }
        ]
    };
    i = async function(r) {
        const e = [
            ...a.SECURITY,
            ...a.UTILITIES
        ].find((s)=>s.name === r);
        if (!e || !e.loader) throw new Error(`Resource '${r}' not found in registry.`);
        return await e.loader();
    };
});
export { a as O, i as l, __tla };
