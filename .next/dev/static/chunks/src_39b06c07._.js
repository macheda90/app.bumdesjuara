(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
        isAuthenticated: false,
        user: null,
        currentView: 'landing',
        isLoading: false,
        centralTab: 'tenants',
        tenantTab: 'dashboard',
        setAuth: (user)=>{
            const view = user.userType === 'central' ? 'central-dashboard' : 'tenant-dashboard';
            set({
                isAuthenticated: true,
                user,
                currentView: view,
                centralTab: 'tenants',
                tenantTab: 'dashboard'
            });
        },
        clearAuth: ()=>{
            set({
                isAuthenticated: false,
                user: null,
                currentView: 'landing',
                centralTab: 'tenants',
                tenantTab: 'dashboard'
            });
        },
        setCurrentView: (view)=>{
            set({
                currentView: view
            });
        },
        setLoading: (loading)=>{
            set({
                isLoading: loading
            });
        },
        checkAuth: async ()=>{
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    if (data.user) {
                        const view = data.user.userType === 'central' ? 'central-dashboard' : 'tenant-dashboard';
                        set({
                            isAuthenticated: true,
                            user: data.user,
                            currentView: view
                        });
                    }
                }
            } catch  {
            // Not authenticated
            }
        },
        logout: async ()=>{
            try {
                await fetch('/api/auth/logout', {
                    method: 'POST'
                });
            } catch  {
            // ignore
            }
            set({
                isAuthenticated: false,
                user: null,
                currentView: 'landing',
                centralTab: 'tenants',
                tenantTab: 'dashboard'
            });
        },
        setCentralTab: (tab)=>{
            set({
                centralTab: tab
            });
        },
        setTenantTab: (tab)=>{
            set({
                tenantTab: tab
            });
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/tenant-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatCurrency",
    ()=>formatCurrency,
    "formatMonth",
    ()=>formatMonth,
    "getGreeting",
    ()=>getGreeting,
    "getJurnalTipeBadge",
    ()=>getJurnalTipeBadge,
    "getTipeAkunColor",
    ()=>getTipeAkunColor,
    "getTransactionTypeInfo",
    ()=>getTransactionTypeInfo
]);
// ─── Tenant Dashboard Utility Functions ────────────────────────────────────────
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$to$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownToLine$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down-to-line.js [app-client] (ecmascript) <export default as ArrowDownToLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpFromLine$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-from-line.js [app-client] (ecmascript) <export default as ArrowUpFromLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
;
const formatCurrency = (amount)=>{
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};
const formatMonth = (monthStr)=>{
    const [year, month] = monthStr.split('-');
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'Mei',
        'Jun',
        'Jul',
        'Agu',
        'Sep',
        'Okt',
        'Nov',
        'Des'
    ];
    return `${months[parseInt(month) - 1]} ${year.slice(2)}`;
};
function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return 'Pagi';
    if (hour >= 11 && hour < 15) return 'Siang';
    if (hour >= 15 && hour < 18) return 'Sore';
    return 'Malam';
}
function getTransactionTypeInfo(tipe) {
    switch(tipe){
        case 'penjualan':
            return {
                label: 'Penjualan',
                color: 'text-[#10b981]',
                bgColor: 'bg-[#10b981]/10',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"]
            };
        case 'pembelian':
            return {
                label: 'Pembelian',
                color: 'text-[#f59e0b]',
                bgColor: 'bg-[#f59e0b]/10',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"]
            };
        case 'kas_masuk':
            return {
                label: 'Kas Masuk',
                color: 'text-[#14b8a6]',
                bgColor: 'bg-[#14b8a6]/10',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$to$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownToLine$3e$__["ArrowDownToLine"]
            };
        case 'kas_keluar':
            return {
                label: 'Kas Keluar',
                color: 'text-[#ef4444]',
                bgColor: 'bg-[#ef4444]/10',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpFromLine$3e$__["ArrowUpFromLine"]
            };
        default:
            return {
                label: 'Umum',
                color: 'text-[#8fa8c8]',
                bgColor: 'bg-white/[0.06]',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"]
            };
    }
}
function getTipeAkunColor(tipe) {
    const t = tipe.toLowerCase();
    if (t.includes('kas') || t.includes('bank')) {
        return {
            text: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            border: 'border-l-emerald-500',
            dot: 'bg-emerald-500'
        };
    }
    if (t.includes('piutang')) {
        return {
            text: 'text-teal-400',
            bg: 'bg-teal-500/10',
            border: 'border-l-teal-500',
            dot: 'bg-teal-500'
        };
    }
    if (t.includes('utang')) {
        return {
            text: 'text-red-400',
            bg: 'bg-red-500/10',
            border: 'border-l-red-500',
            dot: 'bg-red-500'
        };
    }
    if (t.includes('pendapatan')) {
        return {
            text: 'text-green-400',
            bg: 'bg-green-500/10',
            border: 'border-l-green-500',
            dot: 'bg-green-500'
        };
    }
    if (t.includes('beban') || t.includes('hpp')) {
        return {
            text: 'text-orange-400',
            bg: 'bg-orange-500/10',
            border: 'border-l-orange-500',
            dot: 'bg-orange-500'
        };
    }
    if (t.includes('persediaan')) {
        return {
            text: 'text-amber-400',
            bg: 'bg-amber-500/10',
            border: 'border-l-amber-500',
            dot: 'bg-amber-500'
        };
    }
    if (t.includes('aset')) {
        return {
            text: 'text-cyan-400',
            bg: 'bg-cyan-500/10',
            border: 'border-l-cyan-500',
            dot: 'bg-cyan-500'
        };
    }
    if (t.includes('ekuitas')) {
        return {
            text: 'text-purple-400',
            bg: 'bg-purple-500/10',
            border: 'border-l-purple-500',
            dot: 'bg-purple-500'
        };
    }
    return {
        text: 'text-[#8fa8c8]',
        bg: 'bg-white/[0.06]',
        border: 'border-l-[#8fa8c8]',
        dot: 'bg-[#8fa8c8]'
    };
}
function getJurnalTipeBadge(tipe) {
    switch(tipe){
        case 'kas_masuk':
            return {
                label: 'Kas Masuk',
                color: 'text-[#14b8a6]',
                bgColor: 'bg-[#14b8a6]/10'
            };
        case 'kas_keluar':
            return {
                label: 'Kas Keluar',
                color: 'text-[#ef4444]',
                bgColor: 'bg-[#ef4444]/10'
            };
        case 'penjualan':
            return {
                label: 'Penjualan',
                color: 'text-[#10b981]',
                bgColor: 'bg-[#10b981]/10'
            };
        case 'pembelian':
            return {
                label: 'Pembelian',
                color: 'text-[#f59e0b]',
                bgColor: 'bg-[#f59e0b]/10'
            };
        case 'simpanan':
            return {
                label: 'Simpanan',
                color: 'text-[#8b5cf6]',
                bgColor: 'bg-[#8b5cf6]/10'
            };
        case 'pinjaman':
            return {
                label: 'Pinjaman',
                color: 'text-[#ec4899]',
                bgColor: 'bg-[#ec4899]/10'
            };
        default:
            return {
                label: 'Umum',
                color: 'text-[#8fa8c8]',
                bgColor: 'bg-white/[0.06]'
            };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/tenant-sidebar.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sidebarGroups",
    ()=>sidebarGroups
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list.js [app-client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$piggy$2d$bank$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PiggyBank$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/piggy-bank.js [app-client] (ecmascript) <export default as PiggyBank>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scale.js [app-client] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scroll$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScrollText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scroll-text.js [app-client] (ecmascript) <export default as ScrollText>");
;
const sidebarGroups = [
    {
        label: 'Utama',
        items: [
            {
                id: 'dashboard',
                label: 'Dashboard',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
            },
            {
                id: 'jurnal',
                label: 'Jurnal',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scroll$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScrollText$3e$__["ScrollText"]
            },
            {
                id: 'pengaturan',
                label: 'Pengaturan',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"]
            }
        ]
    },
    {
        label: 'Akuntansi',
        items: [
            {
                id: 'akun',
                label: 'Daftar Akun',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"]
            },
            {
                id: 'laporan',
                label: 'Laporan',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"]
            },
            {
                id: 'buku-besar',
                label: 'Buku Besar',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"]
            },
            {
                id: 'neraca-saldo',
                label: 'Neraca Saldo',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"]
            },
            {
                id: 'arus-kas',
                label: 'Arus Kas',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
            }
        ]
    },
    {
        label: 'Transaksi',
        items: [
            {
                id: 'penjualan',
                label: 'Penjualan',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"]
            },
            {
                id: 'pembelian',
                label: 'Pembelian',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"]
            },
            {
                id: 'persediaan',
                label: 'Persediaan',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"]
            }
        ]
    },
    {
        label: 'Simpan Pinjam',
        items: [
            {
                id: 'simpanan',
                label: 'Simpanan',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$piggy$2d$bank$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PiggyBank$3e$__["PiggyBank"]
            },
            {
                id: 'pinjaman',
                label: 'Pinjaman',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"]
            }
        ]
    },
    {
        label: 'Kontak',
        items: [
            {
                id: 'pelanggan',
                label: 'Pelanggan',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
            },
            {
                id: 'pemasok',
                label: 'Pemasok',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"]
            }
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/landing.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$login$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/login.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$central$2d$dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/central-dashboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$tenant$2d$dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/tenant-dashboard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function Home() {
    _s();
    const { currentView, checkAuth, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            checkAuth();
        }
    }["Home.useEffect"], [
        checkAuth
    ]);
    const handleNavigate = (view)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"].getState().setCurrentView(view);
    };
    const renderView = ()=>{
        switch(currentView){
            case 'landing':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Landing"], {
                    onNavigate: handleNavigate
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 24,
                    columnNumber: 16
                }, this);
            case 'login':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$login$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Login"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 26,
                    columnNumber: 16
                }, this);
            case 'central-dashboard':
                return isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$central$2d$dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CentralDashboard"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 28,
                    columnNumber: 34
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Landing"], {
                    onNavigate: handleNavigate
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 28,
                    columnNumber: 57
                }, this);
            case 'tenant-dashboard':
                return isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$tenant$2d$dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TenantDashboard"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 30,
                    columnNumber: 34
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Landing"], {
                    onNavigate: handleNavigate
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 30,
                    columnNumber: 56
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Landing"], {
                    onNavigate: handleNavigate
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 32,
                    columnNumber: 16
                }, this);
        }
    };
    return renderView();
}
_s(Home, "OnICqSOs3dUR7sPH0ua9ZhhQtjc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_39b06c07._.js.map