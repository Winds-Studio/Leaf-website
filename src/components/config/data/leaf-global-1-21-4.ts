// oxlint-disable sort-keys
import type { ConfigRoot } from "@/components/config/config-viewer"
const config = {
  "config-version": {
    default: "3.0",
    noDesc: true,
  },
  async: {
    "parallel-world-ticking": {
      enabled: {
        default: false,
      },
      threads: {
        default: 8,
      },
      "log-container-creation-stacktraces": {
        default: false,
      },
      "disable-hard-throw": {
        default: false,
      },
      "async-unsafe-read-handling": {
        default: "BUFFERED",
      },
    },
    "async-entity-tracker": {
      enabled: {
        default: false,
      },
      "compat-mode": {
        default: false,
      },
      "max-threads": {
        default: 0,
      },
      keepalive: {
        default: 60,
      },
      "queue-size": {
        default: 0,
      },
    },
    "async-target-finding": {
      enabled: {
        default: false,
      },
      "async-alert-other": {
        default: true,
      },
      "async-search-block": {
        default: true,
      },
      "async-search-entity": {
        default: true,
      },
      "queue-size": {
        default: 0,
      },
    },
    "async-playerdata-save": {
      enabled: {
        default: false,

        // TODO
        // <div class="warning custom-block">
        // <p class="custom-block-title custom-block-title-default">实验性功能</p>
        // 实验性功能，在某些情况下可能导致数据丢失或数据不一致！
        // </div>`
      },
    },
    "async-pathfinding": {
      enabled: {
        default: false,
      },
      "max-threads": {
        default: 0,
      },
      keepalive: {
        default: 60,
      },
      "queue-size": {
        default: 0,
      },
      "reject-policy": {
        default: "CALLER_RUNS",
      },
    },
    "async-mob-spawning": {
      enabled: {
        default: true,
      },
    },
    "async-locator": {
      enabled: {
        default: false,
      },
      threads: {
        default: 0,
      },
      keepalive: {
        default: 60,
      },
    },
    "async-chunk-send": {
      enabled: {
        default: false,
      },
    },
  },
  performance: {
    "use-virtual-thread-for-user-authenticator": {
      default: true,
    },
    "use-virtual-thread-for-profile-executor": {
      default: false,
    },
    "use-virtual-thread-for-async-chat-executor": {
      default: true,
    },
    "use-virtual-thread-for-async-scheduler": {
      default: false,
    },
    "create-snapshot-on-retrieving-blockstate": {
      default: true,
    },
    "throttle-mob-spawning": {
      enabled: {
        default: false,
      },
      monster: {
        "min-failed": {
          default: 8,
        },
        "spawn-chance": {
          default: "25.0",
        },
      },
      creature: {
        "min-failed": {
          default: 8,
        },
        "spawn-chance": {
          default: "25.0",
        },
      },
      ambient: {
        "min-failed": {
          default: 8,
        },
        "spawn-chance": {
          default: "25.0",
        },
      },
      axolotls: {
        "min-failed": {
          default: 8,
        },
        "spawn-chance": {
          default: "25.0",
        },
      },
      underground_water_creature: {
        "min-failed": {
          default: 8,
        },
        "spawn-chance": {
          default: "25.0",
        },
      },
      water_creature: {
        "min-failed": {
          default: 8,
        },
        "spawn-chance": {
          default: "25.0",
        },
      },
      water_ambient: {
        "min-failed": {
          default: 8,
        },
        "spawn-chance": {
          default: "25.0",
        },
      },
      misc: {
        "min-failed": {
          default: 8,
        },
        "spawn-chance": {
          default: "25.0",
        },
      },
    },
    "inactive-goal-selector-throttle": {
      default: true,
    },
    "throttle-hopper-when-full": {
      enabled: {
        default: false,
      },
      "skip-ticks": {
        default: 8,
      },
    },
    "skip-map-item-data-updates-if-map-does-not-have-craftmaprenderer": {
      default: true,
    },
    "skip-ai-for-non-aware-mob": {
      default: true,
    },
    "reduce-packets": {
      "reduce-entity-move-packets": {
        default: false,
      },
    },
    "optimized-powered-rails": {
      default: false,
    },
    "optimise-random-tick": {
      default: false,
    },
    "optimize-player-movement": {
      default: true,
    },
    "only-tick-items-in-hand": {
      default: false,
    },
    "optimize-block-entities": {
      default: true,
    },
    "cache-biome": {
      enabled: {
        default: false,
      },
      "mob-spawning": {
        default: false,
      },
      advancements: {
        default: false,
      },
    },
    "faster-structure-gen-future-sequencing": {
      default: true,
    },
    "faster-random-generator": {
      enabled: {
        default: false,
      },
      "random-generator": {
        default: "Xoroshiro128PlusPlus",
      },
      "enable-for-worldgen": {
        default: false,
      },
      "warn-for-slime-chunk": {
        default: true,
      },
      "use-legacy-random-for-slime-chunk": {
        default: false,
      },
      "use-direct-implementation": {
        default: false,
      },
    },
    "cache-eye-fluid-status": {
      default: false,
    },
    "enable-cached-minecraft-to-bukkit-entitytype-convert": {
      default: true,
    },
    dab: {
      enabled: {
        default: true,
      },
      "dont-enable-if-in-water": {
        default: false,
      },
      "start-distance": {
        default: 12,
      },
      "max-tick-freq": {
        default: 20,
      },
      "activation-dist-mod": {
        default: 8,
      },
      "blacklisted-entities": {
        default: "[]",
      },
    },
    "dont-save-entity": {
      "dont-save-primed-tnt": {
        default: false,
      },
      "dont-save-falling-block": {
        default: false,
      },
    },
    "count-all-chunks-for-ticking": {
      default: false,
    },
    "check-survival-before-growth": {
      "cactus-check-survival": {
        default: false,
      },
    },
  },
  fixes: {
    "dont-place-player-if-server-full": {
      default: false,
    },
  },
  "gameplay-mechanisms": {
    "use-spigot-item-merging-mechanism": {
      default: true,
    },
    "spawner-settings": {
      enabled: {
        default: false,
      },
      checks: {
        "light-level-check": {
          default: false,
        },
        "spawner-max-nearby-check": {
          default: true,
        },
        "check-for-nearby-players": {
          default: true,
        },
        "spawner-block-checks": {
          default: false,
        },
        "water-prevent-spawn-check": {
          default: false,
        },
        "ignore-spawn-rules": {
          default: false,
        },
      },
      "min-spawn-delay": {
        default: 200,
      },
      "max-spawn-delay": {
        default: 800,
      },
    },
    "only-player-pushable": {
      default: false,
    },
    knockback: {
      "snowball-knockback-players": {
        default: false,
      },
      "egg-knockback-players": {
        default: false,
      },
      "can-player-knockback-zombie": {
        default: true,
      },
      "flush-location-while-knockback-player": {
        default: false,
      },
      "old-blast-protection-explosion-knockback": {
        default: false,
      },
    },
    "hide-item-component": {
      "hidden-types": {
        default: "[]",
      },
      enabled: {
        default: false,
      },
    },
    "death-item-drop-knockback": {
      "drop-around": {
        default: true,
      },
      "horizontal-force": {
        default: 0.5,
      },
      "vertical-force": {
        default: 0.2,
      },
    },
    "allow-tripwire-dupe": {
      default: false,
    },
    player: {
      "max-use-item-distance": {
        default: 1.000_000_1,
      },
    },
    "inventory-overflow-event": {
      enabled: {
        default: false,
      },
      "listener-class": {
        default: "com.example.package.PlayerInventoryOverflowEvent",
      },
    },
    "afk-command": {
      enabled: {
        default: false,
      },
    },
  },
  network: {
    "protocol-support": {
      "jade-protocol": {
        default: false,
      },
      "appleskin-protocol": {
        default: false,
      },
      "appleskin-protocol-sync-tick-interval": {
        default: 20,
      },
      "asteorbar-protocol": {
        default: false,
      },
      "chatimage-protocol": {
        default: false,
      },
      "xaero-map-protocol": {
        default: false,
      },
      "xaero-map-server-id": {
        default: 513_317,
      },
      "syncmatica-protocol": {
        default: false,
      },
      "syncmatica-quota": {
        default: false,
      },
      "syncmatica-quota-limit": {
        default: 40_000_000,
      },
      "do-a-barrel-roll-protocol": {
        default: false,
      },
      "do-a-barrel-roll-allow-thrusting": {
        default: false,
      },
      "do-a-barrel-roll-force-enabled": {
        default: false,
      },
      "do-a-barrel-roll-force-installed": {
        default: false,
      },
      "do-a-barrel-roll-installed-timeout": {
        default: 0,
      },
    },
    OptimizeNonFlushPacketSending: {
      default: false,
    },
    "chat-message-signature": {
      default: true,
    },
    "async-switch-state": {
      default: false,
    },
  },
  misc: {
    message: {
      "unknown-command": {
        default: "default",
      },
    },
    rebrand: {
      "server-mod-name": {
        default: "Leaf",
      },
      "server-gui-name": {
        default: "Leaf Console",
      },
    },
    sentry: {
      dsn: {
        default: "''",
      },
      "log-level": {
        default: "WARN",
      },
      "only-log-thrown": {
        default: true,
      },
    },
    "secure-seed": {
      enabled: {
        default: false,
      },
    },
    "remove-vanilla-username-check": {
      default: true,
    },
    "remove-spigot-check-bungee-config": {
      default: false,
    },
    "remove-change-non-editable-sign-warning": {
      default: false,
    },
    "region-format-settings": {
      "region-format": {
        default: "MCA",
      },
      "linear-compress-level": {
        default: 1,
      },
      "throw-on-unknown-extension-detected": {
        default: false,
      },
      "flush-interval-seconds": {
        default: 5,
      },
    },
    "lag-compensation": {
      enabled: {
        default: false,
      },
      "enable-for-water": {
        default: false,
      },
      "enable-for-lava": {
        default: false,
      },
    },
    "including-5s-in-get-tps": {
      default: true,
    },
    "connection-message": {
      join: {
        enabled: {
          default: true,
        },
        message: {
          default: "default",
        },
      },
      quit: {
        enabled: {
          default: true,
        },
        message: {
          default: "default",
        },
      },
    },
    cache: {
      "profile-lookup": {
        enabled: {
          default: false,
        },
        timeout: {
          default: 1440,
        },
        "max-size": {
          default: 8192,
        },
      },
    },
    "async-catcher": {
      enabled: {
        default: true,
      },
    },
  },
} as const satisfies ConfigRoot
export default config
