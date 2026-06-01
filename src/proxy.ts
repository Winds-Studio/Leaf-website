import type { NextFetchEvent, NextRequest } from "next/server"
import { createI18nMiddleware } from "fumadocs-core/i18n/middleware"
import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation"
import { NextResponse } from "next/server"
import { i18n } from "@/lib/i18n"

const i18nMiddleware = createI18nMiddleware(i18n)

const rewriteLLMObj = rewritePath("/:lang/docs{/*path}", "/:lang/llms.mdx/docs{/*path}")

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

export function proxy(request: NextRequest, context: NextFetchEvent) {
  if (request.nextUrl.pathname.includes("/.vinext/")) {
    return NextResponse.next()
  }

  if (isMarkdownPreferred(request)) {
    const result = rewriteLLMObj.rewrite(request.nextUrl.pathname)
    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl))
    }
  }

  return i18nMiddleware(request, context)
}

export default proxy
