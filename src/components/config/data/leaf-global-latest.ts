// oxlint-disable sort-keys
import type { ConfigRoot } from "@/components/config/config-viewer"

const config = {
  "config-version": {
    default: "3.0",
    noDesc: true,
  },
  async: {
    "async-chunk-send": {
      enabled: {
        default: false,
      },
    },
    "async-mob-spawning": {
      enabled: {
        default: true,
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
    "async-playerdata-save": {
      enabled: {
        default: false,

        // TODO
        // <div class="warning custom-block">
        // <p class="custom-block-title custom-block-title-default">Experimental</p>
        // Experimental feature, may cause data loss or data inconsistency in some circumstances!
        // </div>`
      },
    },
    "async-entity-tracker": {
      enabled: {
        default: false,
      },
      threads: {
        default: 0,
      },
    },
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
        default: "DISABLED",
      },
    },
  },
  performance: {
    "check-survival-before-growth": {
      "cactus-check-survival": {
        default: false,
      },
    },
    "despawn-time": {
      "proactive-weak-loading-despawn": {
        default: false,
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
    dab: {
      enabled: {
        default: false,
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
        default: `
  - villager
  - axolotl
  - hoglin
  - zombified_piglin
  - goat`,
      },
    },
    "enable-cached-minecraft-to-bukkit-entitytype-convert": {
      default: true,
    },
    "entity-goal": {
      "start-tick-chance": {
        "nearest-attackable-target": {
          default: -1,
        },
        "follow-parent": {
          default: -1,
        },
        "avoid-entity": {
          default: -1,
        },
        temptation: {
          default: -1,
        },
        "enderman-look-for-player": {
          default: -1,
        },
      },
    },
    "fast-biome-manager-seed-obfuscation": {
      enabled: {
        default: false,
      },
      "seed-obfuscation-key": {
        default: 513_317,
      },
    },
    "faster-random-generator": {
      enabled: {
        default: false,
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
    },
    "faster-structure-gen-future-sequencing": {
      default: true,
    },
    "reuse-random-ticking-blockpos": {
      default: false,
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
    "optimize-block-entities": {
      default: true,
    },
    "optimize-mob-despawn": {
      default: false,
    },
    // TODO: Add back when Leaf#528 merged
    // "optimize-entity-activation": {
    //     default: false,
    //     desc: `Whether to use a more efficient data structure for entity activation logic.<br>
    //         <br>
    //         __⚡Recommended value: \`true\`__<br>
    //         <div class="warning custom-block">
    //         <p class="custom-block-title custom-block-title-default">Experimental</p>
    //         Experimental feature, actively testing, please report any bugs you encounter.
    //         </div>`
    // },
    "only-tick-items-in-hand": {
      default: false,
    },
    "optimize-mob-spawning": {
      default: false,
    },
    "optimize-no-action-time": {
      "disable-light-check": {
        default: false,
      },
    },
    "optimize-player-movement": {
      default: true,
    },
    "optimize-random-tick": {
      default: false,
    },
    "optimize-waypoint": {
      default: false,
    },
    "optimized-powered-rails": {
      default: false,
    },
    "reduce-packets": {
      "reduce-entity-move-packets": {
        default: false,
      },
      "reduce-entity-motion-packets": {
        default: false,
      },
      "disable-useless-particles": {
        default: false,
      },
    },
    "skip-ai-for-non-aware-mob": {
      default: true,
    },
    datapack: {
      "skip-inactive-entity-for-execute-command": {
        default: false,
      },
    },
    "skip-map-item-data-updates-if-map-does-not-have-craftmaprenderer": {
      default: true,
    },
    "sleeping-block-entity": {
      default: false,
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
    },
    "create-snapshot-on-retrieving-blockstate": {
      default: true,
    },
    "use-virtual-thread": {
      "bukkit-async-scheduler": {
        default: false,
      },
      "folia-async-scheduler": {
        default: false,
      },
      "async-chat-executor": {
        default: true,
      },
      "download-pool": {
        default: false,
      },
      "auth-pool": {
        default: true,
      },
      "paper-configuration-pool": {
        default: true,
      },
    },
  },
  fixes: {
    "vanilla-bug-fix": {
      "mc-270656": {
        default: false,
      },
      "mc-301114": {
        default: false,
      },
      "mc-301114-max-entries": {
        default: 10_240,
      },
      // TODO: Add back when Leaf#727 merged
      // "mc-152094": {
      //     default: false,
      //     desc: `Whether to fix the bug that the End City ship generation gets cut at chunk borders.<br>
      //         Mojira link: [MC-152094](https://mojira.dev/MC-152094)`
      // }
    },
    "prevent-moving-into-weak-loaded-chunks": {
      enabled: {
        default: false,
      },
      projectiles: {
        default: false,
      },
    },
  },
  "gameplay-mechanisms": {
    "afk-command": {
      enabled: {
        default: false,
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
    player: {
      "max-use-item-distance": {
        default: 1.000_000_1,
      },
    },
    "allow-tripwire-dupe": {
      default: false,
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
    "ice-and-snow-chance": {
      default: 48,
    },
    // TODO: Add back when implemented it
    // "hide-item-component": {
    //     "hidden-types": {
    //         default: "[]",
    //         desc: `The list of component type keys that will be hidden from the client.<br>
    //             <br>
    //             See [List of components](https://minecraft.wiki/w/Data_component_format#List_of_components) to get the full list of available component type keys for items.<br>
    //             For example:
    //             <ul>
    //             <li>If a value \`[]\` is given, no item will be affected.</li>
    //             <li>If a value \`[\"minecraft:custom_data\"]\` is given, the item's \`custom_data\` component will be hidden on the player's client.</li>
    //             </ul>`
    //     },
    //     "enabled": {
    //         default: false,
    //         desc: `Whether to hide specified component information from the player's inventory sent to clients. Also see \`hidden-types\` above.<br>
    //             <br>
    //             It can be used to hide complex component data on an item to reduce rendering load, frequent animations on the client side, and network usage. The actual item data will not be affected.<br>
    //             <br>
    //             It is noted that this option is different from Paper's [item obfuscation](https://docs.papermc.io/paper/reference/global-configuration/#anticheat_obfuscation_items_enable_item_obfuscation). This option only hides item component data from the player's own inventory, instead of hiding data sent to others.<br>
    //             <br>
    //             <div class="tip custom-block">
    //             <p class="custom-block-title custom-block-title-default">Attention</p>
    //             It may break resource packs, client mods, or specific gameplay mechanics that rely on these client-side component data of items. Use with caution. You must know what components you are hiding!
    //             </div>`
    //     }
    // },
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
    "only-player-pushable": {
      default: false,
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
    "use-spigot-item-merging-mechanism": {
      default: false,
    },
    "use-vanilla-hopper": {
      default: false,
    },
  },
  network: {
    "async-switch-state": {
      default: false,
    },
    "chat-message-signature": {
      default: true,
    },
    OptimizeNonFlushPacketSending: {
      default: false,
    },
    "protocol-support": {
      "strict-mode": {
        default: false,
      },
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
  },
  misc: {
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
    "disable-world-data-saving": {
      worlds: {
        default: "[]",
      },
    },
    "including-5s-in-get-tps": {
      default: true,
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
    "remove-change-non-editable-sign-warning": {
      default: false,
    },
    "remove-spigot-check-bungee-config": {
      default: false,
    },
    "secure-seed": {
      enabled: {
        default: false,
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
    rebrand: {
      "server-mod-name": {
        default: "Leaf",
      },
      "server-gui-name": {
        default: "Leaf Console",
      },
    },
    message: {
      "unknown-command": {
        default: "default",
      },
    },
    "vanilla-username-check": {
      "remove-all-check": {
        default: false,
      },
      "enforce-skull-validation": {
        default: true,
      },
      "allow-old-players-join": {
        default: false,
      },
      "use-username-regex": {
        default: false,
      },
      "username-regex": {
        default: "^[a-zA-Z0-9_.]*$",
      },
    },
  },
} as const satisfies ConfigRoot
export default config
