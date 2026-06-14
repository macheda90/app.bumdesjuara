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
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

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
"[project]/src/app/api/tenant/export-pdf/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdfkit$2f$js$2f$pdfkit$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pdfkit/js/pdfkit.es.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
;
;
;
;
// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}
function formatPdfCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}
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
function drawTable(doc, columns, rows, startX, startY, options = {}) {
    const { rowHeight = 22, fontSize = 9 } = options;
    let y = startY;
    // Check page break
    const pageHeight = doc.page.height - 60 // bottom margin
    ;
    if (y + rowHeight > pageHeight) {
        doc.addPage();
        y = 50;
    }
    // Draw header
    doc.fontSize(fontSize).font('Helvetica-Bold');
    let x = startX;
    for (const col of columns){
        doc.text(col.header, x + 4, y + 6, {
            width: col.width - 8,
            align: col.align || 'left',
            lineBreak: false
        });
        x += col.width;
    }
    // Header line
    doc.moveTo(startX, y + rowHeight - 2).lineTo(startX + columns.reduce((s, c)=>s + c.width, 0), y + rowHeight - 2).stroke('#333333');
    y += rowHeight;
    // Draw rows
    doc.font('Helvetica');
    for (const row of rows){
        if (y + rowHeight > pageHeight) {
            doc.addPage();
            y = 50;
            // Redraw header on new page
            doc.fontSize(fontSize).font('Helvetica-Bold');
            let hx = startX;
            for (const col of columns){
                doc.text(col.header, hx + 4, y + 6, {
                    width: col.width - 8,
                    align: col.align || 'left',
                    lineBreak: false
                });
                hx += col.width;
            }
            doc.moveTo(startX, y + rowHeight - 2).lineTo(startX + columns.reduce((s, c)=>s + c.width, 0), y + rowHeight - 2).stroke('#333333');
            y += rowHeight;
            doc.font('Helvetica');
        }
        x = startX;
        for(let i = 0; i < columns.length; i++){
            const col = columns[i];
            const cellText = row[i] || '';
            const isBold = cellText.startsWith('**') && cellText.endsWith('**');
            const displayText = isBold ? cellText.slice(2, -2) : cellText;
            if (isBold) {
                doc.font('Helvetica-Bold');
            } else {
                doc.font('Helvetica');
            }
            doc.text(displayText, x + 4, y + 6, {
                width: col.width - 8,
                align: col.align || 'left',
                lineBreak: false
            });
            x += col.width;
        }
        // Row line
        doc.moveTo(startX, y + rowHeight - 2).lineTo(startX + columns.reduce((s, c)=>s + c.width, 0), y + rowHeight - 2).stroke('#cccccc');
        y += rowHeight;
    }
    // Bottom line
    doc.moveTo(startX, y - 2).lineTo(startX + columns.reduce((s, c)=>s + c.width, 0), y - 2).stroke('#333333');
    return y;
}
function addPageFooter(doc, tenantName) {
    const pages = doc.bufferedPageRange();
    for(let i = 0; i < pages.count; i++){
        doc.switchToPage(i);
        const bottom = doc.page.height - 30;
        doc.fontSize(7).font('Helvetica');
        doc.text(`Generated by BumdesJuara | ${tenantName} | ${formatDate(new Date())}`, 50, bottom, {
            align: 'center',
            width: doc.page.width - 100
        });
        doc.text(`Halaman ${i + 1} dari ${pages.count}`, 50, bottom + 10, {
            align: 'center',
            width: doc.page.width - 100
        });
    }
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
        const validTypes = [
            'neraca',
            'laba-rugi',
            'neraca-saldo',
            'arus-kas'
        ];
        if (!type || !validTypes.includes(type)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Tipe export PDF tidak valid. Pilihan: ${validTypes.join(', ')}`
            }, {
                status: 400
            });
        }
        const tenantId = session.tenantId;
        const tenantName = session.tenantName || 'Perusahaan';
        const periodeText = startDate && endDate ? `${formatDate(startDate)} s/d ${formatDate(endDate)}` : 'Seluruh Periode';
        // Create PDF document
        const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdfkit$2f$js$2f$pdfkit$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]({
            size: 'A4',
            margins: {
                top: 50,
                bottom: 50,
                left: 50,
                right: 50
            },
            bufferPages: true,
            info: {
                Title: `Laporan ${type} - ${tenantName}`,
                Author: 'BumdesJuara',
                Subject: `Laporan ${type}`
            }
        });
        const chunks = [];
        doc.on('data', (chunk)=>chunks.push(chunk));
        // ─── Draw Report Header ──────────────────────────────────────────────
        function drawReportHeader(title) {
            doc.fontSize(16).font('Helvetica-Bold');
            doc.text(title, {
                align: 'center'
            });
            doc.fontSize(10).font('Helvetica');
            doc.text(tenantName, {
                align: 'center'
            });
            doc.fontSize(9).font('Helvetica');
            doc.text(`Periode: ${periodeText}`, {
                align: 'center'
            });
            doc.text(`Tanggal Cetak: ${formatDate(new Date())}`, {
                align: 'center'
            });
            doc.moveDown(1);
        }
        // ─── Generate Report Data & Render ───────────────────────────────────
        switch(type){
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
                    // Laba ditahan
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
                    const totalPendapatan = labaRugiBalances.filter((a)=>a.tipeAkun.toLowerCase().includes('pendapatan')).reduce((s, a)=>s + a.saldo, 0);
                    const totalBeban = Math.abs(labaRugiBalances.filter((a)=>a.tipeAkun.toLowerCase().includes('beban')).reduce((s, a)=>s + a.saldo, 0));
                    const totalHPP = Math.abs(labaRugiBalances.filter((a)=>a.tipeAkun.toLowerCase().includes('hpp')).reduce((s, a)=>s + a.saldo, 0));
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
                    drawReportHeader('NERACA (Balance Sheet)');
                    // ASET Table
                    doc.fontSize(11).font('Helvetica-Bold').text('ASET', {
                        underline: true
                    });
                    doc.moveDown(0.3);
                    const asetRows = asetItems.map((item)=>[
                            item.kodeAkun,
                            item.namaAkun,
                            formatPdfCurrency(item.saldo)
                        ]);
                    asetRows.push([
                        '',
                        '**Total Aset**',
                        `**${formatPdfCurrency(totalAset)}**`
                    ]);
                    const asetY = drawTable(doc, [
                        {
                            header: 'Kode Akun',
                            width: 80
                        },
                        {
                            header: 'Nama Akun',
                            width: 280
                        },
                        {
                            header: 'Jumlah',
                            width: 140,
                            align: 'right'
                        }
                    ], asetRows, 50, doc.y);
                    doc.y = asetY + 15;
                    // KEWAJIBAN Table
                    doc.fontSize(11).font('Helvetica-Bold').text('KEWAJIBAN', {
                        underline: true
                    });
                    doc.moveDown(0.3);
                    const kewajibanRows = kewajibanItems.map((item)=>[
                            item.kodeAkun,
                            item.namaAkun,
                            formatPdfCurrency(item.saldo)
                        ]);
                    kewajibanRows.push([
                        '',
                        '**Total Kewajiban**',
                        `**${formatPdfCurrency(totalKewajiban)}**`
                    ]);
                    const kewajibanY = drawTable(doc, [
                        {
                            header: 'Kode Akun',
                            width: 80
                        },
                        {
                            header: 'Nama Akun',
                            width: 280
                        },
                        {
                            header: 'Jumlah',
                            width: 140,
                            align: 'right'
                        }
                    ], kewajibanRows, 50, doc.y);
                    doc.y = kewajibanY + 15;
                    // EKUITAS Table
                    doc.fontSize(11).font('Helvetica-Bold').text('EKUITAS', {
                        underline: true
                    });
                    doc.moveDown(0.3);
                    const ekuitasRows = ekuitasItems.map((item)=>[
                            item.kodeAkun,
                            item.namaAkun,
                            formatPdfCurrency(item.saldo)
                        ]);
                    ekuitasRows.push([
                        '',
                        '**Laba Ditahan**',
                        `**${formatPdfCurrency(labaDitahan)}**`
                    ]);
                    ekuitasRows.push([
                        '',
                        '**Total Ekuitas + Laba Ditahan**',
                        `**${formatPdfCurrency(totalEkuitas + labaDitahan)}**`
                    ]);
                    const ekuitasY = drawTable(doc, [
                        {
                            header: 'Kode Akun',
                            width: 80
                        },
                        {
                            header: 'Nama Akun',
                            width: 280
                        },
                        {
                            header: 'Jumlah',
                            width: 140,
                            align: 'right'
                        }
                    ], ekuitasRows, 50, doc.y);
                    doc.y = ekuitasY + 15;
                    // Total Kewajiban + Ekuitas
                    doc.fontSize(11).font('Helvetica-Bold');
                    doc.text(`Total Kewajiban + Ekuitas: ${formatPdfCurrency(totalKewajiban + totalEkuitas + labaDitahan)}`, {
                        align: 'right'
                    });
                    break;
                }
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
                    drawReportHeader('LAPORAN LABA RUGI (Income Statement)');
                    // Pendapatan
                    doc.fontSize(11).font('Helvetica-Bold').text('PENDAPATAN', {
                        underline: true
                    });
                    doc.moveDown(0.3);
                    const pendapatanRows = pendapatanItems.map((item)=>[
                            item.kodeAkun,
                            item.namaAkun,
                            formatPdfCurrency(item.saldo)
                        ]);
                    pendapatanRows.push([
                        '',
                        '**Total Pendapatan**',
                        `**${formatPdfCurrency(totalPendapatan)}**`
                    ]);
                    const pendapatanY = drawTable(doc, [
                        {
                            header: 'Kode Akun',
                            width: 80
                        },
                        {
                            header: 'Nama Akun',
                            width: 280
                        },
                        {
                            header: 'Jumlah',
                            width: 140,
                            align: 'right'
                        }
                    ], pendapatanRows, 50, doc.y);
                    doc.y = pendapatanY + 15;
                    // HPP
                    doc.fontSize(11).font('Helvetica-Bold').text('HARGA POKOK PENJUALAN', {
                        underline: true
                    });
                    doc.moveDown(0.3);
                    const hppRows = hppItems.map((item)=>[
                            item.kodeAkun,
                            item.namaAkun,
                            formatPdfCurrency(item.saldo)
                        ]);
                    hppRows.push([
                        '',
                        '**Total HPP**',
                        `**${formatPdfCurrency(totalHPP)}**`
                    ]);
                    const hppY = drawTable(doc, [
                        {
                            header: 'Kode Akun',
                            width: 80
                        },
                        {
                            header: 'Nama Akun',
                            width: 280
                        },
                        {
                            header: 'Jumlah',
                            width: 140,
                            align: 'right'
                        }
                    ], hppRows, 50, doc.y);
                    doc.y = hppY + 15;
                    // Laba Kotor
                    doc.fontSize(11).font('Helvetica-Bold');
                    doc.text(`Laba Kotor: ${formatPdfCurrency(labaKotor)}`, {
                        align: 'right'
                    });
                    doc.moveDown(0.5);
                    // Beban
                    doc.fontSize(11).font('Helvetica-Bold').text('BEBAN', {
                        underline: true
                    });
                    doc.moveDown(0.3);
                    const bebanRows = bebanItems.map((item)=>[
                            item.kodeAkun,
                            item.namaAkun,
                            formatPdfCurrency(item.saldo)
                        ]);
                    bebanRows.push([
                        '',
                        '**Total Beban**',
                        `**${formatPdfCurrency(totalBeban)}**`
                    ]);
                    const bebanY = drawTable(doc, [
                        {
                            header: 'Kode Akun',
                            width: 80
                        },
                        {
                            header: 'Nama Akun',
                            width: 280
                        },
                        {
                            header: 'Jumlah',
                            width: 140,
                            align: 'right'
                        }
                    ], bebanRows, 50, doc.y);
                    doc.y = bebanY + 15;
                    // Laba Bersih
                    doc.fontSize(13).font('Helvetica-Bold');
                    doc.text(`LABA BERSIH: ${formatPdfCurrency(labaBersih)}`, {
                        align: 'center'
                    });
                    break;
                }
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
                    drawReportHeader('NERACA SALDO (Trial Balance)');
                    const rows = nonZeroAccounts.map((a)=>[
                            a.kodeAkun,
                            a.namaAkun,
                            a.tipeAkun,
                            formatPdfCurrency(a.saldoAwal),
                            formatPdfCurrency(a.debit),
                            formatPdfCurrency(a.kredit)
                        ]);
                    rows.push([
                        '',
                        '**TOTAL**',
                        '',
                        '',
                        `**${formatPdfCurrency(totalDebit)}**`,
                        `**${formatPdfCurrency(totalKredit)}**`
                    ]);
                    drawTable(doc, [
                        {
                            header: 'Kode Akun',
                            width: 70
                        },
                        {
                            header: 'Nama Akun',
                            width: 170
                        },
                        {
                            header: 'Tipe Akun',
                            width: 100
                        },
                        {
                            header: 'Saldo Awal',
                            width: 80,
                            align: 'right'
                        },
                        {
                            header: 'Debit',
                            width: 80,
                            align: 'right'
                        },
                        {
                            header: 'Kredit',
                            width: 80,
                            align: 'right'
                        }
                    ], rows, 50, doc.y);
                    doc.moveDown(1);
                    const seimbang = totalDebit === totalKredit;
                    doc.fontSize(10).font('Helvetica-Bold');
                    doc.text(seimbang ? 'Neraca Saldo Seimbang' : 'Neraca Saldo Tidak Seimbang', {
                        align: 'center'
                    });
                    break;
                }
            case 'arus-kas':
                {
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
                        jurnalWhere.tanggal = {};
                        if (startDate) jurnalWhere.tanggal.gte = new Date(startDate);
                        if (endDate) jurnalWhere.tanggal.lte = new Date(endDate);
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
                        if (!journalGroups.has(detail.jurnalId)) journalGroups.set(detail.jurnalId, []);
                        journalGroups.get(detail.jurnalId).push(detail);
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
                        let cashDebit = 0, cashKredit = 0;
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
                    drawReportHeader('LAPORAN ARUS KAS (Cash Flow Statement)');
                    // Summary cards
                    doc.fontSize(11).font('Helvetica-Bold').text(`Saldo Awal Kas: ${formatPdfCurrency(saldoAwalPeriod)}`);
                    doc.moveDown(0.5);
                    // Operasi
                    doc.fontSize(11).font('Helvetica-Bold').text('AKTIVITAS OPERASI', {
                        underline: true
                    });
                    doc.moveDown(0.3);
                    const operasiRows = operasiItems.map((item)=>[
                            item.keterangan,
                            formatPdfCurrency(item.jumlah)
                        ]);
                    operasiRows.push([
                        '**Total Aktivitas Operasi**',
                        `**${formatPdfCurrency(totalOperasi)}**`
                    ]);
                    const operasiY = drawTable(doc, [
                        {
                            header: 'Keterangan',
                            width: 360
                        },
                        {
                            header: 'Jumlah',
                            width: 140,
                            align: 'right'
                        }
                    ], operasiRows, 50, doc.y);
                    doc.y = operasiY + 15;
                    // Investasi
                    doc.fontSize(11).font('Helvetica-Bold').text('AKTIVITAS INVESTASI', {
                        underline: true
                    });
                    doc.moveDown(0.3);
                    const investasiRows = investasiItems.map((item)=>[
                            item.keterangan,
                            formatPdfCurrency(item.jumlah)
                        ]);
                    investasiRows.push([
                        '**Total Aktivitas Investasi**',
                        `**${formatPdfCurrency(totalInvestasi)}**`
                    ]);
                    const investasiY = drawTable(doc, [
                        {
                            header: 'Keterangan',
                            width: 360
                        },
                        {
                            header: 'Jumlah',
                            width: 140,
                            align: 'right'
                        }
                    ], investasiRows, 50, doc.y);
                    doc.y = investasiY + 15;
                    // Pendanaan
                    doc.fontSize(11).font('Helvetica-Bold').text('AKTIVITAS PENDANAAN', {
                        underline: true
                    });
                    doc.moveDown(0.3);
                    const pendanaanRows = pendanaanItems.map((item)=>[
                            item.keterangan,
                            formatPdfCurrency(item.jumlah)
                        ]);
                    pendanaanRows.push([
                        '**Total Aktivitas Pendanaan**',
                        `**${formatPdfCurrency(totalPendanaan)}**`
                    ]);
                    const pendanaanY = drawTable(doc, [
                        {
                            header: 'Keterangan',
                            width: 360
                        },
                        {
                            header: 'Jumlah',
                            width: 140,
                            align: 'right'
                        }
                    ], pendanaanRows, 50, doc.y);
                    doc.y = pendanaanY + 15;
                    // Summary
                    doc.fontSize(11).font('Helvetica-Bold');
                    doc.text(`Perubahan Kas: ${formatPdfCurrency(totalOperasi + totalInvestasi + totalPendanaan)}`, {
                        align: 'right'
                    });
                    doc.moveDown(0.3);
                    doc.fontSize(13).font('Helvetica-Bold');
                    doc.text(`Saldo Akhir Kas: ${formatPdfCurrency(saldoAkhirKas)}`, {
                        align: 'center'
                    });
                    break;
                }
        }
        // Add page footers
        addPageFooter(doc, tenantName);
        // Finalize
        doc.end();
        // Wait for PDF generation
        const pdfBuffer = await new Promise((resolve)=>{
            doc.on('end', ()=>{
                resolve(Buffer.concat(chunks));
            });
        });
        const filenameMap = {
            'neraca': 'neraca',
            'laba-rugi': 'laba-rugi',
            'neraca-saldo': 'neraca-saldo',
            'arus-kas': 'arus-kas'
        };
        const filename = `${filenameMap[type]}_${new Date().toISOString().slice(0, 10)}.pdf`;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](Buffer.from(pdfBuffer), {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`
            }
        });
    } catch (error) {
        console.error('PDF Export error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Terjadi kesalahan server'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__70049b80._.js.map