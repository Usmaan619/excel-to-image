"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { authStore } from "@/store/auth-store"

const PUBLIC_ROUTES = ["/login", "/"]
const PROTECTED_ROUTES = ["/converter"]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const isAuthenticated = authStore.isAuthenticated()
    const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route))

    if (isProtectedRoute && !isAuthenticated) {
      router.push("/login")
    } else if (pathname === "/login" && isAuthenticated) {
      router.push("/converter")
    }

    setIsReady(true)
  }, [pathname, router])

  if (!isReady) return null

  return <>{children}</>
}
