module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
const db = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    log: ("TURBOPACK compile-time truthy", 1) ? [
        'warn',
        'error'
    ] : "TURBOPACK unreachable"
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = db;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearSessionCookie",
    ()=>clearSessionCookie,
    "createSession",
    ()=>createSession,
    "deleteSession",
    ()=>deleteSession,
    "getSession",
    ()=>getSession,
    "setSessionCookie",
    ()=>setSessionCookie
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
;
async function createSession(userId, userType, tenantId) {
    const sessionToken = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    ;
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].session.create({
        data: {
            sessionToken,
            userId,
            userType,
            tenantId: tenantId || null,
            expires
        }
    });
    return sessionToken;
}
async function getSession() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const sessionToken = cookieStore.get('session_token')?.value;
    if (!sessionToken) return null;
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].session.findUnique({
        where: {
            sessionToken
        }
    });
    if (!session) return null;
    if (new Date() > session.expires) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].session.delete({
            where: {
                sessionToken
            }
        });
        return null;
    }
    let authSession = {
        userId: session.userId,
        userType: session.userType,
        tenantId: session.tenantId || undefined
    };
    if (session.userType === 'central') {
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].centralUser.findUnique({
            where: {
                id: session.userId
            }
        });
        if (user) {
            authSession.username = user.username;
            authSession.namaUser = user.username;
            authSession.role = user.role;
            authSession.jabatan = user.jabatan || undefined;
        }
    } else if (session.userType === 'tenant' && session.tenantId) {
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].tenantUser.findUnique({
            where: {
                id: session.userId
            }
        });
        const tenant = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].tenant.findUnique({
            where: {
                id: session.tenantId
            }
        });
        if (user && tenant) {
            authSession.namaUser = user.namaUser;
            authSession.role = user.role;
            authSession.jabatan = user.jabatan || undefined;
            authSession.tenantName = tenant.namaPerusahaan;
            authSession.tenantId = tenant.id;
        }
    }
    return authSession;
}
async function deleteSession() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const sessionToken = cookieStore.get('session_token')?.value;
    if (sessionToken) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].session.deleteMany({
            where: {
                sessionToken
            }
        });
    }
}
function setSessionCookie(sessionToken) {
    return `session_token=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${24 * 60 * 60}`;
}
function clearSessionCookie() {
    return 'session_token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0';
}
}),
"[project]/src/app/api/tenant/arus-kas/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
;
;
;
function isCashAccount(tipeAkun) {
    const tipe = tipeAkun.toLowerCase();
    return tipe.includes('kas') || tipe.includes('bank');
}
function isAssetAccount(tipeAkun) {
    const tipe = tipeAkun.toLowerCase();
    return tipe.includes('aset') || tipe.includes('persediaan') || tipe.includes('piutang');
}
function isFinancingAccount(tipeAkun) {
    const tipe = tipeAkun.toLowerCase();
    return tipe.includes('utang') || tipe.includes('ekuitas');
}
async function GET(request) {
    try {
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSession"])();
        if (!session || session.userType !== 'tenant' || !session.tenantId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Akses ditolak'
            }, {
                status: 403
            });
        }
        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get('startDate') || '';
        const endDate = searchParams.get('endDate') || '';
        const tenantId = session.tenantId;
        // Get all Kas & Bank accounts for this tenant
        const cashAccounts = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].akun.findMany({
            where: {
                tenantId,
                tipeAkun: {
                    contains: 'Kas'
                }
            }
        });
        const bankAccounts = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].akun.findMany({
            where: {
                tenantId,
                tipeAkun: {
                    contains: 'Bank'
                }
            }
        });
        const allCashAccounts = [
            ...cashAccounts,
            ...bankAccounts
        ];
        const cashAccountCodes = new Set(allCashAccounts.map((a)=>a.kodeAkun));
        // Calculate beginning cash balance (saldoAwal of all cash accounts)
        const saldoAwalKas = allCashAccounts.reduce((sum, a)=>sum + a.saldoAwal, 0);
        // Build journal filter with date range
        const jurnalWhere = {
            tenantId,
            isApproved: true
        };
        if (startDate || endDate) {
            const tanggalFilter = {};
            if (startDate) tanggalFilter.gte = new Date(startDate);
            if (endDate) tanggalFilter.lte = new Date(endDate);
            jurnalWhere.tanggal = tanggalFilter;
        }
        // Get all journal entries that have cash account details
        const cashJournalDetails = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].jurnalDetail.findMany({
            where: {
                kodeAkun: {
                    in: Array.from(cashAccountCodes)
                },
                jurnal: jurnalWhere
            },
            include: {
                jurnal: {
                    select: {
                        id: true,
                        tanggal: true,
                        keterangan: true,
                        noBukti: true,
                        tipe: true
                    }
                }
            }
        });
        // Get all accounts for classification lookup
        const allAccounts = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].akun.findMany({
            where: {
                tenantId
            }
        });
        const accountMap = new Map(allAccounts.map((a)=>[
                a.kodeAkun,
                a
            ]));
        // Group by journal entry to determine category
        const journalGroups = new Map();
        for (const detail of cashJournalDetails){
            const jurnalId = detail.jurnalId;
            if (!journalGroups.has(jurnalId)) {
                journalGroups.set(jurnalId, []);
            }
            journalGroups.get(jurnalId).push(detail);
        }
        // For each journal that has cash movements, look at the OTHER accounts
        // to determine the category (Operasi, Investasi, Pendanaan)
        const operasiItems = [];
        const investasiItems = [];
        const pendanaanItems = [];
        for (const [jurnalId, cashDetails] of journalGroups){
            // Get ALL details for this journal entry to find the non-cash accounts
            const allDetails = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].jurnalDetail.findMany({
                where: {
                    jurnalId
                }
            });
            const journalInfo = cashDetails[0].jurnal;
            // Calculate net cash effect for this journal entry
            let cashDebit = 0;
            let cashKredit = 0;
            for (const cd of cashDetails){
                cashDebit += cd.debit;
                cashKredit += cd.kredit;
            }
            // Net cash inflow = debit - kredit (positive = cash received, negative = cash paid)
            const netCashEffect = cashDebit - cashKredit;
            // Find the non-cash accounts in this entry to determine category
            const nonCashDetails = allDetails.filter((d)=>!cashAccountCodes.has(d.kodeAkun));
            // Determine category based on the non-cash account types
            let category = 'operasi';
            if (nonCashDetails.length > 0) {
                // Check if any non-cash account is asset (besides cash)
                const hasAssetAccount = nonCashDetails.some((d)=>{
                    const acc = accountMap.get(d.kodeAkun);
                    return acc && isAssetAccount(acc.tipeAkun) && !isCashAccount(acc.tipeAkun);
                });
                const hasFinancingAccount = nonCashDetails.some((d)=>{
                    const acc = accountMap.get(d.kodeAkun);
                    return acc && isFinancingAccount(acc.tipeAkun);
                });
                if (hasFinancingAccount) {
                    category = 'pendanaan';
                } else if (hasAssetAccount) {
                    category = 'investasi';
                } else {
                    category = 'operasi';
                }
            } else {
                // If only cash accounts are involved, categorize by journal type
                const tipe = journalInfo.tipe.toLowerCase();
                if (tipe === 'penjualan' || tipe === 'kas_masuk') {
                    category = 'operasi';
                } else if (tipe === 'pembelian' || tipe === 'kas_keluar' || tipe === 'umum') {
                    category = 'operasi';
                } else {
                    category = 'operasi';
                }
            }
            // Generate description based on journal info and category
            const keterangan = journalInfo.keterangan || `Jurnal ${journalInfo.noBukti || jurnalId.slice(-6)}`;
            const item = {
                keterangan,
                jumlah: Math.round(netCashEffect)
            };
            if (category === 'operasi') {
                operasiItems.push(item);
            } else if (category === 'investasi') {
                investasiItems.push(item);
            } else {
                pendanaanItems.push(item);
            }
        }
        // Also need to calculate cash movements that occurred before the date range
        // to compute the opening cash balance for the period
        let saldoAwalPeriod = saldoAwalKas;
        if (startDate) {
            // Calculate cash balance up to startDate
            const beforeDateJurnalWhere = {
                tenantId,
                isApproved: true,
                tanggal: {
                    lt: new Date(startDate)
                }
            };
            const beforeCashDetails = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].jurnalDetail.aggregate({
                _sum: {
                    debit: true,
                    kredit: true
                },
                where: {
                    kodeAkun: {
                        in: Array.from(cashAccountCodes)
                    },
                    jurnal: beforeDateJurnalWhere
                }
            });
            const beforeDebit = beforeCashDetails._sum.debit || 0;
            const beforeKredit = beforeCashDetails._sum.kredit || 0;
            saldoAwalPeriod = Math.round(saldoAwalKas + beforeDebit - beforeKredit);
        }
        // Calculate totals for each category
        const totalOperasi = operasiItems.reduce((sum, item)=>sum + item.jumlah, 0);
        const totalInvestasi = investasiItems.reduce((sum, item)=>sum + item.jumlah, 0);
        const totalPendanaan = pendanaanItems.reduce((sum, item)=>sum + item.jumlah, 0);
        const saldoAkhirKas = Math.round(saldoAwalPeriod + totalOperasi + totalInvestasi + totalPendanaan);
        // Format periode
        let periode = 'Seluruh Periode';
        if (endDate) {
            const end = new Date(endDate);
            const months = [
                'Januari',
                'Februari',
                'Maret',
                'April',
                'Mei',
                'Juni',
                'Juli',
                'Agustus',
                'September',
                'Oktober',
                'November',
                'Desember'
            ];
            periode = `Per ${end.getDate()} ${months[end.getMonth()]} ${end.getFullYear()}`;
        }
        const responseData = {
            periode,
            saldoAwalKas: Math.round(saldoAwalPeriod),
            operasi: {
                items: operasiItems,
                total: Math.round(totalOperasi)
            },
            investasi: {
                items: investasiItems,
                total: Math.round(totalInvestasi)
            },
            pendanaan: {
                items: pendanaanItems,
                total: Math.round(totalPendanaan)
            },
            saldoAkhirKas
        };
        // Audit log (non-blocking)
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].auditLog.create({
                data: {
                    tenantId: session.tenantId,
                    userId: session.userId,
                    username: session.namaUser || null,
                    action: 'READ',
                    resource: 'arus_kas',
                    details: JSON.stringify({
                        startDate,
                        endDate
                    })
                }
            });
        } catch  {}
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(responseData);
    } catch (error) {
        console.error('Get arus kas error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Terjadi kesalahan server'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__441bda3e._.js.map