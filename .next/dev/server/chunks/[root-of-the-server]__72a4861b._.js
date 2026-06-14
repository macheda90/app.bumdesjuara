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
"[project]/src/app/api/tenant/simpanan/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
;
;
;
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
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const jenisTransaksi = searchParams.get('jenisTransaksi') || '';
        const search = searchParams.get('search') || '';
        const skip = (page - 1) * limit;
        const where = {
            tenantId: session.tenantId
        };
        if (jenisTransaksi && jenisTransaksi !== 'semua') {
            where.jenisTransaksi = jenisTransaksi;
        }
        if (search) {
            where.namaAnggota = {
                contains: search
            };
        }
        const [simpanan, total] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].simpanan.findMany({
                where,
                orderBy: [
                    {
                        tanggal: 'desc'
                    },
                    {
                        createdAt: 'desc'
                    }
                ],
                skip,
                take: limit
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].simpanan.count({
                where
            })
        ]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            simpanan,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get simpanan error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Terjadi kesalahan server'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSession"])();
        if (!session || session.userType !== 'tenant' || !session.tenantId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Akses ditolak'
            }, {
                status: 403
            });
        }
        const body = await request.json();
        const { jenisSimpanan, namaAnggota, jenisTransaksi, jumlah, tanggal, keterangan } = body;
        if (!jenisSimpanan || !jenisTransaksi || !tanggal) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Jenis simpanan, jenis transaksi, dan tanggal wajib diisi'
            }, {
                status: 400
            });
        }
        if (![
            'setor',
            'tarik'
        ].includes(jenisTransaksi)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Jenis transaksi harus setor atau tarik'
            }, {
                status: 400
            });
        }
        const simpanan = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].simpanan.create({
            data: {
                tenantId: session.tenantId,
                jenisSimpanan,
                namaAnggota: namaAnggota || null,
                jenisTransaksi,
                jumlah: jumlah || 0,
                tanggal: new Date(tanggal),
                keterangan: keterangan || null
            }
        });
        // Audit log
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].auditLog.create({
                data: {
                    tenantId: session.tenantId,
                    userId: session.userId,
                    username: session.namaUser || null,
                    action: 'CREATE',
                    resource: 'simpanan',
                    resourceId: simpanan.id,
                    details: JSON.stringify({
                        jenisSimpanan: simpanan.jenisSimpanan,
                        namaAnggota: simpanan.namaAnggota,
                        jenisTransaksi: simpanan.jenisTransaksi,
                        jumlah: simpanan.jumlah
                    })
                }
            });
        } catch  {}
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Simpanan berhasil dibuat',
            simpanan
        }, {
            status: 201
        });
    } catch (error) {
        console.error('Create simpanan error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Terjadi kesalahan server'
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSession"])();
        if (!session || session.userType !== 'tenant' || !session.tenantId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Akses ditolak'
            }, {
                status: 403
            });
        }
        const body = await request.json();
        const { id, jenisSimpanan, namaAnggota, jenisTransaksi, jumlah, tanggal, keterangan } = body;
        if (!id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'ID simpanan wajib diisi'
            }, {
                status: 400
            });
        }
        // Verify ownership
        const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].simpanan.findFirst({
            where: {
                id,
                tenantId: session.tenantId
            }
        });
        if (!existing) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Simpanan tidak ditemukan'
            }, {
                status: 404
            });
        }
        if (jenisTransaksi && ![
            'setor',
            'tarik'
        ].includes(jenisTransaksi)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Jenis transaksi harus setor atau tarik'
            }, {
                status: 400
            });
        }
        const simpanan = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].simpanan.update({
            where: {
                id
            },
            data: {
                jenisSimpanan: jenisSimpanan ?? existing.jenisSimpanan,
                namaAnggota: namaAnggota !== undefined ? namaAnggota : existing.namaAnggota,
                jenisTransaksi: jenisTransaksi ?? existing.jenisTransaksi,
                jumlah: jumlah !== undefined ? jumlah : existing.jumlah,
                tanggal: tanggal ? new Date(tanggal) : existing.tanggal,
                keterangan: keterangan !== undefined ? keterangan : existing.keterangan
            }
        });
        // Audit log
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].auditLog.create({
                data: {
                    tenantId: session.tenantId,
                    userId: session.userId,
                    username: session.namaUser || null,
                    action: 'UPDATE',
                    resource: 'simpanan',
                    resourceId: simpanan.id,
                    details: JSON.stringify({
                        jenisSimpanan: simpanan.jenisSimpanan,
                        namaAnggota: simpanan.namaAnggota,
                        jenisTransaksi: simpanan.jenisTransaksi,
                        jumlah: simpanan.jumlah
                    })
                }
            });
        } catch  {}
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Simpanan berhasil diperbarui',
            simpanan
        });
    } catch (error) {
        console.error('Update simpanan error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Terjadi kesalahan server'
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
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
        const id = searchParams.get('id');
        if (!id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'ID simpanan wajib diisi'
            }, {
                status: 400
            });
        }
        // Verify ownership
        const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].simpanan.findFirst({
            where: {
                id,
                tenantId: session.tenantId
            }
        });
        if (!existing) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Simpanan tidak ditemukan'
            }, {
                status: 404
            });
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].simpanan.delete({
            where: {
                id
            }
        });
        // Audit log
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].auditLog.create({
                data: {
                    tenantId: session.tenantId,
                    userId: session.userId,
                    username: session.namaUser || null,
                    action: 'DELETE',
                    resource: 'simpanan',
                    resourceId: id,
                    details: JSON.stringify({
                        jenisSimpanan: existing.jenisSimpanan,
                        namaAnggota: existing.namaAnggota,
                        jenisTransaksi: existing.jenisTransaksi,
                        jumlah: existing.jumlah
                    })
                }
            });
        } catch  {}
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Simpanan berhasil dihapus'
        });
    } catch (error) {
        console.error('Delete simpanan error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Terjadi kesalahan server'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__72a4861b._.js.map