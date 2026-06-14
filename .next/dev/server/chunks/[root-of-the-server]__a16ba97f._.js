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
"[project]/src/lib/rate-limit.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkRateLimit",
    ()=>checkRateLimit,
    "resetOnSuccess",
    ()=>resetOnSuccess
]);
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
;
const CLEANUP_THRESHOLD_MS = 60 * 60 * 1000 // 1 hour
;
const rateLimitMap = new Map();
/**
 * Remove entries older than 1 hour to prevent memory leaks.
 */ function cleanup() {
    const now = Date.now();
    for (const [ip, entry] of rateLimitMap.entries()){
        if (now - entry.lastAttempt > CLEANUP_THRESHOLD_MS) {
            rateLimitMap.delete(ip);
        }
    }
}
function checkRateLimit(ip) {
    // Run cleanup on every check (lightweight since Map is small)
    cleanup();
    const now = Date.now();
    const entry = rateLimitMap.get(ip);
    if (!entry) {
        // First attempt
        rateLimitMap.set(ip, {
            attempts: 1,
            lastAttempt: now
        });
        return {
            allowed: true,
            retryAfter: 0
        };
    }
    const elapsed = now - entry.lastAttempt;
    // If the window has passed, reset the counter
    if (elapsed > WINDOW_MS) {
        rateLimitMap.set(ip, {
            attempts: 1,
            lastAttempt: now
        });
        return {
            allowed: true,
            retryAfter: 0
        };
    }
    // Within the window — increment attempt count
    entry.attempts += 1;
    entry.lastAttempt = now;
    if (entry.attempts > MAX_ATTEMPTS) {
        const retryAfterMs = WINDOW_MS - elapsed;
        const retryAfterSeconds = Math.ceil(retryAfterMs / 1000);
        return {
            allowed: false,
            retryAfter: retryAfterSeconds
        };
    }
    return {
        allowed: true,
        retryAfter: 0
    };
}
function resetOnSuccess(ip) {
    rateLimitMap.delete(ip);
}
}),
"[project]/src/app/api/auth/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rate-limit.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
;
;
;
;
;
function getClientIP(request) {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    const realIp = request.headers.get('x-real-ip');
    if (realIp) {
        return realIp.trim();
    }
    return 'unknown';
}
async function POST(request) {
    try {
        // --- Rate limiting ---
        const ip = getClientIP(request);
        const { allowed, retryAfter } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkRateLimit"])(ip);
        if (!allowed) {
            const minutes = Math.ceil(retryAfter / 60);
            // Audit log for rate-limited attempt
            console.warn(JSON.stringify({
                action: 'RATE_LIMITED',
                resource: 'auth',
                ip,
                retryAfterSeconds: retryAfter,
                timestamp: new Date().toISOString()
            }));
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Terlalu banyak percobaan login. Coba lagi dalam ${minutes} menit.`,
                retryAfter
            }, {
                status: 429
            });
        }
        const body = await request.json();
        const { username, password, loginMode, tenantId: inputTenantId } = body;
        if (!username || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Username dan password harus diisi'
            }, {
                status: 400
            });
        }
        if (loginMode === 'central') {
            const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].centralUser.findUnique({
                where: {
                    username
                }
            });
            if (!user) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Username atau password salah'
                }, {
                    status: 401
                });
            }
            const isValid = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(password, user.passwordHash);
            if (!isValid) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Username atau password salah'
                }, {
                    status: 401
                });
            }
            // Successful login — reset rate limit for this IP
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resetOnSuccess"])(ip);
            const sessionToken = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSession"])(user.id, 'central');
            const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                user: {
                    userId: user.id,
                    userType: 'central',
                    username: user.username,
                    namaUser: user.username,
                    role: user.role,
                    jabatan: user.jabatan
                }
            });
            response.headers.set('Set-Cookie', (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setSessionCookie"])(sessionToken));
            return response;
        } else if (loginMode === 'tenant') {
            if (!inputTenantId) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Tenant ID harus diisi'
                }, {
                    status: 400
                });
            }
            const tenant = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].tenant.findUnique({
                where: {
                    tenantId: inputTenantId
                }
            });
            if (!tenant) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Tenant tidak ditemukan'
                }, {
                    status: 404
                });
            }
            if (!tenant.isActive) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Tenant sudah tidak aktif'
                }, {
                    status: 403
                });
            }
            const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].tenantUser.findUnique({
                where: {
                    tenantId_namaUser: {
                        tenantId: tenant.id,
                        namaUser: username
                    }
                }
            });
            if (!user) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Username atau password salah'
                }, {
                    status: 401
                });
            }
            const isValid = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(password, user.passwordHash);
            if (!isValid) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Username atau password salah'
                }, {
                    status: 401
                });
            }
            // Successful login — reset rate limit for this IP
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resetOnSuccess"])(ip);
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].tenant.update({
                where: {
                    id: tenant.id
                },
                data: {
                    lastSeenAt: new Date()
                }
            });
            const sessionToken = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSession"])(user.id, 'tenant', tenant.id);
            // Audit log for tenant login
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].auditLog.create({
                    data: {
                        tenantId: tenant.id,
                        userId: user.id,
                        username: user.namaUser,
                        action: 'LOGIN',
                        resource: 'auth',
                        resourceId: user.id,
                        details: JSON.stringify({
                            namaUser: user.namaUser,
                            role: user.role
                        })
                    }
                });
            } catch  {}
            const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                user: {
                    userId: user.id,
                    userType: 'tenant',
                    tenantId: tenant.id,
                    namaUser: user.namaUser,
                    role: user.role,
                    jabatan: user.jabatan,
                    tenantName: tenant.namaPerusahaan
                }
            });
            response.headers.set('Set-Cookie', (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setSessionCookie"])(sessionToken));
            return response;
        } else {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Mode login tidak valid'
            }, {
                status: 400
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Terjadi kesalahan server'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a16ba97f._.js.map