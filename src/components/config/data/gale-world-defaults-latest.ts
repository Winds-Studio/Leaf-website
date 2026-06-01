import type { ConfigRoot } from "@/components/config/config-viewer"
const config = {
  _version: {
    default: 1,
    noDesc: true,
  },
  "gameplay-mechanics": {
    "entities-can-random-stroll-into-non-ticking-chunks": {
      default: true,
    },
    "entity-wake-up-duration-ratio-standard-deviation": {
      default: 0.2,
    },
    fixes: {
      "broadcast-crit-animations-as-the-entity-being-critted": {
        default: false,
      },
      "mc-121706": {
        default: false,
      },
      "mc-238526": {
        default: false,
      },
    },
    "hide-flames-on-entities-with-fire-resistance": {
      default: false,
    },
    "try-respawn-ender-dragon-after-end-crystal-place": {
      default: true,
    },
  },
  "small-optimizations": {
    "load-chunks": {
      "to-activate-climbing-entities": {
        default: false,
      },
      "to-spawn-phantoms": {
        default: false,
      },
    },
    "max-projectile-chunk-loads": {
      "per-projectile": {
        max: {
          default: 10,
        },
        "remove-from-world-after-reach-limit": {
          default: false,
        },
        "reset-movement-after-reach-limit": {
          default: false,
        },
      },
      "per-tick": {
        default: 10,
      },
    },
    "reduced-intervals": {
      "acquire-poi-for-stuck-entity": {
        default: 60,
      },
      "check-stuck-in-wall": {
        default: 10,
      },
      "villager-item-repickup": {
        default: 100,
      },
    },
    "save-fireworks": {
      default: true,
    },
    "use-optimized-sheep-offspring-color": {
      default: true,
    },
  },
} as const satisfies ConfigRoot
export default config
