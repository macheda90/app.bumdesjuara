(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/hooks/use-central-state.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCentralState",
    ()=>useCentralState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function useCentralState() {
    _s();
    const { centralTab } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    // Tenant state
    const [tenants, setTenants] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [debouncedSearch, setDebouncedSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const debounceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [showCreateModal, setShowCreateModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingTenant, setEditingTenant] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deletingTenant, setDeletingTenant] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deleteConfirmId, setDeleteConfirmId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [deleteError, setDeleteError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedTenant, setSelectedTenant] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // User management state
    const [centralUsers, setCentralUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [usersLoading, setUsersLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showUserModal, setShowUserModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingUser, setEditingUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deletingUser, setDeletingUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Tenant user management state
    const [tenantUsers, setTenantUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tenantUsersLoading, setTenantUsersLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showTenantUserModal, setShowTenantUserModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingTenantUser, setEditingTenantUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deletingTenantUser, setDeletingTenantUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Password change state
    const [showPasswordModal, setShowPasswordModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // ─── Fetch Functions ────────────────────────────────────────────────────────
    const fetchTenants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCentralState.useCallback[fetchTenants]": async ()=>{
            try {
                setIsLoading(true);
                const res = await fetch('/api/central/tenants');
                if (res.ok) {
                    const data = await res.json();
                    setTenants(data.tenants);
                }
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal memuat data tenant');
            } finally{
                setIsLoading(false);
            }
        }
    }["useCentralState.useCallback[fetchTenants]"], []);
    const fetchCentralUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCentralState.useCallback[fetchCentralUsers]": async ()=>{
            try {
                setUsersLoading(true);
                const res = await fetch('/api/central/users');
                if (res.ok) {
                    const data = await res.json();
                    setCentralUsers(data.users);
                }
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal memuat data pengguna');
            } finally{
                setUsersLoading(false);
            }
        }
    }["useCentralState.useCallback[fetchCentralUsers]"], []);
    const fetchTenantUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCentralState.useCallback[fetchTenantUsers]": async (tenantId)=>{
            try {
                setTenantUsersLoading(true);
                const res = await fetch(`/api/central/tenants/${tenantId}/users`);
                if (res.ok) {
                    const data = await res.json();
                    setTenantUsers(data.users);
                }
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal memuat data pengguna tenant');
            } finally{
                setTenantUsersLoading(false);
            }
        }
    }["useCentralState.useCallback[fetchTenantUsers]"], []);
    // ─── Effects ────────────────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCentralState.useEffect": ()=>{
            fetchTenants();
        }
    }["useCentralState.useEffect"], [
        fetchTenants
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCentralState.useEffect": ()=>{
            if (centralTab === 'users') {
                fetchCentralUsers();
            }
        }
    }["useCentralState.useEffect"], [
        centralTab,
        fetchCentralUsers
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCentralState.useEffect": ()=>{
            if (selectedTenant) {
                fetchTenantUsers(selectedTenant.id);
            } else {
                setTenantUsers([]);
            }
        }
    }["useCentralState.useEffect"], [
        selectedTenant,
        fetchTenantUsers
    ]);
    // Debounce search input
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCentralState.useEffect": ()=>{
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout({
                "useCentralState.useEffect": ()=>{
                    setDebouncedSearch(searchQuery);
                }
            }["useCentralState.useEffect"], 300);
            return ({
                "useCentralState.useEffect": ()=>{
                    if (debounceRef.current) clearTimeout(debounceRef.current);
                }
            })["useCentralState.useEffect"];
        }
    }["useCentralState.useEffect"], [
        searchQuery
    ]);
    // ─── Computed Values ────────────────────────────────────────────────────────
    const activeCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useCentralState.useMemo[activeCount]": ()=>tenants.filter({
                "useCentralState.useMemo[activeCount]": (t)=>t.isActive
            }["useCentralState.useMemo[activeCount]"]).length
    }["useCentralState.useMemo[activeCount]"], [
        tenants
    ]);
    const inactiveCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useCentralState.useMemo[inactiveCount]": ()=>tenants.filter({
                "useCentralState.useMemo[inactiveCount]": (t)=>!t.isActive
            }["useCentralState.useMemo[inactiveCount]"]).length
    }["useCentralState.useMemo[inactiveCount]"], [
        tenants
    ]);
    const totalUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useCentralState.useMemo[totalUsers]": ()=>tenants.reduce({
                "useCentralState.useMemo[totalUsers]": (sum, t)=>sum + t.userCount
            }["useCentralState.useMemo[totalUsers]"], 0)
    }["useCentralState.useMemo[totalUsers]"], [
        tenants
    ]);
    const filteredTenants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useCentralState.useMemo[filteredTenants]": ()=>tenants.filter({
                "useCentralState.useMemo[filteredTenants]": (t)=>t.namaPerusahaan.toLowerCase().includes(debouncedSearch.toLowerCase()) || t.tenantId.toLowerCase().includes(debouncedSearch.toLowerCase()) || t.email && t.email.toLowerCase().includes(debouncedSearch.toLowerCase())
            }["useCentralState.useMemo[filteredTenants]"])
    }["useCentralState.useMemo[filteredTenants]"], [
        tenants,
        debouncedSearch
    ]);
    const systemStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useCentralState.useMemo[systemStats]": ()=>({
                totalJournals: tenants.length * 128,
                totalTransactions: tenants.length * 347,
                totalAuditLogs: tenants.length * 89,
                totalAccounts: tenants.length * 56
            })
    }["useCentralState.useMemo[systemStats]"], [
        tenants
    ]);
    const barChartData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useCentralState.useMemo[barChartData]": ()=>tenants.slice(0, 8).map({
                "useCentralState.useMemo[barChartData]": (t)=>({
                        name: t.namaPerusahaan.length > 14 ? t.namaPerusahaan.substring(0, 14) + '...' : t.namaPerusahaan,
                        pengguna: t.userCount
                    })
            }["useCentralState.useMemo[barChartData]"])
    }["useCentralState.useMemo[barChartData]"], [
        tenants
    ]);
    const activityTimeline = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useCentralState.useMemo[activityTimeline]": ()=>[
                ...tenants
            ].filter({
                "useCentralState.useMemo[activityTimeline]": (t)=>t.lastSeenAt
            }["useCentralState.useMemo[activityTimeline]"]).sort({
                "useCentralState.useMemo[activityTimeline]": (a, b)=>new Date(b.lastSeenAt).getTime() - new Date(a.lastSeenAt).getTime()
            }["useCentralState.useMemo[activityTimeline]"]).slice(0, 5).map({
                "useCentralState.useMemo[activityTimeline]": (t)=>({
                        id: t.id,
                        tenantName: t.namaPerusahaan,
                        timestamp: t.lastSeenAt,
                        action: 'terakhir masuk'
                    })
            }["useCentralState.useMemo[activityTimeline]"])
    }["useCentralState.useMemo[activityTimeline]"], [
        tenants
    ]);
    const tabs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useCentralState.useMemo[tabs]": ()=>[
                {
                    id: 'tenants',
                    label: 'Tenant',
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"]
                },
                {
                    id: 'users',
                    label: 'Pengguna',
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
                }
            ]
    }["useCentralState.useMemo[tabs]"], []);
    // ─── Utility Functions ──────────────────────────────────────────────────────
    const formatDate = (dateStr)=>{
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };
    const formatDateTime = (dateStr)=>{
        if (!dateStr) return 'Belum pernah';
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const getTenantHealth = (tenant)=>{
        if (!tenant.lastSeenAt) return {
            color: 'red',
            label: 'Tidak Pernah Aktif',
            dotColor: 'bg-red-400',
            animClass: 'animate-health-red'
        };
        const diff = Date.now() - new Date(tenant.lastSeenAt).getTime();
        const hours = diff / (1000 * 60 * 60);
        if (hours <= 24) return {
            color: 'green',
            label: 'Sehat',
            dotColor: 'bg-[#10b981]',
            animClass: 'animate-health-green'
        };
        if (hours <= 168) return {
            color: 'yellow',
            label: 'Kurang Aktif',
            dotColor: 'bg-[#f59e0b]',
            animClass: 'animate-health-yellow'
        };
        return {
            color: 'red',
            label: 'Tidak Aktif',
            dotColor: 'bg-red-400',
            animClass: 'animate-health-red'
        };
    };
    return {
        // Store
        centralTab,
        // Tenant state
        tenants,
        setTenants,
        isLoading,
        setIsLoading,
        searchQuery,
        setSearchQuery,
        debouncedSearch,
        showCreateModal,
        setShowCreateModal,
        editingTenant,
        setEditingTenant,
        deletingTenant,
        setDeletingTenant,
        deleteConfirmId,
        setDeleteConfirmId,
        deleteError,
        setDeleteError,
        selectedTenant,
        setSelectedTenant,
        // User management state
        centralUsers,
        setCentralUsers,
        usersLoading,
        setUsersLoading,
        showUserModal,
        setShowUserModal,
        editingUser,
        setEditingUser,
        deletingUser,
        setDeletingUser,
        // Tenant user management state
        tenantUsers,
        setTenantUsers,
        tenantUsersLoading,
        setTenantUsersLoading,
        showTenantUserModal,
        setShowTenantUserModal,
        editingTenantUser,
        setEditingTenantUser,
        deletingTenantUser,
        setDeletingTenantUser,
        // Password change state
        showPasswordModal,
        setShowPasswordModal,
        // Fetch functions
        fetchTenants,
        fetchCentralUsers,
        fetchTenantUsers,
        // Computed values
        activeCount,
        inactiveCount,
        totalUsers,
        filteredTenants,
        systemStats,
        barChartData,
        activityTimeline,
        tabs,
        // Utility functions
        formatDate,
        formatDateTime,
        getTenantHealth
    };
}
_s(useCentralState, "sHSXdQj7i0uhshnLI+BMi/S7Z9Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-central-handlers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCentralHandlers",
    ()=>useCentralHandlers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$central$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-central-state.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useCentralHandlers() {
    _s();
    const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$central$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCentralState"])();
    const handleToggleActive = async (tenant)=>{
        try {
            const res = await fetch(`/api/central/tenants/${tenant.id}/toggle`, {
                method: 'PATCH'
            });
            if (res.ok) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(tenant.isActive ? `${tenant.namaPerusahaan} dinonaktifkan` : `${tenant.namaPerusahaan} diaktifkan`);
                s.fetchTenants();
                if (s.selectedTenant?.id === tenant.id) {
                    s.setSelectedTenant({
                        ...tenant,
                        isActive: !tenant.isActive
                    });
                }
            }
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal mengubah status tenant');
        }
    };
    const handleDeleteTenant = async ()=>{
        if (!s.deletingTenant) return;
        try {
            const res = await fetch(`/api/central/tenants/${s.deletingTenant.id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`${s.deletingTenant.namaPerusahaan} berhasil dihapus`);
                if (s.selectedTenant?.id === s.deletingTenant.id) {
                    s.setSelectedTenant(null);
                }
                s.setDeletingTenant(null);
                s.fetchTenants();
            }
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal menghapus tenant');
        }
    };
    const handleDeleteUser = async ()=>{
        if (!s.deletingUser) return;
        try {
            const res = await fetch(`/api/central/users/${s.deletingUser.id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`Pengguna ${s.deletingUser.username} berhasil dihapus`);
                s.setDeletingUser(null);
                s.fetchCentralUsers();
            } else {
                const data = await res.json();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(data.error || 'Gagal menghapus pengguna');
            }
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal menghapus pengguna');
        }
    };
    const handleDeleteTenantUser = async ()=>{
        if (!s.deletingTenantUser || !s.selectedTenant) return;
        try {
            const res = await fetch(`/api/central/tenants/${s.selectedTenant.id}/users/${s.deletingTenantUser.id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`Pengguna ${s.deletingTenantUser.namaUser} berhasil dihapus`);
                s.setDeletingTenantUser(null);
                s.fetchTenantUsers(s.selectedTenant.id);
                s.fetchTenants();
            } else {
                const data = await res.json();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(data.error || 'Gagal menghapus pengguna tenant');
            }
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal menghapus pengguna tenant');
        }
    };
    return {
        ...s,
        // Handlers
        handleToggleActive,
        handleDeleteTenant,
        handleDeleteUser,
        handleDeleteTenantUser
    };
}
_s(useCentralHandlers, "P+R2/rLn5SBoIgg5TE1vGXrChms=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$central$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCentralState"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-theme-colors.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useThemeColors",
    ()=>useThemeColors
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useThemeColors() {
    _s();
    const { resolvedTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const [mounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useThemeColors.useState": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return true;
        }
    }["useThemeColors.useState"]);
    // Provide safe defaults that match dark theme (the original hard-coded values)
    const colors = {
        tooltipBg: mounted ? getCSSVar('--chart-tooltip-bg') : '#0d1b2a',
        tooltipBorder: mounted ? getCSSVar('--chart-tooltip-border') : 'rgba(255,255,255,0.08)',
        tooltipText: mounted ? getCSSVar('--chart-tooltip-text') : '#e0e0e0',
        axisText: mounted ? getCSSVar('--chart-axis-text') : '#8fa8c8',
        gridStroke: mounted ? getCSSVar('--chart-grid-stroke') : 'rgba(255,255,255,0.04)'
    };
    return colors;
}
_s(useThemeColors, "iDcxalm5/AuyALb46GNKCayjuPk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
function getCSSVar(name) {
    if (typeof document === 'undefined') return '';
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-tenant-state.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTenantState",
    ()=>useTenantState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useTenantState() {
    _s();
    const { tenantTab } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [comingSoonModal, setComingSoonModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Akun state
    const [akunList, setAkunList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [akunLoading, setAkunLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [akunSearch, setAkunSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Jurnal state
    const [jurnalList, setJurnalList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [jurnalLoading, setJurnalLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [jurnalPage, setJurnalPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [jurnalPagination, setJurnalPagination] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [jurnalTipeFilter, setJurnalTipeFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('semua');
    const [jurnalApprovalFilter, setJurnalApprovalFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('semua');
    const [expandedJurnal, setExpandedJurnal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Jurnal creation modal state
    const [showJurnalModal, setShowJurnalModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [jurnalFormLoading, setJurnalFormLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [jurnalForm, setJurnalForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        tanggal: new Date().toISOString().split('T')[0],
        keterangan: '',
        noBukti: '',
        tipe: 'umum'
    });
    const [jurnalDetails, setJurnalDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            kodeAkun: '',
            debit: 0,
            kredit: 0
        },
        {
            kodeAkun: '',
            debit: 0,
            kredit: 0
        }
    ]);
    // Laporan state
    const [laporanSubTab, setLaporanSubTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('neraca');
    const [neracaData, setNeracaData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [labaRugiData, setLabaRugiData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [laporanLoading, setLaporanLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Buku Besar state
    const [bukuBesarAkun, setBukuBesarAkun] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [bukuBesarData, setBukuBesarData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [bukuBesarLoading, setBukuBesarLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Penjualan state
    const [penjualanList, setPenjualanList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [penjualanLoading, setPenjualanLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [penjualanPagination, setPenjualanPagination] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [penjualanSearch, setPenjualanSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showPenjualanModal, setShowPenjualanModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [penjualanForm, setPenjualanForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        tanggalFaktur: new Date().toISOString().split('T')[0],
        pelangganId: '',
        total: 0,
        keterangan: ''
    });
    const [penjualanFormLoading, setPenjualanFormLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Pembelian state
    const [pembelianList, setPembelianList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pembelianLoading, setPembelianLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pembelianPagination, setPembelianPagination] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pembelianSearch, setPembelianSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showPembelianModal, setShowPembelianModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pembelianForm, setPembelianForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        tanggalFaktur: new Date().toISOString().split('T')[0],
        pemasokId: '',
        total: 0,
        keterangan: ''
    });
    const [pembelianFormLoading, setPembelianFormLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Simpanan state
    const [simpananList, setSimpananList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [simpananLoading, setSimpananLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [simpananFilter, setSimpananFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('semua');
    const [showSimpananModal, setShowSimpananModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [simpananForm, setSimpananForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        jenisSimpanan: 'Simpanan Pokok',
        namaAnggota: '',
        jenisTransaksi: 'setor',
        jumlah: 0,
        tanggal: new Date().toISOString().split('T')[0],
        keterangan: ''
    });
    const [simpananFormLoading, setSimpananFormLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Pinjaman state
    const [pinjamanList, setPinjamanList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pinjamanLoading, setPinjamanLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pinjamanFilter, setPinjamanFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('semua');
    const [showPinjamanModal, setShowPinjamanModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pinjamanForm, setPinjamanForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        jenisPinjaman: 'Pinjaman Reguler',
        namaAnggota: '',
        jumlahPokok: 0,
        bunga: 1.5,
        tanggal: new Date().toISOString().split('T')[0],
        keterangan: ''
    });
    const [pinjamanFormLoading, setPinjamanFormLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Pelanggan state
    const [pelangganList, setPelangganList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pelangganLoading, setPelangganLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pelangganSearch, setPelangganSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showPelangganModal, setShowPelangganModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pelangganForm, setPelangganForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        nama: '',
        alamat: '',
        telepon: '',
        email: ''
    });
    const [pelangganFormLoading, setPelangganFormLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingPelanggan, setEditingPelanggan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Pemasok state
    const [pemasokList, setPemasokList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pemasokLoading, setPemasokLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pemasokSearch, setPemasokSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showPemasokModal, setShowPemasokModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pemasokForm, setPemasokForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        nama: '',
        alamat: '',
        telepon: '',
        email: ''
    });
    const [pemasokFormLoading, setPemasokFormLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingPemasok, setEditingPemasok] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Persediaan state
    const [persediaanList, setPersediaanList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [persediaanLoading, setPersediaanLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [persediaanSearch, setPersediaanSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [persediaanSummary, setPersediaanSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showPersediaanModal, setShowPersediaanModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [persediaanForm, setPersediaanForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        namaBarang: '',
        satuan: '',
        hargaBeli: 0,
        hargaJual: 0,
        stok: 0
    });
    const [persediaanFormLoading, setPersediaanFormLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingPersediaan, setEditingPersediaan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deletePersediaanConfirm, setDeletePersediaanConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Date range state for Laporan
    const [laporanStartDate, setLaporanStartDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [laporanEndDate, setLaporanEndDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Date range state for Buku Besar
    const [bukuBesarStartDate, setBukuBesarStartDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [bukuBesarEndDate, setBukuBesarEndDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Neraca Saldo state
    const [neracaSaldoData, setNeracaSaldoData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [neracaSaldoLoading, setNeracaSaldoLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [neracaSaldoStartDate, setNeracaSaldoStartDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [neracaSaldoEndDate, setNeracaSaldoEndDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Arus Kas state
    const [arusKasData, setArusKasData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [arusKasLoading, setArusKasLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [arusKasStartDate, setArusKasStartDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [arusKasEndDate, setArusKasEndDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Akun CRUD state
    const [showAkunModal, setShowAkunModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [akunForm, setAkunForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        kodeAkun: '',
        namaAkun: '',
        tipeAkun: 'Kas & Bank',
        kelompok: 'Neraca',
        saldoAwal: 0
    });
    const [akunFormLoading, setAkunFormLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingAkun, setEditingAkun] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deleteConfirm, setDeleteConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Mobile sidebar
    const [sidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Pengaturan state
    const [settingsData, setSettingsData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [settingsLoading, setSettingsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [settingsSaving, setSettingsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [settingsForm, setSettingsForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        namaPerusahaan: '',
        alamat: '',
        telepon: '',
        email: '',
        npwp: '',
        tahunFiskal: '2025',
        logoUrl: ''
    });
    const [tenantUsers, setTenantUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [usersLoading, setUsersLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showUserModal, setShowUserModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userForm, setUserForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        namaUser: '',
        password: '',
        role: 'staff',
        jabatan: ''
    });
    const [userFormLoading, setUserFormLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deleteUserConfirm, setDeleteUserConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [auditLogs, setAuditLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [auditLoading, setAuditLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [auditPagination, setAuditPagination] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [auditPage, setAuditPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [auditActionFilter, setAuditActionFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [pengaturanSubTab, setPengaturanSubTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('perusahaan');
    // Password change state
    const [showPasswordModal, setShowPasswordModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // ─── Fetch Functions ───────────────────────────────────────────────────────
    const fetchDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantState.useCallback[fetchDashboard]": async ()=>{
            try {
                setIsLoading(true);
                const res = await fetch('/api/tenant');
                if (res.ok) {
                    const result = await res.json();
                    setData(result);
                }
            } catch  {
            // silent error
            } finally{
                setIsLoading(false);
            }
        }
    }["useTenantState.useCallback[fetchDashboard]"], []);
    const fetchAkun = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantState.useCallback[fetchAkun]": async ()=>{
            try {
                setAkunLoading(true);
                const res = await fetch('/api/tenant/akun');
                if (res.ok) {
                    const result = await res.json();
                    setAkunList(result.akun);
                }
            } catch  {
            // silent error
            } finally{
                setAkunLoading(false);
            }
        }
    }["useTenantState.useCallback[fetchAkun]"], []);
    const fetchJurnal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantState.useCallback[fetchJurnal]": async ()=>{
            try {
                setJurnalLoading(true);
                const params = new URLSearchParams({
                    page: jurnalPage.toString(),
                    limit: '10'
                });
                if (jurnalTipeFilter && jurnalTipeFilter !== 'semua') {
                    params.set('tipe', jurnalTipeFilter);
                }
                if (jurnalApprovalFilter && jurnalApprovalFilter !== 'semua') {
                    params.set('approvalStatus', jurnalApprovalFilter);
                }
                const res = await fetch(`/api/tenant/jurnal?${params.toString()}`);
                if (res.ok) {
                    const result = await res.json();
                    setJurnalList(result.jurnal);
                    setJurnalPagination(result.pagination);
                }
            } catch  {
            // silent error
            } finally{
                setJurnalLoading(false);
            }
        }
    }["useTenantState.useCallback[fetchJurnal]"], [
        jurnalPage,
        jurnalTipeFilter,
        jurnalApprovalFilter
    ]);
    const fetchNeraca = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantState.useCallback[fetchNeraca]": async ()=>{
            try {
                setLaporanLoading(true);
                const params = new URLSearchParams();
                if (laporanStartDate) params.set('startDate', laporanStartDate);
                if (laporanEndDate) params.set('endDate', laporanEndDate);
                const qs = params.toString();
                const res = await fetch(`/api/tenant/neraca${qs ? `?${qs}` : ''}`);
                if (res.ok) {
                    const result = await res.json();
                    setNeracaData(result);
                }
            } catch  {
            // silent error
            } finally{
                setLaporanLoading(false);
            }
        }
    }["useTenantState.useCallback[fetchNeraca]"], [
        laporanStartDate,
        laporanEndDate
    ]);
    const fetchLabaRugi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantState.useCallback[fetchLabaRugi]": async ()=>{
            try {
                setLaporanLoading(true);
                const params = new URLSearchParams();
                if (laporanStartDate) params.set('startDate', laporanStartDate);
                if (laporanEndDate) params.set('endDate', laporanEndDate);
                const qs = params.toString();
                const res = await fetch(`/api/tenant/laba-rugi${qs ? `?${qs}` : ''}`);
                if (res.ok) {
                    const result = await res.json();
                    setLabaRugiData(result);
                }
            } catch  {
            // silent error
            } finally{
                setLaporanLoading(false);
            }
        }
    }["useTenantState.useCallback[fetchLabaRugi]"], [
        laporanStartDate,
        laporanEndDate
    ]);
    const fetchBukuBesar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantState.useCallback[fetchBukuBesar]": async (kodeAkun)=>{
            if (!kodeAkun) return;
            try {
                setBukuBesarLoading(true);
                const params = new URLSearchParams({
                    kodeAkun
                });
                if (bukuBesarStartDate) params.set('startDate', bukuBesarStartDate);
                if (bukuBesarEndDate) params.set('endDate', bukuBesarEndDate);
                const res = await fetch(`/api/tenant/buku-besar?${params.toString()}`);
                if (res.ok) {
                    const result = await res.json();
                    setBukuBesarData(result);
                } else {
                    setBukuBesarData(null);
                    const err = await res.json();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err.error || 'Gagal memuat buku besar');
                }
            } catch  {
                setBukuBesarData(null);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal memuat buku besar');
            } finally{
                setBukuBesarLoading(false);
            }
        }
    }["useTenantState.useCallback[fetchBukuBesar]"], [
        bukuBesarStartDate,
        bukuBesarEndDate
    ]);
    const fetchPenjualan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantState.useCallback[fetchPenjualan]": async ()=>{
            try {
                setPenjualanLoading(true);
                const params = new URLSearchParams({
                    page: '1',
                    limit: '50'
                });
                if (penjualanSearch) params.set('search', penjualanSearch);
                const res = await fetch(`/api/tenant/penjualan?${params.toString()}`);
                if (res.ok) {
                    const result = await res.json();
                    setPenjualanList(result.penjualan);
                    setPenjualanPagination(result.pagination);
                }
            } catch  {} finally{
                setPenjualanLoading(false);
            }
        }
    }["useTenantState.useCallback[fetchPenjualan]"], [
        penjualanSearch
    ]);
    const fetchPembelian = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantState.useCallback[fetchPembelian]": async ()=>{
            try {
                setPembelianLoading(true);
                const params = new URLSearchParams({
                    page: '1',
                    limit: '50'
                });
                if (pembelianSearch) params.set('search', pembelianSearch);
                const res = await fetch(`/api/tenant/pembelian?${params.toString()}`);
                if (res.ok) {
                    const result = await res.json();
                    setPembelianList(result.pembelian);
                    setPembelianPagination(result.pagination);
                }
            } catch  {} finally{
                setPembelianLoading(false);
            }
        }
    }["useTenantState.useCallback[fetchPembelian]"], [
        pembelianSearch
    ]);
    const fetchSimpanan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantState.useCallback[fetchSimpanan]": async ()=>{
            try {
                setSimpananLoading(true);
                const params = new URLSearchParams({
                    page: '1',
                    limit: '50'
                });
                if (simpananFilter && simpananFilter !== 'semua') params.set('jenisTransaksi', simpananFilter);
                const res = await fetch(`/api/tenant/simpanan?${params.toString()}`);
                if (res.ok) {
                    const result = await res.json();
                    setSimpananList(result.simpanan);
                }
            } catch  {} finally{
                setSimpananLoading(false);
            }
        }
    }["useTenantState.useCallback[fetchSimpanan]"], [
        simpananFilter
    ]);
    const fetchPinjaman = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantState.useCallback[fetchPinjaman]": async ()=>{
            try {
                setPinjamanLoading(true);
                const params = new URLSearchParams({
                    page: '1',
                    limit: '50'
                });
                if (pinjamanFilter && pinjamanFilter !== 'semua') params.set('status', pinjamanFilter);
                const res = await fetch(`/api/tenant/pinjaman?${params.toString()}`);
                if (res.ok) {
                    const result = await res.json();
                    setPinjamanList(result.pinjaman);
                }
            } catch  {} finally{
                setPinjamanLoading(false);
            }
        }
    }["useTenantState.useCallback[fetchPinjaman]"], [
        pinjamanFilter
    ]);
    const fetchPelanggan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantState.useCallback[fetchPelanggan]": async ()=>{
            try {
                setPelangganLoading(true);
                const params = new URLSearchParams({
                    page: '1',
                    limit: '50'
                });
                if (pelangganSearch) params.set('search', pelangganSearch);
                const res = await fetch(`/api/tenant/pelanggan?${params.toString()}`);
                if (res.ok) {
                    const result = await res.json();
                    setPelangganList(result.pelanggan);
                }
            } catch  {} finally{
                setPelangganLoading(false);
            }
        }
    }["useTenantState.useCallback[fetchPelanggan]"], [
        pelangganSearch
    ]);
    const fetchPemasok = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantState.useCallback[fetchPemasok]": async ()=>{
            try {
                setPemasokLoading(true);
                const params = new URLSearchParams({
                    page: '1',
                    limit: '50'
                });
                if (pemasokSearch) params.set('search', pemasokSearch);
                const res = await fetch(`/api/tenant/pemasok?${params.toString()}`);
                if (res.ok) {
                    const result = await res.json();
                    setPemasokList(result.pemasok);
                }
            } catch  {} finally{
                setPemasokLoading(false);
            }
        }
    }["useTenantState.useCallback[fetchPemasok]"], [
        pemasokSearch
    ]);
    const fetchPersediaan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantState.useCallback[fetchPersediaan]": async ()=>{
            try {
                setPersediaanLoading(true);
                const params = new URLSearchParams({
                    page: '1',
                    limit: '100'
                });
                if (persediaanSearch) params.set('search', persediaanSearch);
                const res = await fetch(`/api/tenant/persediaan?${params.toString()}`);
                if (res.ok) {
                    const result = await res.json();
                    setPersediaanList(result.persediaan);
                    setPersediaanSummary(result.summary);
                }
            } catch  {} finally{
                setPersediaanLoading(false);
            }
        }
    }["useTenantState.useCallback[fetchPersediaan]"], [
        persediaanSearch
    ]);
    const fetchSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantState.useCallback[fetchSettings]": async ()=>{
            try {
                setSettingsLoading(true);
                const res = await fetch('/api/tenant/settings');
                if (res.ok) {
                    const result = await res.json();
                    const s = result.settings;
                    setSettingsData(s);
                    setSettingsForm({
                        namaPerusahaan: s.namaPerusahaan || '',
                        alamat: s.alamat || '',
                        telepon: s.telepon || '',
                        email: s.email || '',
                        npwp: s.npwp || '',
                        tahunFiskal: s.tahunFiskal || '2025',
                        logoUrl: s.logoUrl || ''
                    });
                }
            } catch  {} finally{
                setSettingsLoading(false);
            }
        }
    }["useTenantState.useCallback[fetchSettings]"], []);
    const fetchTenantUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantState.useCallback[fetchTenantUsers]": async ()=>{
            try {
                setUsersLoading(true);
                const res = await fetch('/api/tenant/users');
                if (res.ok) {
                    const result = await res.json();
                    setTenantUsers(result.users);
                }
            } catch  {} finally{
                setUsersLoading(false);
            }
        }
    }["useTenantState.useCallback[fetchTenantUsers]"], []);
    const fetchAuditLogs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantState.useCallback[fetchAuditLogs]": async ()=>{
            try {
                setAuditLoading(true);
                const params = new URLSearchParams({
                    page: auditPage.toString(),
                    limit: '15'
                });
                if (auditActionFilter) params.set('action', auditActionFilter);
                const res = await fetch(`/api/tenant/audit-log?${params.toString()}`);
                if (res.ok) {
                    const result = await res.json();
                    setAuditLogs(result.logs);
                    setAuditPagination(result.pagination);
                }
            } catch  {} finally{
                setAuditLoading(false);
            }
        }
    }["useTenantState.useCallback[fetchAuditLogs]"], [
        auditPage,
        auditActionFilter
    ]);
    const fetchNeracaSaldo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantState.useCallback[fetchNeracaSaldo]": async ()=>{
            try {
                setNeracaSaldoLoading(true);
                const params = new URLSearchParams();
                if (neracaSaldoStartDate) params.set('startDate', neracaSaldoStartDate);
                if (neracaSaldoEndDate) params.set('endDate', neracaSaldoEndDate);
                const qs = params.toString();
                const res = await fetch(`/api/tenant/neraca-saldo${qs ? `?${qs}` : ''}`);
                if (res.ok) {
                    const result = await res.json();
                    setNeracaSaldoData(result);
                }
            } catch  {} finally{
                setNeracaSaldoLoading(false);
            }
        }
    }["useTenantState.useCallback[fetchNeracaSaldo]"], [
        neracaSaldoStartDate,
        neracaSaldoEndDate
    ]);
    const fetchArusKas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantState.useCallback[fetchArusKas]": async ()=>{
            try {
                setArusKasLoading(true);
                const params = new URLSearchParams();
                if (arusKasStartDate) params.set('startDate', arusKasStartDate);
                if (arusKasEndDate) params.set('endDate', arusKasEndDate);
                const qs = params.toString();
                const res = await fetch(`/api/tenant/arus-kas${qs ? `?${qs}` : ''}`);
                if (res.ok) {
                    const result = await res.json();
                    setArusKasData(result);
                }
            } catch  {} finally{
                setArusKasLoading(false);
            }
        }
    }["useTenantState.useCallback[fetchArusKas]"], [
        arusKasStartDate,
        arusKasEndDate
    ]);
    // ─── Effects ───────────────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTenantState.useEffect": ()=>{
            fetchDashboard();
        }
    }["useTenantState.useEffect"], [
        fetchDashboard
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTenantState.useEffect": ()=>{
            if (tenantTab === 'akun' || tenantTab === 'buku-besar' || tenantTab === 'laporan' || tenantTab === 'jurnal' || tenantTab === 'neraca-saldo' || tenantTab === 'arus-kas') {
                if (akunList.length === 0) {
                    fetchAkun();
                }
            }
        }
    }["useTenantState.useEffect"], [
        tenantTab,
        fetchAkun,
        akunList.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTenantState.useEffect": ()=>{
            if (tenantTab === 'jurnal') {
                fetchJurnal();
            }
        }
    }["useTenantState.useEffect"], [
        tenantTab,
        fetchJurnal
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTenantState.useEffect": ()=>{
            if (tenantTab === 'laporan') {
                if (laporanSubTab === 'neraca') {
                    fetchNeraca();
                } else {
                    fetchLabaRugi();
                }
            }
        }
    }["useTenantState.useEffect"], [
        tenantTab,
        laporanSubTab,
        fetchNeraca,
        fetchLabaRugi
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTenantState.useEffect": ()=>{
            if (tenantTab === 'buku-besar' && bukuBesarAkun) {
                fetchBukuBesar(bukuBesarAkun);
            }
        }
    }["useTenantState.useEffect"], [
        tenantTab,
        bukuBesarAkun,
        fetchBukuBesar
    ]);
    // Reset page when filter changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTenantState.useEffect": ()=>{
            if (tenantTab === 'jurnal') {
                setJurnalPage(1);
            }
        }
    }["useTenantState.useEffect"], [
        jurnalTipeFilter,
        tenantTab
    ]);
    // Fetch data for new tabs
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTenantState.useEffect": ()=>{
            if (tenantTab === 'penjualan') fetchPenjualan();
        }
    }["useTenantState.useEffect"], [
        tenantTab,
        fetchPenjualan
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTenantState.useEffect": ()=>{
            if (tenantTab === 'pembelian') fetchPembelian();
        }
    }["useTenantState.useEffect"], [
        tenantTab,
        fetchPembelian
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTenantState.useEffect": ()=>{
            if (tenantTab === 'simpanan') fetchSimpanan();
        }
    }["useTenantState.useEffect"], [
        tenantTab,
        fetchSimpanan
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTenantState.useEffect": ()=>{
            if (tenantTab === 'pinjaman') fetchPinjaman();
        }
    }["useTenantState.useEffect"], [
        tenantTab,
        fetchPinjaman
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTenantState.useEffect": ()=>{
            if (tenantTab === 'pelanggan') fetchPelanggan();
        }
    }["useTenantState.useEffect"], [
        tenantTab,
        fetchPelanggan
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTenantState.useEffect": ()=>{
            if (tenantTab === 'pemasok') fetchPemasok();
        }
    }["useTenantState.useEffect"], [
        tenantTab,
        fetchPemasok
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTenantState.useEffect": ()=>{
            if (tenantTab === 'persediaan') fetchPersediaan();
        }
    }["useTenantState.useEffect"], [
        tenantTab,
        fetchPersediaan
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTenantState.useEffect": ()=>{
            if (tenantTab === 'pengaturan') {
                if (pengaturanSubTab === 'perusahaan') fetchSettings();
                else if (pengaturanSubTab === 'pengguna') fetchTenantUsers();
                else if (pengaturanSubTab === 'log') fetchAuditLogs();
            }
        }
    }["useTenantState.useEffect"], [
        tenantTab,
        pengaturanSubTab,
        fetchSettings,
        fetchTenantUsers,
        fetchAuditLogs
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTenantState.useEffect": ()=>{
            if (tenantTab === 'pengaturan' && pengaturanSubTab === 'log') {
                setAuditPage(1);
            }
        }
    }["useTenantState.useEffect"], [
        auditActionFilter,
        tenantTab,
        pengaturanSubTab
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTenantState.useEffect": ()=>{
            if (tenantTab === 'neraca-saldo') fetchNeracaSaldo();
        }
    }["useTenantState.useEffect"], [
        tenantTab,
        fetchNeracaSaldo
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTenantState.useEffect": ()=>{
            if (tenantTab === 'arus-kas') fetchArusKas();
        }
    }["useTenantState.useEffect"], [
        tenantTab,
        fetchArusKas
    ]);
    // ─── Derived / Computed Values ─────────────────────────────────────────────
    const jurnalTotalDebit = jurnalDetails.reduce((s, d)=>s + (d.debit || 0), 0);
    const jurnalTotalKredit = jurnalDetails.reduce((s, d)=>s + (d.kredit || 0), 0);
    const isJurnalBalanced = jurnalTotalDebit > 0 && jurnalTotalKredit > 0 && Math.abs(jurnalTotalDebit - jurnalTotalKredit) < 1;
    const labaRugi = data ? data.summary.totalPendapatan - data.summary.totalBeban : 0;
    const isProfit = labaRugi >= 0;
    // Akun data processing
    const filteredAkun = akunList.filter((a)=>a.namaAkun.toLowerCase().includes(akunSearch.toLowerCase()) || a.kodeAkun.toLowerCase().includes(akunSearch.toLowerCase()));
    const neracaAkun = filteredAkun.filter((a)=>a.kelompok === 'Neraca');
    const labaRugiAkun = filteredAkun.filter((a)=>a.kelompok === 'Laba Rugi');
    const ungroupedAkun = filteredAkun.filter((a)=>!a.kelompok);
    const totalNeraca = neracaAkun.reduce((sum, a)=>sum + a.saldo, 0);
    const totalLabaRugi = labaRugiAkun.reduce((sum, a)=>sum + a.saldo, 0);
    return {
        // Store
        tenantTab,
        // Dashboard
        data,
        isLoading,
        comingSoonModal,
        setComingSoonModal,
        // Akun
        akunList,
        akunLoading,
        akunSearch,
        setAkunSearch,
        filteredAkun,
        neracaAkun,
        labaRugiAkun,
        ungroupedAkun,
        totalNeraca,
        totalLabaRugi,
        showAkunModal,
        setShowAkunModal,
        akunForm,
        setAkunForm,
        akunFormLoading,
        setAkunFormLoading,
        editingAkun,
        setEditingAkun,
        deleteConfirm,
        setDeleteConfirm,
        // Jurnal
        jurnalList,
        jurnalLoading,
        jurnalPage,
        setJurnalPage,
        jurnalPagination,
        jurnalTipeFilter,
        setJurnalTipeFilter,
        jurnalApprovalFilter,
        setJurnalApprovalFilter,
        expandedJurnal,
        setExpandedJurnal,
        showJurnalModal,
        setShowJurnalModal,
        jurnalFormLoading,
        jurnalForm,
        setJurnalForm,
        jurnalDetails,
        setJurnalDetails,
        jurnalTotalDebit,
        jurnalTotalKredit,
        isJurnalBalanced,
        // Laporan
        laporanSubTab,
        setLaporanSubTab,
        neracaData,
        labaRugiData,
        laporanLoading,
        laporanStartDate,
        setLaporanStartDate,
        laporanEndDate,
        setLaporanEndDate,
        // Buku Besar
        bukuBesarAkun,
        setBukuBesarAkun,
        bukuBesarData,
        bukuBesarLoading,
        bukuBesarStartDate,
        setBukuBesarStartDate,
        bukuBesarEndDate,
        setBukuBesarEndDate,
        // Neraca Saldo
        neracaSaldoData,
        neracaSaldoLoading,
        neracaSaldoStartDate,
        setNeracaSaldoStartDate,
        neracaSaldoEndDate,
        setNeracaSaldoEndDate,
        // Arus Kas
        arusKasData,
        arusKasLoading,
        arusKasStartDate,
        setArusKasStartDate,
        arusKasEndDate,
        setArusKasEndDate,
        // Penjualan
        penjualanList,
        penjualanLoading,
        penjualanPagination,
        penjualanSearch,
        setPenjualanSearch,
        showPenjualanModal,
        setShowPenjualanModal,
        penjualanForm,
        setPenjualanForm,
        penjualanFormLoading,
        setPenjualanFormLoading,
        // Pembelian
        pembelianList,
        pembelianLoading,
        pembelianPagination,
        pembelianSearch,
        setPembelianSearch,
        showPembelianModal,
        setShowPembelianModal,
        pembelianForm,
        setPembelianForm,
        pembelianFormLoading,
        setPembelianFormLoading,
        // Simpanan
        simpananList,
        simpananLoading,
        simpananFilter,
        setSimpananFilter,
        showSimpananModal,
        setShowSimpananModal,
        simpananForm,
        setSimpananForm,
        simpananFormLoading,
        setSimpananFormLoading,
        // Pinjaman
        pinjamanList,
        pinjamanLoading,
        pinjamanFilter,
        setPinjamanFilter,
        showPinjamanModal,
        setShowPinjamanModal,
        pinjamanForm,
        setPinjamanForm,
        pinjamanFormLoading,
        setPinjamanFormLoading,
        // Pelanggan
        pelangganList,
        pelangganLoading,
        pelangganSearch,
        setPelangganSearch,
        showPelangganModal,
        setShowPelangganModal,
        pelangganForm,
        setPelangganForm,
        pelangganFormLoading,
        setPelangganFormLoading,
        editingPelanggan,
        setEditingPelanggan,
        // Pemasok
        pemasokList,
        pemasokLoading,
        pemasokSearch,
        setPemasokSearch,
        showPemasokModal,
        setShowPemasokModal,
        pemasokForm,
        setPemasokForm,
        pemasokFormLoading,
        setPemasokFormLoading,
        editingPemasok,
        setEditingPemasok,
        // Persediaan
        persediaanList,
        persediaanLoading,
        persediaanSearch,
        setPersediaanSearch,
        persediaanSummary,
        showPersediaanModal,
        setShowPersediaanModal,
        persediaanForm,
        setPersediaanForm,
        persediaanFormLoading,
        setPersediaanFormLoading,
        editingPersediaan,
        setEditingPersediaan,
        deletePersediaanConfirm,
        setDeletePersediaanConfirm,
        // Pengaturan
        settingsData,
        settingsLoading,
        settingsSaving,
        setSettingsSaving,
        settingsForm,
        setSettingsForm,
        tenantUsers,
        usersLoading,
        showUserModal,
        setShowUserModal,
        userForm,
        setUserForm,
        userFormLoading,
        setUserFormLoading,
        deleteUserConfirm,
        setDeleteUserConfirm,
        auditLogs,
        auditLoading,
        auditPagination,
        auditPage,
        setAuditPage,
        auditActionFilter,
        setAuditActionFilter,
        pengaturanSubTab,
        setPengaturanSubTab,
        // Password
        showPasswordModal,
        setShowPasswordModal,
        // Sidebar
        sidebarOpen,
        setSidebarOpen,
        // Computed
        labaRugi,
        isProfit,
        // Fetch functions
        fetchDashboard,
        fetchAkun,
        fetchJurnal,
        fetchNeraca,
        fetchLabaRugi,
        fetchBukuBesar,
        fetchPenjualan,
        fetchPembelian,
        fetchSimpanan,
        fetchPinjaman,
        fetchPelanggan,
        fetchPemasok,
        fetchPersediaan,
        fetchSettings,
        fetchTenantUsers,
        fetchAuditLogs,
        fetchNeracaSaldo,
        fetchArusKas
    };
}
_s(useTenantState, "uPrQw/IYI6qriZYctmPRDXGtExM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-tenant-handlers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTenantHandlers",
    ()=>useTenantHandlers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$tenant$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-tenant-state.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useTenantHandlers() {
    _s();
    const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$tenant$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTenantState"])();
    // ─── Jurnal Form Handlers ──────────────────────────────────────────────────
    const resetJurnalForm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[resetJurnalForm]": ()=>{
            s.setJurnalForm({
                tanggal: new Date().toISOString().split('T')[0],
                keterangan: '',
                noBukti: '',
                tipe: 'umum'
            });
            s.setJurnalDetails([
                {
                    kodeAkun: '',
                    debit: 0,
                    kredit: 0
                },
                {
                    kodeAkun: '',
                    debit: 0,
                    kredit: 0
                }
            ]);
        }
    }["useTenantHandlers.useCallback[resetJurnalForm]"], [
        s.setJurnalForm,
        s.setJurnalDetails
    ]);
    const handleJurnalDetailChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleJurnalDetailChange]": (index, field, value)=>{
            s.setJurnalDetails({
                "useTenantHandlers.useCallback[handleJurnalDetailChange]": (prev)=>{
                    const updated = [
                        ...prev
                    ];
                    updated[index] = {
                        ...updated[index],
                        [field]: value
                    };
                    return updated;
                }
            }["useTenantHandlers.useCallback[handleJurnalDetailChange]"]);
        }
    }["useTenantHandlers.useCallback[handleJurnalDetailChange]"], [
        s.setJurnalDetails
    ]);
    const addJurnalDetailRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[addJurnalDetailRow]": ()=>{
            s.setJurnalDetails({
                "useTenantHandlers.useCallback[addJurnalDetailRow]": (prev)=>[
                        ...prev,
                        {
                            kodeAkun: '',
                            debit: 0,
                            kredit: 0
                        }
                    ]
            }["useTenantHandlers.useCallback[addJurnalDetailRow]"]);
        }
    }["useTenantHandlers.useCallback[addJurnalDetailRow]"], [
        s.setJurnalDetails
    ]);
    const removeJurnalDetailRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[removeJurnalDetailRow]": (index)=>{
            s.setJurnalDetails({
                "useTenantHandlers.useCallback[removeJurnalDetailRow]": (prev)=>{
                    if (prev.length <= 2) return prev;
                    return prev.filter({
                        "useTenantHandlers.useCallback[removeJurnalDetailRow]": (_, i)=>i !== index
                    }["useTenantHandlers.useCallback[removeJurnalDetailRow]"]);
                }
            }["useTenantHandlers.useCallback[removeJurnalDetailRow]"]);
        }
    }["useTenantHandlers.useCallback[removeJurnalDetailRow]"], [
        s.setJurnalDetails
    ]);
    const handleSubmitJurnal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleSubmitJurnal]": async ()=>{
            if (!s.isJurnalBalanced) return;
            try {
                s.setJurnalFormLoading(true);
                const details = s.jurnalDetails.map({
                    "useTenantHandlers.useCallback[handleSubmitJurnal].details": (d)=>({
                            kodeAkun: d.kodeAkun,
                            debit: d.debit || 0,
                            kredit: d.kredit || 0
                        })
                }["useTenantHandlers.useCallback[handleSubmitJurnal].details"]).filter({
                    "useTenantHandlers.useCallback[handleSubmitJurnal].details": (d)=>d.kodeAkun
                }["useTenantHandlers.useCallback[handleSubmitJurnal].details"]);
                if (details.length < 2) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Minimal 2 baris detail akun diperlukan');
                    return;
                }
                const res = await fetch('/api/tenant/jurnal', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tanggal: s.jurnalForm.tanggal,
                        keterangan: s.jurnalForm.keterangan,
                        noBukti: s.jurnalForm.noBukti,
                        tipe: s.jurnalForm.tipe,
                        details
                    })
                });
                if (res.ok) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Jurnal berhasil dibuat!');
                    s.setShowJurnalModal(false);
                    resetJurnalForm();
                    s.fetchJurnal();
                } else {
                    const err = await res.json();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err.error || 'Gagal membuat jurnal');
                }
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal membuat jurnal');
            } finally{
                s.setJurnalFormLoading(false);
            }
        }
    }["useTenantHandlers.useCallback[handleSubmitJurnal]"], [
        s.isJurnalBalanced,
        s.jurnalDetails,
        s.jurnalForm,
        s.setJurnalFormLoading,
        s.setShowJurnalModal,
        resetJurnalForm,
        s.fetchJurnal
    ]);
    const handleApproveJurnal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleApproveJurnal]": async (id)=>{
            try {
                const res = await fetch('/api/tenant/jurnal/approve', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id,
                        isApproved: true
                    })
                });
                if (res.ok) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Jurnal berhasil disetujui');
                    s.fetchJurnal();
                } else {
                    const err = await res.json();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err.error || 'Gagal menyetujui jurnal');
                }
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal menyetujui jurnal');
            }
        }
    }["useTenantHandlers.useCallback[handleApproveJurnal]"], [
        s.fetchJurnal
    ]);
    const handleRejectJurnal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleRejectJurnal]": async (id, rejectReason)=>{
            try {
                const res = await fetch('/api/tenant/jurnal/approve', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id,
                        isApproved: false,
                        rejectReason
                    })
                });
                if (res.ok) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Jurnal berhasil ditolak');
                    s.fetchJurnal();
                } else {
                    const err = await res.json();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err.error || 'Gagal menolak jurnal');
                }
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal menolak jurnal');
            }
        }
    }["useTenantHandlers.useCallback[handleRejectJurnal]"], [
        s.fetchJurnal
    ]);
    // ─── Akun CRUD Handlers ────────────────────────────────────────────────────
    const handleOpenCreateAkun = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleOpenCreateAkun]": ()=>{
            s.setEditingAkun(null);
            s.setAkunForm({
                kodeAkun: '',
                namaAkun: '',
                tipeAkun: 'Kas & Bank',
                kelompok: 'Neraca',
                saldoAwal: 0
            });
            s.setShowAkunModal(true);
        }
    }["useTenantHandlers.useCallback[handleOpenCreateAkun]"], [
        s.setEditingAkun,
        s.setAkunForm,
        s.setShowAkunModal
    ]);
    const handleEditAkun = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleEditAkun]": (akun)=>{
            s.setEditingAkun(akun);
            s.setAkunForm({
                kodeAkun: akun.kodeAkun,
                namaAkun: akun.namaAkun,
                tipeAkun: akun.tipeAkun,
                kelompok: akun.kelompok || 'Neraca',
                saldoAwal: akun.saldoAwal
            });
            s.setShowAkunModal(true);
        }
    }["useTenantHandlers.useCallback[handleEditAkun]"], [
        s.setEditingAkun,
        s.setAkunForm,
        s.setShowAkunModal
    ]);
    const handleSaveAkun = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleSaveAkun]": async ()=>{
            s.setAkunFormLoading(true);
            try {
                const url = s.editingAkun ? `/api/tenant/akun?id=${s.editingAkun.id}` : '/api/tenant/akun';
                const method = s.editingAkun ? 'PUT' : 'POST';
                const res = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(s.akunForm)
                });
                if (res.ok) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(s.editingAkun ? 'Akun diperbarui!' : 'Akun ditambahkan!');
                    s.setShowAkunModal(false);
                    s.fetchAkun();
                } else {
                    const e = await res.json();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(e.error || 'Gagal');
                }
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal');
            } finally{
                s.setAkunFormLoading(false);
            }
        }
    }["useTenantHandlers.useCallback[handleSaveAkun]"], [
        s.editingAkun,
        s.akunForm,
        s.setAkunFormLoading,
        s.setShowAkunModal,
        s.fetchAkun
    ]);
    const handleDeleteAkun = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleDeleteAkun]": async ()=>{
            if (!s.deleteConfirm) return;
            try {
                const res = await fetch(`/api/tenant/akun?id=${s.deleteConfirm}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Akun berhasil dihapus');
                    s.setDeleteConfirm(null);
                    s.fetchAkun();
                } else {
                    const e = await res.json();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(e.error || 'Gagal menghapus');
                }
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal');
            }
        }
    }["useTenantHandlers.useCallback[handleDeleteAkun]"], [
        s.deleteConfirm,
        s.setDeleteConfirm,
        s.fetchAkun
    ]);
    // ─── Penjualan Handlers ────────────────────────────────────────────────────
    const handleSubmitPenjualan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleSubmitPenjualan]": async ()=>{
            s.setPenjualanFormLoading(true);
            try {
                const res = await fetch('/api/tenant/penjualan', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(s.penjualanForm)
                });
                if (res.ok) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Penjualan berhasil ditambahkan!');
                    s.setShowPenjualanModal(false);
                    s.setPenjualanForm({
                        tanggalFaktur: new Date().toISOString().split('T')[0],
                        pelangganId: '',
                        total: 0,
                        keterangan: ''
                    });
                    s.fetchPenjualan();
                } else {
                    const e = await res.json();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(e.error || 'Gagal');
                }
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal');
            } finally{
                s.setPenjualanFormLoading(false);
            }
        }
    }["useTenantHandlers.useCallback[handleSubmitPenjualan]"], [
        s.penjualanForm,
        s.setPenjualanFormLoading,
        s.setShowPenjualanModal,
        s.setPenjualanForm,
        s.fetchPenjualan
    ]);
    const handleDeletePenjualan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleDeletePenjualan]": async (id)=>{
            const res = await fetch(`/api/tenant/penjualan?id=${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Berhasil dihapus');
                s.fetchPenjualan();
            } else __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal menghapus');
        }
    }["useTenantHandlers.useCallback[handleDeletePenjualan]"], [
        s.fetchPenjualan
    ]);
    // ─── Pembelian Handlers ────────────────────────────────────────────────────
    const handleSubmitPembelian = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleSubmitPembelian]": async ()=>{
            s.setPembelianFormLoading(true);
            try {
                const res = await fetch('/api/tenant/pembelian', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(s.pembelianForm)
                });
                if (res.ok) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Pembelian berhasil ditambahkan!');
                    s.setShowPembelianModal(false);
                    s.setPembelianForm({
                        tanggalFaktur: new Date().toISOString().split('T')[0],
                        pemasokId: '',
                        total: 0,
                        keterangan: ''
                    });
                    s.fetchPembelian();
                } else {
                    const e = await res.json();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(e.error || 'Gagal');
                }
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal');
            } finally{
                s.setPembelianFormLoading(false);
            }
        }
    }["useTenantHandlers.useCallback[handleSubmitPembelian]"], [
        s.pembelianForm,
        s.setPembelianFormLoading,
        s.setShowPembelianModal,
        s.setPembelianForm,
        s.fetchPembelian
    ]);
    const handleDeletePembelian = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleDeletePembelian]": async (id)=>{
            const res = await fetch(`/api/tenant/pembelian?id=${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Berhasil dihapus');
                s.fetchPembelian();
            } else __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal menghapus');
        }
    }["useTenantHandlers.useCallback[handleDeletePembelian]"], [
        s.fetchPembelian
    ]);
    // ─── Simpanan Handlers ─────────────────────────────────────────────────────
    const handleSubmitSimpanan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleSubmitSimpanan]": async ()=>{
            s.setSimpananFormLoading(true);
            try {
                const res = await fetch('/api/tenant/simpanan', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(s.simpananForm)
                });
                if (res.ok) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Simpanan berhasil ditambahkan!');
                    s.setShowSimpananModal(false);
                    s.setSimpananForm({
                        jenisSimpanan: 'Simpanan Pokok',
                        namaAnggota: '',
                        jenisTransaksi: 'setor',
                        jumlah: 0,
                        tanggal: new Date().toISOString().split('T')[0],
                        keterangan: ''
                    });
                    s.fetchSimpanan();
                } else {
                    const e = await res.json();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(e.error || 'Gagal');
                }
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal');
            } finally{
                s.setSimpananFormLoading(false);
            }
        }
    }["useTenantHandlers.useCallback[handleSubmitSimpanan]"], [
        s.simpananForm,
        s.setSimpananFormLoading,
        s.setShowSimpananModal,
        s.setSimpananForm,
        s.fetchSimpanan
    ]);
    // ─── Pinjaman Handlers ─────────────────────────────────────────────────────
    const handleSubmitPinjaman = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleSubmitPinjaman]": async ()=>{
            s.setPinjamanFormLoading(true);
            try {
                const res = await fetch('/api/tenant/pinjaman', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(s.pinjamanForm)
                });
                if (res.ok) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Pinjaman berhasil ditambahkan!');
                    s.setShowPinjamanModal(false);
                    s.setPinjamanForm({
                        jenisPinjaman: 'Pinjaman Reguler',
                        namaAnggota: '',
                        jumlahPokok: 0,
                        bunga: 1.5,
                        tanggal: new Date().toISOString().split('T')[0],
                        keterangan: ''
                    });
                    s.fetchPinjaman();
                } else {
                    const e = await res.json();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(e.error || 'Gagal');
                }
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal');
            } finally{
                s.setPinjamanFormLoading(false);
            }
        }
    }["useTenantHandlers.useCallback[handleSubmitPinjaman]"], [
        s.pinjamanForm,
        s.setPinjamanFormLoading,
        s.setShowPinjamanModal,
        s.setPinjamanForm,
        s.fetchPinjaman
    ]);
    // ─── Pelanggan Handlers ────────────────────────────────────────────────────
    const handleSubmitPelanggan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleSubmitPelanggan]": async ()=>{
            s.setPelangganFormLoading(true);
            try {
                const url = s.editingPelanggan ? `/api/tenant/pelanggan?id=${s.editingPelanggan.id}` : '/api/tenant/pelanggan';
                const method = s.editingPelanggan ? 'PUT' : 'POST';
                const res = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(s.pelangganForm)
                });
                if (res.ok) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(s.editingPelanggan ? 'Pelanggan diperbarui!' : 'Pelanggan ditambahkan!');
                    s.setShowPelangganModal(false);
                    s.setEditingPelanggan(null);
                    s.setPelangganForm({
                        nama: '',
                        alamat: '',
                        telepon: '',
                        email: ''
                    });
                    s.fetchPelanggan();
                } else {
                    const e = await res.json();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(e.error || 'Gagal');
                }
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal');
            } finally{
                s.setPelangganFormLoading(false);
            }
        }
    }["useTenantHandlers.useCallback[handleSubmitPelanggan]"], [
        s.editingPelanggan,
        s.pelangganForm,
        s.setPelangganFormLoading,
        s.setShowPelangganModal,
        s.setEditingPelanggan,
        s.setPelangganForm,
        s.fetchPelanggan
    ]);
    const handleDeletePelanggan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleDeletePelanggan]": async (id)=>{
            const res = await fetch(`/api/tenant/pelanggan?id=${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Berhasil dihapus');
                s.fetchPelanggan();
            } else __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal menghapus');
        }
    }["useTenantHandlers.useCallback[handleDeletePelanggan]"], [
        s.fetchPelanggan
    ]);
    // ─── Pemasok Handlers ──────────────────────────────────────────────────────
    const handleSubmitPemasok = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleSubmitPemasok]": async ()=>{
            s.setPemasokFormLoading(true);
            try {
                const url = s.editingPemasok ? `/api/tenant/pemasok?id=${s.editingPemasok.id}` : '/api/tenant/pemasok';
                const method = s.editingPemasok ? 'PUT' : 'POST';
                const res = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(s.pemasokForm)
                });
                if (res.ok) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(s.editingPemasok ? 'Pemasok diperbarui!' : 'Pemasok ditambahkan!');
                    s.setShowPemasokModal(false);
                    s.setEditingPemasok(null);
                    s.setPemasokForm({
                        nama: '',
                        alamat: '',
                        telepon: '',
                        email: ''
                    });
                    s.fetchPemasok();
                } else {
                    const e = await res.json();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(e.error || 'Gagal');
                }
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal');
            } finally{
                s.setPemasokFormLoading(false);
            }
        }
    }["useTenantHandlers.useCallback[handleSubmitPemasok]"], [
        s.editingPemasok,
        s.pemasokForm,
        s.setPemasokFormLoading,
        s.setShowPemasokModal,
        s.setEditingPemasok,
        s.setPemasokForm,
        s.fetchPemasok
    ]);
    const handleDeletePemasok = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleDeletePemasok]": async (id)=>{
            const res = await fetch(`/api/tenant/pemasok?id=${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Berhasil dihapus');
                s.fetchPemasok();
            } else __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal menghapus');
        }
    }["useTenantHandlers.useCallback[handleDeletePemasok]"], [
        s.fetchPemasok
    ]);
    // ─── Persediaan Handlers ───────────────────────────────────────────────────
    const handleSubmitPersediaan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleSubmitPersediaan]": async ()=>{
            s.setPersediaanFormLoading(true);
            try {
                const url = s.editingPersediaan ? '/api/tenant/persediaan' : '/api/tenant/persediaan';
                const method = s.editingPersediaan ? 'PUT' : 'POST';
                const body = s.editingPersediaan ? {
                    id: s.editingPersediaan.id,
                    ...s.persediaanForm
                } : s.persediaanForm;
                const res = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });
                if (res.ok) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(s.editingPersediaan ? 'Persediaan diperbarui!' : 'Persediaan ditambahkan!');
                    s.setShowPersediaanModal(false);
                    s.setEditingPersediaan(null);
                    s.setPersediaanForm({
                        namaBarang: '',
                        satuan: '',
                        hargaBeli: 0,
                        hargaJual: 0,
                        stok: 0
                    });
                    s.fetchPersediaan();
                } else {
                    const e = await res.json();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(e.error || 'Gagal');
                }
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal');
            } finally{
                s.setPersediaanFormLoading(false);
            }
        }
    }["useTenantHandlers.useCallback[handleSubmitPersediaan]"], [
        s.editingPersediaan,
        s.persediaanForm,
        s.setPersediaanFormLoading,
        s.setShowPersediaanModal,
        s.setEditingPersediaan,
        s.setPersediaanForm,
        s.fetchPersediaan
    ]);
    const handleEditPersediaan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleEditPersediaan]": (item)=>{
            s.setEditingPersediaan(item);
            s.setPersediaanForm({
                namaBarang: item.namaBarang,
                satuan: item.satuan || '',
                hargaBeli: item.hargaBeli,
                hargaJual: item.hargaJual,
                stok: item.stok
            });
            s.setShowPersediaanModal(true);
        }
    }["useTenantHandlers.useCallback[handleEditPersediaan]"], [
        s.setEditingPersediaan,
        s.setPersediaanForm,
        s.setShowPersediaanModal
    ]);
    const handleDeletePersediaan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleDeletePersediaan]": async (id)=>{
            const res = await fetch(`/api/tenant/persediaan?id=${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Persediaan berhasil dihapus');
                s.setDeletePersediaanConfirm(null);
                s.fetchPersediaan();
            } else __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal menghapus');
        }
    }["useTenantHandlers.useCallback[handleDeletePersediaan]"], [
        s.setDeletePersediaanConfirm,
        s.fetchPersediaan
    ]);
    // ─── Settings Handlers ─────────────────────────────────────────────────────
    const handleSaveSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleSaveSettings]": async ()=>{
            s.setSettingsSaving(true);
            try {
                const res = await fetch('/api/tenant/settings', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(s.settingsForm)
                });
                if (res.ok) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Pengaturan berhasil disimpan!');
                    s.fetchSettings();
                } else {
                    const e = await res.json();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(e.error || 'Gagal menyimpan');
                }
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal menyimpan pengaturan');
            } finally{
                s.setSettingsSaving(false);
            }
        }
    }["useTenantHandlers.useCallback[handleSaveSettings]"], [
        s.settingsForm,
        s.setSettingsSaving,
        s.fetchSettings
    ]);
    // ─── User Handlers ─────────────────────────────────────────────────────────
    const handleCreateUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleCreateUser]": async ()=>{
            s.setUserFormLoading(true);
            try {
                const res = await fetch('/api/tenant/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(s.userForm)
                });
                if (res.ok) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Pengguna berhasil ditambahkan!');
                    s.setShowUserModal(false);
                    s.setUserForm({
                        namaUser: '',
                        password: '',
                        role: 'staff',
                        jabatan: ''
                    });
                    s.fetchTenantUsers();
                } else {
                    const e = await res.json();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(e.error || 'Gagal');
                }
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal membuat pengguna');
            } finally{
                s.setUserFormLoading(false);
            }
        }
    }["useTenantHandlers.useCallback[handleCreateUser]"], [
        s.userForm,
        s.setUserFormLoading,
        s.setShowUserModal,
        s.setUserForm,
        s.fetchTenantUsers
    ]);
    const handleDeleteUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleDeleteUser]": async (id)=>{
            try {
                const res = await fetch(`/api/tenant/users?id=${id}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Pengguna berhasil dihapus');
                    s.setDeleteUserConfirm(null);
                    s.fetchTenantUsers();
                } else {
                    const e = await res.json();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(e.error || 'Gagal menghapus');
                }
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Gagal menghapus pengguna');
            }
        }
    }["useTenantHandlers.useCallback[handleDeleteUser]"], [
        s.setDeleteUserConfirm,
        s.fetchTenantUsers
    ]);
    // ─── Refresh Handler ───────────────────────────────────────────────────────
    const handleRefresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleRefresh]": ()=>{
            if (s.tenantTab === 'dashboard') s.fetchDashboard();
            else if (s.tenantTab === 'akun') s.fetchAkun();
            else if (s.tenantTab === 'jurnal') s.fetchJurnal();
            else if (s.tenantTab === 'laporan') {
                if (s.laporanSubTab === 'neraca') s.fetchNeraca();
                else s.fetchLabaRugi();
            } else if (s.tenantTab === 'buku-besar' && s.bukuBesarAkun) s.fetchBukuBesar(s.bukuBesarAkun);
            else if (s.tenantTab === 'neraca-saldo') s.fetchNeracaSaldo();
            else if (s.tenantTab === 'arus-kas') s.fetchArusKas();
            else if (s.tenantTab === 'penjualan') s.fetchPenjualan();
            else if (s.tenantTab === 'pembelian') s.fetchPembelian();
            else if (s.tenantTab === 'persediaan') s.fetchPersediaan();
            else if (s.tenantTab === 'simpanan') s.fetchSimpanan();
            else if (s.tenantTab === 'pinjaman') s.fetchPinjaman();
            else if (s.tenantTab === 'pelanggan') s.fetchPelanggan();
            else if (s.tenantTab === 'pemasok') s.fetchPemasok();
            else if (s.tenantTab === 'pengaturan') {
                if (s.pengaturanSubTab === 'perusahaan') s.fetchSettings();
                else if (s.pengaturanSubTab === 'pengguna') s.fetchTenantUsers();
                else if (s.pengaturanSubTab === 'log') s.fetchAuditLogs();
            }
        }
    }["useTenantHandlers.useCallback[handleRefresh]"], [
        s
    ]);
    // ─── Date Filter Apply Handlers ────────────────────────────────────────────
    const handleApplyLaporanDateFilter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleApplyLaporanDateFilter]": ()=>{
            if (s.laporanSubTab === 'neraca') s.fetchNeraca();
            else s.fetchLabaRugi();
        }
    }["useTenantHandlers.useCallback[handleApplyLaporanDateFilter]"], [
        s.laporanSubTab,
        s.fetchNeraca,
        s.fetchLabaRugi
    ]);
    const handleApplyBukuBesarDateFilter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleApplyBukuBesarDateFilter]": ()=>{
            if (s.bukuBesarAkun) s.fetchBukuBesar(s.bukuBesarAkun);
        }
    }["useTenantHandlers.useCallback[handleApplyBukuBesarDateFilter]"], [
        s.bukuBesarAkun,
        s.fetchBukuBesar
    ]);
    const handleResetNeracaSaldo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleResetNeracaSaldo]": ()=>{
            s.setNeracaSaldoStartDate('');
            s.setNeracaSaldoEndDate('');
            s.fetchNeracaSaldo();
        }
    }["useTenantHandlers.useCallback[handleResetNeracaSaldo]"], [
        s.setNeracaSaldoStartDate,
        s.setNeracaSaldoEndDate,
        s.fetchNeracaSaldo
    ]);
    const handleResetArusKas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTenantHandlers.useCallback[handleResetArusKas]": ()=>{
            s.setArusKasStartDate('');
            s.setArusKasEndDate('');
            s.fetchArusKas();
        }
    }["useTenantHandlers.useCallback[handleResetArusKas]"], [
        s.setArusKasStartDate,
        s.setArusKasEndDate,
        s.fetchArusKas
    ]);
    return {
        // Spread all state
        ...s,
        // Jurnal handlers
        resetJurnalForm,
        handleJurnalDetailChange,
        addJurnalDetailRow,
        removeJurnalDetailRow,
        handleSubmitJurnal,
        handleApproveJurnal,
        handleRejectJurnal,
        // Akun handlers
        handleOpenCreateAkun,
        handleEditAkun,
        handleSaveAkun,
        handleDeleteAkun,
        // Penjualan handlers
        handleSubmitPenjualan,
        handleDeletePenjualan,
        // Pembelian handlers
        handleSubmitPembelian,
        handleDeletePembelian,
        // Simpanan handlers
        handleSubmitSimpanan,
        // Pinjaman handlers
        handleSubmitPinjaman,
        // Pelanggan handlers
        handleSubmitPelanggan,
        handleDeletePelanggan,
        // Pemasok handlers
        handleSubmitPemasok,
        handleDeletePemasok,
        // Persediaan handlers
        handleSubmitPersediaan,
        handleEditPersediaan,
        handleDeletePersediaan,
        // Settings handlers
        handleSaveSettings,
        // User handlers
        handleCreateUser,
        handleDeleteUser,
        // Refresh handler
        handleRefresh,
        // Date filter handlers
        handleApplyLaporanDateFilter,
        handleApplyBukuBesarDateFilter,
        handleResetNeracaSaldo,
        handleResetArusKas
    };
}
_s(useTenantHandlers, "lGTLaOWeR0q0rLT+wVTp5nanpiY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$tenant$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTenantState"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-keyboard-shortcuts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TAB_ORDER",
    ()=>TAB_ORDER,
    "useKeyboardShortcuts",
    ()=>useKeyboardShortcuts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
// Tab order for Ctrl+1-9 shortcuts
const TAB_ORDER = [
    'dashboard',
    'jurnal',
    'akun',
    'laporan',
    'buku-besar',
    'neraca-saldo',
    'arus-kas',
    'penjualan',
    'pembelian'
];
function useKeyboardShortcuts(actions) {
    _s();
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useKeyboardShortcuts.useCallback[handleKeyDown]": (e)=>{
            const isMod = e.metaKey || e.ctrlKey;
            // Escape: close any open modal
            if (e.key === 'Escape') {
                e.preventDefault();
                actions.onCloseAllModals();
                return;
            }
            // Don't trigger shortcuts when typing in input/select/textarea unless it's Escape
            const target = e.target;
            const isTyping = target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA';
            // Ctrl+K / Cmd+K: Open command palette
            if (isMod && e.key === 'k') {
                e.preventDefault();
                actions.onOpenCommandPalette();
                return;
            }
            // Ctrl+/ / Cmd+/: Show shortcuts help
            if (isMod && e.key === '/') {
                e.preventDefault();
                actions.onShowShortcutsHelp();
                return;
            }
            // Skip remaining shortcuts when typing
            if (isTyping) return;
            // Ctrl+1-9: Switch between tabs
            if (isMod && e.key >= '1' && e.key <= '9') {
                e.preventDefault();
                const index = parseInt(e.key, 10) - 1;
                if (index < TAB_ORDER.length) {
                    actions.onSwitchTab(TAB_ORDER[index]);
                }
                return;
            }
            // Ctrl+N / Cmd+N: Create new item
            if (isMod && e.key === 'n') {
                e.preventDefault();
                actions.onCreateNew();
                return;
            }
        }
    }["useKeyboardShortcuts.useCallback[handleKeyDown]"], [
        actions
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useKeyboardShortcuts.useEffect": ()=>{
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "useKeyboardShortcuts.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["useKeyboardShortcuts.useEffect"];
        }
    }["useKeyboardShortcuts.useEffect"], [
        handleKeyDown
    ]);
}
_s(useKeyboardShortcuts, "0JgXOssVubdPSer79HeWAJtecaU=");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_hooks_88b28159._.js.map