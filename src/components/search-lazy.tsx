"use client"

import { lazy } from "react"

// Lazy-load the search dialog out of the initial bundle.
export default lazy(() => import("./search"))
