"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { X, Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [newCount, setNewCount] = useState(0);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      if (isLoginPage) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/admin/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            if (isMounted) {
              setAuthenticated(true);
              setLoading(false);
            }
            // Fetch inquiries badge count
            fetchNewInquiryCount();
            return;
          }
        }
        // If not authenticated, redirect to login
        if (isMounted) {
          setAuthenticated(false);
          setLoading(false);
          router.replace("/admin/login");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        if (isMounted) {
          setLoading(false);
          router.replace("/admin/login");
        }
      }
    }

    async function fetchNewInquiryCount() {
      try {
        const res = await fetch("/api/admin/inquiries?status=new");
        if (res.ok) {
          const data = await res.json();
          if (data.success && isMounted) {
            setNewCount(data.inquiries.length);
          }
        }
      } catch {
        // silent
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname, isLoginPage, router]);

  // If on login page, render clean full-screen layout
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        {children}
      </div>
    );
  }

  // Loading indicator while verifying session
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-3">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        <p className="text-xs font-medium tracking-wide">Loading Royal Route Admin...</p>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-x-hidden font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0 sticky top-0 h-screen">
        <AdminSidebar newInquiryCount={newCount} />
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-72 bg-slate-900 h-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
            <AdminSidebar
              onCloseMobile={() => setMobileMenuOpen(false)}
              newInquiryCount={newCount}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-slate-950">
        <AdminHeader
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          title="Royal Route Admin"
          subtitle="Operations & Dispatch Dashboard"
          newCount={newCount}
        />
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
