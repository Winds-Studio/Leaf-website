import type { ConfigRoot } from "@/components/config/config-viewer"
const config = {
  _version: {
    default: 1,
    noDesc: true,
  },
  "gameplay-mechanics": {
    "enable-book-writing": {
      default: true,
    },
  },
  "log-to-console": {
    chat: {
      "empty-message-warning": {
        default: false,
      },
      "expired-message-warning": {
        default: false,
      },
      "not-secure-marker": {
        default: true,
      },
    },
    "ignored-advancements": {
      default: true,
    },
    "invalid-pool-element-error-log-level": {
      default: "info",
    },
    "invalid-statistics": {
      default: true,
    },
    "legacy-material-initialization": {
      default: false,
    },
    "null-id-disconnections": {
      default: true,
    },
    "player-login-locations": {
      default: true,
    },
    "plugin-library-loader": {
      downloads: {
        default: true,
      },
      "library-loaded": {
        default: true,
      },
      "start-load-libraries-for-plugin": {
        default: true,
      },
    },
    "set-block-in-far-chunk": {
      default: true,
    },
    "unrecognized-recipes": {
      default: false,
    },
  },
  misc: {
    "ignore-null-legacy-structure-data": {
      default: false,
    },
    keepalive: {
      "send-multiple": {
        default: true,
      },
    },
    "last-tick-time-in-tps-command": {
      "add-oversleep": {
        default: false,
      },
      enabled: {
        default: false,
      },
    },
    "premium-account-slow-login-timeout": {
      default: -1,
    },
    "verify-chat-order": {
      default: true,
    },
  },
  "small-optimizations": {
    "reduced-intervals": {
      "increase-time-statistics": {
        default: 20,
      },
      "update-entity-line-of-sight": {
        default: 4,
      },
    },
  },
} as const satisfies ConfigRoot
export default config
