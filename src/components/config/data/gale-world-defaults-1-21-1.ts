// oxlint-disable sort-keys
import type { ConfigRoot } from "@/components/config/config-viewer"
const config = {
  _version: {
    default: 1,
    noDesc: true,
  },
  "gameplay-mechanics": {
    "arrow-movement-resets-despawn-counter": {
      default: false,
    },
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
      "keep-mooshroom-rotation-after-shearing": {
        default: true,
      },
      "mc-110386": {
        default: true,
      },
      "mc-121706": {
        default: false,
      },
      "mc-238526": {
        default: false,
      },
      "mc-31819": {
        default: true,
      },
    },
    "hide-flames-on-entities-with-fire-resistance": {
      default: false,
    },
    technical: {
      "load-portal-destination-chunk-before-entity-teleport": {
        default: false,
      },
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
      "check-nearby-item": {
        hopper: {
          interval: {
            default: 1,
          },
          minecart: {
            interval: {
              default: 1,
            },
            "temporary-immunity": {
              "check-for-minecart-near-item-interval": {
                default: 20,
              },
              "check-for-minecart-near-item-while-active": {
                default: false,
              },
              "check-for-minecart-near-item-while-inactive": {
                default: true,
              },
              duration: {
                default: 100,
              },
              "max-item-horizontal-distance": {
                default: "24.0",
              },
              "max-item-vertical-distance": {
                default: "4.0",
              },
              "nearby-item-max-age": {
                default: 1200,
              },
            },
          },
        },
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
