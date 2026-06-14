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
"[project]/src/app/api/tenant/export/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
// ─── CSV Helpers ──────────────────────────────────────────────────────────────
function escapeCsvField(value) {
    const str = value === null || value === undefined ? '' : String(value);
    // If field contains semicolon, newline, or double quote, wrap in quotes
    if (str.includes(';') || str.includes('\n') || str.includes('"')) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}
function rowsToCsv(headers, rows) {
    const headerLine = headers.join(';');
    const dataLines = rows.map((row)=>row.map(escapeCsvField).join(';'));
    return [
        headerLine,
        ...dataLines
    ].join('\n');
}
function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}
function formatDateISO(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().slice(0, 10);
}
function formatCsvCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}
// ─── Account Balance Helpers ──────────────────────────────────────────────────
function isDebitNormal(tipeAkun) {
    const tipe = tipeAkun.toLowerCase();
    return tipe.includes('kas') || tipe.includes('bank') || tipe.includes('piutang') || tipe.includes('persediaan') || tipe.includes('aset') || tipe.includes('beban') || tipe.includes('hpp');
}
function isAssetAccount(tipeAkun) {
    const tipe = tipeAkun.toLowerCase();
    return tipe.includes('kas') || tipe.includes('bank') || tipe.includes('piutang') || tipe.includes('persediaan') || tipe.includes('aset');
}
function isCashAccount(tipeAkun) {
    const tipe = tipeAkun.toLowerCase();
    return tipe.includes('kas') || tipe.includes('bank');
}
async function calculateAccountBalance(kodeAkun, tenantId, tipeAkun, saldoAwal, startDate, endDate) {
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
    const debitSum = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].jurnalDetail.aggregate({
        _sum: {
            debit: true
        },
        where: {
            kodeAkun,
            jurnal: jurnalWhere
        }
    });
    const kreditSum = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].jurnalDetail.aggregate({
        _sum: {
            kredit: true
        },
        where: {
            kodeAkun,
            jurnal: jurnalWhere
        }
    });
    const debit = debitSum._sum.debit || 0;
    const kredit = kreditSum._sum.kredit || 0;
    if (isDebitNormal(tipeAkun)) {
        return Math.round(saldoAwal + debit - kredit);
    } else {
        return Math.round(saldoAwal + kredit - debit);
    }
}
// ─── Date Filter Builder ─────────────────────────────────────────────────────
function buildDateFilter(startDate, endDate) {
    if (!startDate && !endDate) return {};
    const tanggalFilter = {};
    if (startDate) tanggalFilter.gte = new Date(startDate);
    if (endDate) tanggalFilter.lte = new Date(endDate);
    return tanggalFilter;
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
        const type = searchParams.get('type') || '';
        const startDate = searchParams.get('startDate') || '';
        const endDate = searchParams.get('endDate') || '';
        const kodeAkun = searchParams.get('kodeAkun') || '';
        const validTypes = [
            'akun',
            'jurnal',
            'neraca',
            'laba-rugi',
            'neraca-saldo',
            'arus-kas',
            'buku-besar',
            'penjualan',
            'pembelian',
            'simpanan',
            'pinjaman',
            'persediaan',
            'pelanggan',
            'pemasok'
        ];
        if (!type || !validTypes.includes(type)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Tipe export tidak valid. Pilihan: ${validTypes.join(', ')}`
            }, {
                status: 400
            });
        }
        const tenantId = session.tenantId;
        const tenantName = session.tenantName || 'Perusahaan';
        const exportDate = formatDate(new Date());
        let csvContent = '';
        let filename = '';
        switch(type){
            // ─── Chart of Accounts ─────────────────────────────────────────────
            case 'akun':
                {
                    const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].akun.findMany({
                        where: {
                            tenantId
                        },
                        orderBy: [
                            {
                                kelompok: 'asc'
                            },
                            {
                                kodeAkun: 'asc'
                            }
                        ]
                    });
                    filename = `akun_${formatDateISO(new Date())}.csv`;
                    const headerRows = [
                        [
                            `Laporan: Daftar Akun`
                        ],
                        [
                            `Perusahaan: ${tenantName}`
                        ],
                        [
                            `Tanggal Export: ${exportDate}`
                        ],
                        []
                    ];
                    const headers = [
                        'Kode Akun',
                        'Nama Akun',
                        'Tipe Akun',
                        'Kelompok',
                        'Saldo Awal',
                        'Default'
                    ];
                    const rows = data.map((item)=>[
                            item.kodeAkun,
                            item.namaAkun,
                            item.tipeAkun,
                            item.kelompok || '',
                            formatCsvCurrency(item.saldoAwal),
                            item.isDefault ? 'Ya' : 'Tidak'
                        ]);
                    csvContent = [
                        ...headerRows.map((r)=>r.join(';')),
                        rowsToCsv(headers, rows)
                    ].join('\n');
                    break;
                }
            // ─── Journal Entries ───────────────────────────────────────────────
            case 'jurnal':
                {
                    const dateFilter = buildDateFilter(startDate, endDate);
                    const where = {
                        tenantId
                    };
                    if (Object.keys(dateFilter).length > 0) {
                        where.tanggal = dateFilter;
                    }
                    const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].jurnalUmum.findMany({
                        where,
                        orderBy: [
                            {
                                tanggal: 'desc'
                            },
                            {
                                createdAt: 'desc'
                            }
                        ],
                        include: {
                            details: {
                                orderBy: {
                                    debit: 'desc'
                                }
                            }
                        }
                    });
                    filename = `jurnal_${formatDateISO(new Date())}.csv`;
                    const periodeText = startDate && endDate ? `${formatDate(startDate)} s/d ${formatDate(endDate)}` : 'Seluruh Periode';
                    const headerRows = [
                        [
                            `Laporan: Jurnal Umum`
                        ],
                        [
                            `Perusahaan: ${tenantName}`
                        ],
                        [
                            `Periode: ${periodeText}`
                        ],
                        [
                            `Tanggal Export: ${exportDate}`
                        ],
                        []
                    ];
                    const headers = [
                        'Tanggal',
                        'Keterangan',
                        'No Bukti',
                        'Tipe',
                        'Disetujui',
                        'Kode Akun',
                        'Debit',
                        'Kredit',
                        'Keterangan Detail'
                    ];
                    const rows = [];
                    for (const j of data){
                        for(let i = 0; i < j.details.length; i++){
                            const d = j.details[i];
                            rows.push([
                                i === 0 ? formatDate(j.tanggal) : '',
                                i === 0 ? j.keterangan || '' : '',
                                i === 0 ? j.noBukti || '' : '',
                                i === 0 ? j.tipe : '',
                                i === 0 ? j.isApproved ? 'Ya' : 'Tidak' : '',
                                d.kodeAkun,
                                formatCsvCurrency(d.debit),
                                formatCsvCurrency(d.kredit),
                                d.keterangan || ''
                            ]);
                        }
                    }
                    csvContent = [
                        ...headerRows.map((r)=>r.join(';')),
                        rowsToCsv(headers, rows)
                    ].join('\n');
                    break;
                }
            // ─── Balance Sheet (Neraca) ────────────────────────────────────────
            case 'neraca':
                {
                    const akunList = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].akun.findMany({
                        where: {
                            tenantId,
                            kelompok: 'Neraca'
                        },
                        orderBy: {
                            kodeAkun: 'asc'
                        }
                    });
                    const accountBalances = await Promise.all(akunList.map(async (akun)=>{
                        const saldo = await calculateAccountBalance(akun.kodeAkun, tenantId, akun.tipeAkun, akun.saldoAwal, startDate, endDate);
                        return {
                            kodeAkun: akun.kodeAkun,
                            namaAkun: akun.namaAkun,
                            tipeAkun: akun.tipeAkun,
                            saldo
                        };
                    }));
                    // Also get laba ditahan
                    const labaRugiAkun = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].akun.findMany({
                        where: {
                            tenantId,
                            kelompok: 'Laba Rugi'
                        },
                        orderBy: {
                            kodeAkun: 'asc'
                        }
                    });
                    const labaRugiBalances = await Promise.all(labaRugiAkun.map(async (akun)=>{
                        const saldo = await calculateAccountBalance(akun.kodeAkun, tenantId, akun.tipeAkun, akun.saldoAwal, startDate, endDate);
                        return {
                            tipeAkun: akun.tipeAkun,
                            saldo
                        };
                    }));
                    const totalPendapatan = labaRugiBalances.filter((a)=>a.tipeAkun.toLowerCase().includes('pendapatan')).reduce((sum, a)=>sum + a.saldo, 0);
                    const totalBeban = Math.abs(labaRugiBalances.filter((a)=>a.tipeAkun.toLowerCase().includes('beban')).reduce((sum, a)=>sum + a.saldo, 0));
                    const totalHPP = Math.abs(labaRugiBalances.filter((a)=>a.tipeAkun.toLowerCase().includes('hpp')).reduce((sum, a)=>sum + a.saldo, 0));
                    const labaDitahan = totalPendapatan - totalBeban - totalHPP;
                    const asetItems = accountBalances.filter((a)=>isAssetAccount(a.tipeAkun));
                    const kewajibanItems = accountBalances.filter((a)=>{
                        const tipe = a.tipeAkun.toLowerCase();
                        return tipe.includes('utang') && !tipe.includes('piutang');
                    });
                    const ekuitasItems = accountBalances.filter((a)=>a.tipeAkun.toLowerCase().includes('ekuitas'));
                    const totalAset = asetItems.reduce((s, a)=>s + a.saldo, 0);
                    const totalKewajiban = kewajibanItems.reduce((s, a)=>s + a.saldo, 0);
                    const totalEkuitas = ekuitasItems.reduce((s, a)=>s + a.saldo, 0);
                    const periodeText = startDate && endDate ? `${formatDate(startDate)} s/d ${formatDate(endDate)}` : 'Seluruh Periode';
                    filename = `neraca_${formatDateISO(new Date())}.csv`;
                    const headerRows = [
                        [
                            `Laporan: Neraca (Balance Sheet)`
                        ],
                        [
                            `Perusahaan: ${tenantName}`
                        ],
                        [
                            `Periode: ${periodeText}`
                        ],
                        [
                            `Tanggal Export: ${exportDate}`
                        ],
                        []
                    ];
                    const rows = [];
                    // ASET section
                    rows.push([
                        'ASET',
                        '',
                        ''
                    ]);
                    for (const item of asetItems){
                        rows.push([
                            `  ${item.kodeAkun}`,
                            item.namaAkun,
                            formatCsvCurrency(item.saldo)
                        ]);
                    }
                    rows.push([
                        '',
                        'Total Aset',
                        formatCsvCurrency(totalAset)
                    ]);
                    rows.push([
                        '',
                        '',
                        ''
                    ]);
                    // KEWAJIBAN section
                    rows.push([
                        'KEWAJIBAN',
                        '',
                        ''
                    ]);
                    for (const item of kewajibanItems){
                        rows.push([
                            `  ${item.kodeAkun}`,
                            item.namaAkun,
                            formatCsvCurrency(item.saldo)
                        ]);
                    }
                    rows.push([
                        '',
                        'Total Kewajiban',
                        formatCsvCurrency(totalKewajiban)
                    ]);
                    rows.push([
                        '',
                        '',
                        ''
                    ]);
                    // EKUITAS section
                    rows.push([
                        'EKUITAS',
                        '',
                        ''
                    ]);
                    for (const item of ekuitasItems){
                        rows.push([
                            `  ${item.kodeAkun}`,
                            item.namaAkun,
                            formatCsvCurrency(item.saldo)
                        ]);
                    }
                    rows.push([
                        '',
                        'Laba Ditahan',
                        formatCsvCurrency(labaDitahan)
                    ]);
                    rows.push([
                        '',
                        'Total Ekuitas + Laba Ditahan',
                        formatCsvCurrency(totalEkuitas + labaDitahan)
                    ]);
                    rows.push([
                        '',
                        '',
                        ''
                    ]);
                    rows.push([
                        '',
                        'Total Kewajiban + Ekuitas',
                        formatCsvCurrency(totalKewajiban + totalEkuitas + labaDitahan)
                    ]);
                    const headers = [
                        'Kode Akun',
                        'Nama Akun',
                        'Jumlah'
                    ];
                    csvContent = [
                        ...headerRows.map((r)=>r.join(';')),
                        rowsToCsv(headers, rows)
                    ].join('\n');
                    break;
                }
            // ─── Income Statement (Laba Rugi) ─────────────────────────────────
            case 'laba-rugi':
                {
                    const akunList = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].akun.findMany({
                        where: {
                            tenantId,
                            kelompok: 'Laba Rugi'
                        },
                        orderBy: {
                            kodeAkun: 'asc'
                        }
                    });
                    const accountBalances = await Promise.all(akunList.map(async (akun)=>{
                        const saldo = await calculateAccountBalance(akun.kodeAkun, tenantId, akun.tipeAkun, akun.saldoAwal, startDate, endDate);
                        return {
                            kodeAkun: akun.kodeAkun,
                            namaAkun: akun.namaAkun,
                            tipeAkun: akun.tipeAkun,
                            saldo
                        };
                    }));
                    const pendapatanItems = accountBalances.filter((a)=>a.tipeAkun.toLowerCase().includes('pendapatan'));
                    const hppItems = accountBalances.filter((a)=>a.tipeAkun.toLowerCase().includes('hpp')).map((a)=>({
                            ...a,
                            saldo: Math.abs(a.saldo)
                        }));
                    const bebanItems = accountBalances.filter((a)=>a.tipeAkun.toLowerCase().includes('beban')).map((a)=>({
                            ...a,
                            saldo: Math.abs(a.saldo)
                        }));
                    const totalPendapatan = pendapatanItems.reduce((s, a)=>s + a.saldo, 0);
                    const totalHPP = hppItems.reduce((s, a)=>s + a.saldo, 0);
                    const totalBeban = bebanItems.reduce((s, a)=>s + a.saldo, 0);
                    const labaKotor = totalPendapatan - totalHPP;
                    const labaBersih = labaKotor - totalBeban;
                    const periodeText = startDate && endDate ? `${formatDate(startDate)} s/d ${formatDate(endDate)}` : 'Seluruh Periode';
                    filename = `laba-rugi_${formatDateISO(new Date())}.csv`;
                    const headerRows = [
                        [
                            `Laporan: Laba Rugi (Income Statement)`
                        ],
                        [
                            `Perusahaan: ${tenantName}`
                        ],
                        [
                            `Periode: ${periodeText}`
                        ],
                        [
                            `Tanggal Export: ${exportDate}`
                        ],
                        []
                    ];
                    const rows = [];
                    // PENDAPATAN
                    rows.push([
                        'PENDAPATAN',
                        '',
                        ''
                    ]);
                    for (const item of pendapatanItems){
                        rows.push([
                            `  ${item.kodeAkun}`,
                            item.namaAkun,
                            formatCsvCurrency(item.saldo)
                        ]);
                    }
                    rows.push([
                        '',
                        'Total Pendapatan',
                        formatCsvCurrency(totalPendapatan)
                    ]);
                    rows.push([
                        '',
                        '',
                        ''
                    ]);
                    // HPP
                    rows.push([
                        'HARGA POKOK PENJUALAN',
                        '',
                        ''
                    ]);
                    for (const item of hppItems){
                        rows.push([
                            `  ${item.kodeAkun}`,
                            item.namaAkun,
                            formatCsvCurrency(item.saldo)
                        ]);
                    }
                    rows.push([
                        '',
                        'Total HPP',
                        formatCsvCurrency(totalHPP)
                    ]);
                    rows.push([
                        '',
                        '',
                        ''
                    ]);
                    // LABA KOTOR
                    rows.push([
                        '',
                        'Laba Kotor',
                        formatCsvCurrency(labaKotor)
                    ]);
                    rows.push([
                        '',
                        '',
                        ''
                    ]);
                    // BEBAN
                    rows.push([
                        'BEBAN',
                        '',
                        ''
                    ]);
                    for (const item of bebanItems){
                        rows.push([
                            `  ${item.kodeAkun}`,
                            item.namaAkun,
                            formatCsvCurrency(item.saldo)
                        ]);
                    }
                    rows.push([
                        '',
                        'Total Beban',
                        formatCsvCurrency(totalBeban)
                    ]);
                    rows.push([
                        '',
                        '',
                        ''
                    ]);
                    // LABA BERSIH
                    rows.push([
                        '',
                        'Laba Bersih',
                        formatCsvCurrency(labaBersih)
                    ]);
                    const headers = [
                        'Kode Akun',
                        'Nama Akun',
                        'Jumlah'
                    ];
                    csvContent = [
                        ...headerRows.map((r)=>r.join(';')),
                        rowsToCsv(headers, rows)
                    ].join('\n');
                    break;
                }
            // ─── Trial Balance (Neraca Saldo) ──────────────────────────────────
            case 'neraca-saldo':
                {
                    const akunList = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].akun.findMany({
                        where: {
                            tenantId
                        },
                        orderBy: {
                            kodeAkun: 'asc'
                        }
                    });
                    const accounts = await Promise.all(akunList.map(async (akun)=>{
                        const saldo = await calculateAccountBalance(akun.kodeAkun, tenantId, akun.tipeAkun, akun.saldoAwal, startDate, endDate);
                        const debitNormal = isDebitNormal(akun.tipeAkun);
                        let debit = 0;
                        let kredit = 0;
                        if (debitNormal) {
                            if (saldo > 0) debit = saldo;
                            else if (saldo < 0) kredit = Math.abs(saldo);
                        } else {
                            if (saldo < 0) debit = Math.abs(saldo);
                            else if (saldo > 0) kredit = saldo;
                        }
                        return {
                            kodeAkun: akun.kodeAkun,
                            namaAkun: akun.namaAkun,
                            tipeAkun: akun.tipeAkun,
                            saldoAwal: akun.saldoAwal,
                            debit,
                            kredit
                        };
                    }));
                    const nonZeroAccounts = accounts.filter((a)=>a.debit !== 0 || a.kredit !== 0);
                    const totalDebit = nonZeroAccounts.reduce((s, a)=>s + a.debit, 0);
                    const totalKredit = nonZeroAccounts.reduce((s, a)=>s + a.kredit, 0);
                    const periodeText = startDate && endDate ? `${formatDate(startDate)} s/d ${formatDate(endDate)}` : 'Seluruh Periode';
                    filename = `neraca-saldo_${formatDateISO(new Date())}.csv`;
                    const headerRows = [
                        [
                            `Laporan: Neraca Saldo (Trial Balance)`
                        ],
                        [
                            `Perusahaan: ${tenantName}`
                        ],
                        [
                            `Periode: ${periodeText}`
                        ],
                        [
                            `Tanggal Export: ${exportDate}`
                        ],
                        []
                    ];
                    const headers = [
                        'Kode Akun',
                        'Nama Akun',
                        'Tipe Akun',
                        'Saldo Awal',
                        'Debit',
                        'Kredit'
                    ];
                    const rows = nonZeroAccounts.map((a)=>[
                            a.kodeAkun,
                            a.namaAkun,
                            a.tipeAkun,
                            formatCsvCurrency(a.saldoAwal),
                            formatCsvCurrency(a.debit),
                            formatCsvCurrency(a.kredit)
                        ]);
                    rows.push([
                        '',
                        'TOTAL',
                        '',
                        '',
                        formatCsvCurrency(totalDebit),
                        formatCsvCurrency(totalKredit)
                    ]);
                    csvContent = [
                        ...headerRows.map((r)=>r.join(';')),
                        rowsToCsv(headers, rows)
                    ].join('\n');
                    break;
                }
            // ─── Cash Flow (Arus Kas) ─────────────────────────────────────────
            case 'arus-kas':
                {
                    // Build the arus kas data similar to the arus-kas route
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
                    const saldoAwalKas = allCashAccounts.reduce((sum, a)=>sum + a.saldoAwal, 0);
                    const jurnalWhere = {
                        tenantId,
                        isApproved: true
                    };
                    if (startDate || endDate) {
                        jurnalWhere.tanggal = buildDateFilter(startDate, endDate);
                    }
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
                    const allAccounts = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].akun.findMany({
                        where: {
                            tenantId
                        }
                    });
                    const accountMap = new Map(allAccounts.map((a)=>[
                            a.kodeAkun,
                            a
                        ]));
                    const journalGroups = new Map();
                    for (const detail of cashJournalDetails){
                        const jurnalId = detail.jurnalId;
                        if (!journalGroups.has(jurnalId)) {
                            journalGroups.set(jurnalId, []);
                        }
                        journalGroups.get(jurnalId).push(detail);
                    }
                    const operasiItems = [];
                    const investasiItems = [];
                    const pendanaanItems = [];
                    for (const [jurnalId, cashDetails] of journalGroups){
                        const allDetails = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].jurnalDetail.findMany({
                            where: {
                                jurnalId
                            }
                        });
                        const journalInfo = cashDetails[0].jurnal;
                        let cashDebit = 0;
                        let cashKredit = 0;
                        for (const cd of cashDetails){
                            cashDebit += cd.debit;
                            cashKredit += cd.kredit;
                        }
                        const netCashEffect = cashDebit - cashKredit;
                        const nonCashDetails = allDetails.filter((d)=>!cashAccountCodes.has(d.kodeAkun));
                        let category = 'operasi';
                        if (nonCashDetails.length > 0) {
                            const hasAssetAccount = nonCashDetails.some((d)=>{
                                const acc = accountMap.get(d.kodeAkun);
                                return acc && isAssetAccount(acc.tipeAkun) && !isCashAccount(acc.tipeAkun);
                            });
                            const hasFinancingAccount = nonCashDetails.some((d)=>{
                                const acc = accountMap.get(d.kodeAkun);
                                return acc && (acc.tipeAkun.toLowerCase().includes('utang') || acc.tipeAkun.toLowerCase().includes('ekuitas'));
                            });
                            if (hasFinancingAccount) category = 'pendanaan';
                            else if (hasAssetAccount) category = 'investasi';
                        }
                        const keterangan = journalInfo.keterangan || `Jurnal ${journalInfo.noBukti || jurnalId.slice(-6)}`;
                        const item = {
                            keterangan,
                            jumlah: Math.round(netCashEffect)
                        };
                        if (category === 'operasi') operasiItems.push(item);
                        else if (category === 'investasi') investasiItems.push(item);
                        else pendanaanItems.push(item);
                    }
                    // Calculate opening balance for period
                    let saldoAwalPeriod = saldoAwalKas;
                    if (startDate) {
                        const beforeCashDetails = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].jurnalDetail.aggregate({
                            _sum: {
                                debit: true,
                                kredit: true
                            },
                            where: {
                                kodeAkun: {
                                    in: Array.from(cashAccountCodes)
                                },
                                jurnal: {
                                    tenantId,
                                    isApproved: true,
                                    tanggal: {
                                        lt: new Date(startDate)
                                    }
                                }
                            }
                        });
                        saldoAwalPeriod = Math.round(saldoAwalKas + (beforeCashDetails._sum.debit || 0) - (beforeCashDetails._sum.kredit || 0));
                    }
                    const totalOperasi = operasiItems.reduce((s, i)=>s + i.jumlah, 0);
                    const totalInvestasi = investasiItems.reduce((s, i)=>s + i.jumlah, 0);
                    const totalPendanaan = pendanaanItems.reduce((s, i)=>s + i.jumlah, 0);
                    const saldoAkhirKas = Math.round(saldoAwalPeriod + totalOperasi + totalInvestasi + totalPendanaan);
                    const periodeText = startDate && endDate ? `${formatDate(startDate)} s/d ${formatDate(endDate)}` : 'Seluruh Periode';
                    filename = `arus-kas_${formatDateISO(new Date())}.csv`;
                    const headerRows = [
                        [
                            `Laporan: Arus Kas (Cash Flow Statement)`
                        ],
                        [
                            `Perusahaan: ${tenantName}`
                        ],
                        [
                            `Periode: ${periodeText}`
                        ],
                        [
                            `Tanggal Export: ${exportDate}`
                        ],
                        []
                    ];
                    const rows = [];
                    rows.push([
                        `Saldo Awal Kas`,
                        formatCsvCurrency(saldoAwalPeriod)
                    ]);
                    rows.push([
                        '',
                        ''
                    ]);
                    rows.push([
                        'AKTIVITAS OPERASI',
                        ''
                    ]);
                    for (const item of operasiItems){
                        rows.push([
                            `  ${item.keterangan}`,
                            formatCsvCurrency(item.jumlah)
                        ]);
                    }
                    rows.push([
                        'Total Aktivitas Operasi',
                        formatCsvCurrency(totalOperasi)
                    ]);
                    rows.push([
                        '',
                        ''
                    ]);
                    rows.push([
                        'AKTIVITAS INVESTASI',
                        ''
                    ]);
                    for (const item of investasiItems){
                        rows.push([
                            `  ${item.keterangan}`,
                            formatCsvCurrency(item.jumlah)
                        ]);
                    }
                    rows.push([
                        'Total Aktivitas Investasi',
                        formatCsvCurrency(totalInvestasi)
                    ]);
                    rows.push([
                        '',
                        ''
                    ]);
                    rows.push([
                        'AKTIVITAS PENDANAAN',
                        ''
                    ]);
                    for (const item of pendanaanItems){
                        rows.push([
                            `  ${item.keterangan}`,
                            formatCsvCurrency(item.jumlah)
                        ]);
                    }
                    rows.push([
                        'Total Aktivitas Pendanaan',
                        formatCsvCurrency(totalPendanaan)
                    ]);
                    rows.push([
                        '',
                        ''
                    ]);
                    rows.push([
                        'Perubahan Kas',
                        formatCsvCurrency(totalOperasi + totalInvestasi + totalPendanaan)
                    ]);
                    rows.push([
                        'Saldo Akhir Kas',
                        formatCsvCurrency(saldoAkhirKas)
                    ]);
                    const headers = [
                        'Keterangan',
                        'Jumlah'
                    ];
                    csvContent = [
                        ...headerRows.map((r)=>r.join(';')),
                        rowsToCsv(headers, rows)
                    ].join('\n');
                    break;
                }
            // ─── General Ledger (Buku Besar) ──────────────────────────────────
            case 'buku-besar':
                {
                    if (!kodeAkun) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Parameter kodeAkun wajib diisi untuk export buku besar'
                        }, {
                            status: 400
                        });
                    }
                    const akun = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].akun.findFirst({
                        where: {
                            tenantId,
                            kodeAkun
                        }
                    });
                    if (!akun) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Akun tidak ditemukan'
                        }, {
                            status: 404
                        });
                    }
                    const jurnalWhere = {
                        tenantId,
                        isApproved: true
                    };
                    if (startDate || endDate) {
                        jurnalWhere.tanggal = buildDateFilter(startDate, endDate);
                    }
                    const details = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].jurnalDetail.findMany({
                        where: {
                            kodeAkun,
                            jurnal: jurnalWhere
                        },
                        include: {
                            jurnal: {
                                select: {
                                    tanggal: true,
                                    noBukti: true,
                                    keterangan: true
                                }
                            }
                        },
                        orderBy: {
                            jurnal: {
                                tanggal: 'asc'
                            }
                        }
                    });
                    const sortedDetails = [
                        ...details
                    ].sort((a, b)=>{
                        const dateA = new Date(a.jurnal.tanggal).getTime();
                        const dateB = new Date(b.jurnal.tanggal).getTime();
                        if (dateA !== dateB) return dateA - dateB;
                        return a.jurnalId.localeCompare(b.jurnalId);
                    });
                    const isAsset = isAssetAccount(akun.tipeAkun);
                    let runningBalance = akun.saldoAwal;
                    const entries = sortedDetails.map((detail)=>{
                        if (isAsset) runningBalance += detail.debit - detail.kredit;
                        else runningBalance += detail.kredit - detail.debit;
                        return {
                            tanggal: detail.jurnal.tanggal,
                            noBukti: detail.jurnal.noBukti,
                            keterangan: detail.jurnal.keterangan || detail.keterangan,
                            debit: detail.debit,
                            kredit: detail.kredit,
                            saldo: Math.round(runningBalance)
                        };
                    });
                    const totalDebit = sortedDetails.reduce((s, d)=>s + d.debit, 0);
                    const totalKredit = sortedDetails.reduce((s, d)=>s + d.kredit, 0);
                    const saldoAkhir = isAsset ? Math.round(akun.saldoAwal + totalDebit - totalKredit) : Math.round(akun.saldoAwal + totalKredit - totalDebit);
                    const periodeText = startDate && endDate ? `${formatDate(startDate)} s/d ${formatDate(endDate)}` : 'Seluruh Periode';
                    filename = `buku-besar_${kodeAkun}_${formatDateISO(new Date())}.csv`;
                    const headerRows = [
                        [
                            `Laporan: Buku Besar (General Ledger)`
                        ],
                        [
                            `Perusahaan: ${tenantName}`
                        ],
                        [
                            `Akun: ${akun.kodeAkun} - ${akun.namaAkun} (${akun.tipeAkun})`
                        ],
                        [
                            `Periode: ${periodeText}`
                        ],
                        [
                            `Saldo Awal: ${formatCsvCurrency(akun.saldoAwal)}`
                        ],
                        [
                            `Tanggal Export: ${exportDate}`
                        ],
                        []
                    ];
                    const headers = [
                        'Tanggal',
                        'No Bukti',
                        'Keterangan',
                        'Debit',
                        'Kredit',
                        'Saldo'
                    ];
                    const rows = entries.map((e)=>[
                            formatDate(e.tanggal),
                            e.noBukti || '',
                            e.keterangan || '',
                            formatCsvCurrency(e.debit),
                            formatCsvCurrency(e.kredit),
                            formatCsvCurrency(e.saldo)
                        ]);
                    rows.push([
                        '',
                        '',
                        'TOTAL',
                        formatCsvCurrency(totalDebit),
                        formatCsvCurrency(totalKredit),
                        formatCsvCurrency(saldoAkhir)
                    ]);
                    csvContent = [
                        ...headerRows.map((r)=>r.join(';')),
                        rowsToCsv(headers, rows)
                    ].join('\n');
                    break;
                }
            // ─── Sales (Penjualan) ─────────────────────────────────────────────
            case 'penjualan':
                {
                    const dateFilter = buildDateFilter(startDate, endDate);
                    const where = {
                        tenantId
                    };
                    if (Object.keys(dateFilter).length > 0) {
                        where.tanggalFaktur = dateFilter;
                    }
                    const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].penjualan.findMany({
                        where,
                        orderBy: [
                            {
                                tanggalFaktur: 'desc'
                            },
                            {
                                createdAt: 'desc'
                            }
                        ]
                    });
                    filename = `penjualan_${formatDateISO(new Date())}.csv`;
                    const periodeText = startDate && endDate ? `${formatDate(startDate)} s/d ${formatDate(endDate)}` : 'Seluruh Periode';
                    const headerRows = [
                        [
                            `Laporan: Penjualan`
                        ],
                        [
                            `Perusahaan: ${tenantName}`
                        ],
                        [
                            `Periode: ${periodeText}`
                        ],
                        [
                            `Tanggal Export: ${exportDate}`
                        ],
                        []
                    ];
                    const headers = [
                        'No Faktur',
                        'Tanggal Faktur',
                        'Pelanggan ID',
                        'Total',
                        'Keterangan'
                    ];
                    const rows = data.map((item)=>[
                            item.noFaktur,
                            formatDate(item.tanggalFaktur),
                            item.pelangganId || '',
                            formatCsvCurrency(item.total),
                            item.keterangan || ''
                        ]);
                    const grandTotal = data.reduce((s, i)=>s + i.total, 0);
                    rows.push([
                        '',
                        '',
                        'TOTAL',
                        formatCsvCurrency(grandTotal),
                        ''
                    ]);
                    csvContent = [
                        ...headerRows.map((r)=>r.join(';')),
                        rowsToCsv(headers, rows)
                    ].join('\n');
                    break;
                }
            // ─── Purchases (Pembelian) ─────────────────────────────────────────
            case 'pembelian':
                {
                    const dateFilter = buildDateFilter(startDate, endDate);
                    const where = {
                        tenantId
                    };
                    if (Object.keys(dateFilter).length > 0) {
                        where.tanggalFaktur = dateFilter;
                    }
                    const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].pembelian.findMany({
                        where,
                        orderBy: [
                            {
                                tanggalFaktur: 'desc'
                            },
                            {
                                createdAt: 'desc'
                            }
                        ]
                    });
                    filename = `pembelian_${formatDateISO(new Date())}.csv`;
                    const periodeText = startDate && endDate ? `${formatDate(startDate)} s/d ${formatDate(endDate)}` : 'Seluruh Periode';
                    const headerRows = [
                        [
                            `Laporan: Pembelian`
                        ],
                        [
                            `Perusahaan: ${tenantName}`
                        ],
                        [
                            `Periode: ${periodeText}`
                        ],
                        [
                            `Tanggal Export: ${exportDate}`
                        ],
                        []
                    ];
                    const headers = [
                        'No Faktur',
                        'Tanggal Faktur',
                        'Pemasok ID',
                        'Total',
                        'Keterangan'
                    ];
                    const rows = data.map((item)=>[
                            item.noFaktur,
                            formatDate(item.tanggalFaktur),
                            item.pemasokId || '',
                            formatCsvCurrency(item.total),
                            item.keterangan || ''
                        ]);
                    const grandTotal = data.reduce((s, i)=>s + i.total, 0);
                    rows.push([
                        '',
                        '',
                        'TOTAL',
                        formatCsvCurrency(grandTotal),
                        ''
                    ]);
                    csvContent = [
                        ...headerRows.map((r)=>r.join(';')),
                        rowsToCsv(headers, rows)
                    ].join('\n');
                    break;
                }
            // ─── Savings (Simpanan) ────────────────────────────────────────────
            case 'simpanan':
                {
                    const dateFilter = buildDateFilter(startDate, endDate);
                    const where = {
                        tenantId
                    };
                    if (Object.keys(dateFilter).length > 0) {
                        where.tanggal = dateFilter;
                    }
                    const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].simpanan.findMany({
                        where,
                        orderBy: [
                            {
                                tanggal: 'desc'
                            },
                            {
                                createdAt: 'desc'
                            }
                        ]
                    });
                    filename = `simpanan_${formatDateISO(new Date())}.csv`;
                    const periodeText = startDate && endDate ? `${formatDate(startDate)} s/d ${formatDate(endDate)}` : 'Seluruh Periode';
                    const headerRows = [
                        [
                            `Laporan: Simpanan`
                        ],
                        [
                            `Perusahaan: ${tenantName}`
                        ],
                        [
                            `Periode: ${periodeText}`
                        ],
                        [
                            `Tanggal Export: ${exportDate}`
                        ],
                        []
                    ];
                    const headers = [
                        'Jenis Simpanan',
                        'Nama Anggota',
                        'Jenis Transaksi',
                        'Jumlah',
                        'Tanggal',
                        'Keterangan'
                    ];
                    const rows = data.map((item)=>[
                            item.jenisSimpanan,
                            item.namaAnggota || '',
                            item.jenisTransaksi,
                            formatCsvCurrency(item.jumlah),
                            formatDate(item.tanggal),
                            item.keterangan || ''
                        ]);
                    csvContent = [
                        ...headerRows.map((r)=>r.join(';')),
                        rowsToCsv(headers, rows)
                    ].join('\n');
                    break;
                }
            // ─── Loans (Pinjaman) ──────────────────────────────────────────────
            case 'pinjaman':
                {
                    const dateFilter = buildDateFilter(startDate, endDate);
                    const where = {
                        tenantId
                    };
                    if (Object.keys(dateFilter).length > 0) {
                        where.tanggal = dateFilter;
                    }
                    const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].pinjaman.findMany({
                        where,
                        orderBy: [
                            {
                                tanggal: 'desc'
                            },
                            {
                                createdAt: 'desc'
                            }
                        ]
                    });
                    filename = `pinjaman_${formatDateISO(new Date())}.csv`;
                    const periodeText = startDate && endDate ? `${formatDate(startDate)} s/d ${formatDate(endDate)}` : 'Seluruh Periode';
                    const headerRows = [
                        [
                            `Laporan: Pinjaman`
                        ],
                        [
                            `Perusahaan: ${tenantName}`
                        ],
                        [
                            `Periode: ${periodeText}`
                        ],
                        [
                            `Tanggal Export: ${exportDate}`
                        ],
                        []
                    ];
                    const headers = [
                        'Jenis Pinjaman',
                        'Nama Anggota',
                        'Jumlah Pokok',
                        'Sisa Pokok',
                        'Bunga',
                        'Status',
                        'Tanggal',
                        'Keterangan'
                    ];
                    const rows = data.map((item)=>[
                            item.jenisPinjaman,
                            item.namaAnggota || '',
                            formatCsvCurrency(item.jumlahPokok),
                            formatCsvCurrency(item.sisaPokok),
                            formatCsvCurrency(item.bunga),
                            item.status,
                            formatDate(item.tanggal),
                            item.keterangan || ''
                        ]);
                    csvContent = [
                        ...headerRows.map((r)=>r.join(';')),
                        rowsToCsv(headers, rows)
                    ].join('\n');
                    break;
                }
            // ─── Inventory (Persediaan) ────────────────────────────────────────
            case 'persediaan':
                {
                    const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].persediaan.findMany({
                        where: {
                            tenantId
                        },
                        orderBy: [
                            {
                                namaBarang: 'asc'
                            }
                        ]
                    });
                    filename = `persediaan_${formatDateISO(new Date())}.csv`;
                    const headerRows = [
                        [
                            `Laporan: Persediaan`
                        ],
                        [
                            `Perusahaan: ${tenantName}`
                        ],
                        [
                            `Tanggal Export: ${exportDate}`
                        ],
                        []
                    ];
                    const headers = [
                        'Nama Barang',
                        'Satuan',
                        'Harga Beli',
                        'Harga Jual',
                        'Stok',
                        'Nilai Persediaan'
                    ];
                    const rows = data.map((item)=>[
                            item.namaBarang,
                            item.satuan || '',
                            formatCsvCurrency(item.hargaBeli),
                            formatCsvCurrency(item.hargaJual),
                            String(item.stok),
                            formatCsvCurrency(item.hargaBeli * item.stok)
                        ]);
                    const totalNilai = data.reduce((s, i)=>s + i.hargaBeli * i.stok, 0);
                    rows.push([
                        '',
                        '',
                        '',
                        '',
                        'TOTAL NILAI',
                        formatCsvCurrency(totalNilai)
                    ]);
                    csvContent = [
                        ...headerRows.map((r)=>r.join(';')),
                        rowsToCsv(headers, rows)
                    ].join('\n');
                    break;
                }
            // ─── Customers (Pelanggan) ─────────────────────────────────────────
            case 'pelanggan':
                {
                    const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].pelanggan.findMany({
                        where: {
                            tenantId
                        },
                        orderBy: [
                            {
                                nama: 'asc'
                            }
                        ]
                    });
                    filename = `pelanggan_${formatDateISO(new Date())}.csv`;
                    const headerRows = [
                        [
                            `Laporan: Daftar Pelanggan`
                        ],
                        [
                            `Perusahaan: ${tenantName}`
                        ],
                        [
                            `Tanggal Export: ${exportDate}`
                        ],
                        []
                    ];
                    const headers = [
                        'Nama',
                        'Alamat',
                        'Telepon',
                        'Email'
                    ];
                    const rows = data.map((item)=>[
                            item.nama,
                            item.alamat || '',
                            item.telepon || '',
                            item.email || ''
                        ]);
                    csvContent = [
                        ...headerRows.map((r)=>r.join(';')),
                        rowsToCsv(headers, rows)
                    ].join('\n');
                    break;
                }
            // ─── Suppliers (Pemasok) ───────────────────────────────────────────
            case 'pemasok':
                {
                    const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].pemasok.findMany({
                        where: {
                            tenantId
                        },
                        orderBy: [
                            {
                                nama: 'asc'
                            }
                        ]
                    });
                    filename = `pemasok_${formatDateISO(new Date())}.csv`;
                    const headerRows = [
                        [
                            `Laporan: Daftar Pemasok`
                        ],
                        [
                            `Perusahaan: ${tenantName}`
                        ],
                        [
                            `Tanggal Export: ${exportDate}`
                        ],
                        []
                    ];
                    const headers = [
                        'Nama',
                        'Alamat',
                        'Telepon',
                        'Email'
                    ];
                    const rows = data.map((item)=>[
                            item.nama,
                            item.alamat || '',
                            item.telepon || '',
                            item.email || ''
                        ]);
                    csvContent = [
                        ...headerRows.map((r)=>r.join(';')),
                        rowsToCsv(headers, rows)
                    ].join('\n');
                    break;
                }
        }
        // Add BOM for proper UTF-8 encoding in Excel
        const bom = '\uFEFF';
        const csvWithBom = bom + csvContent;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](csvWithBom, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="${filename}"`
            }
        });
    } catch (error) {
        console.error('Export error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Terjadi kesalahan server'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3fcaee4b._.js.map