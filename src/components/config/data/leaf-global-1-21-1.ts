// oxlint-disable sort-keys
import type { ConfigRoot } from "@/components/config/config-viewer"
const config = {
  "config-version": {
    default: "3.0",
    noDesc: true,
  },
  async: {
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
    },
    "async-playerdata-save": {
      enabled: {
        default: false,
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
  },
  performance: {
    "use-virtual-thread-for-async-chat-executor": {
      default: true,
    },
    "use-virtual-thread-for-async-scheduler": {
      default: true,
    },
    "create-snapshot-on-retrieving-blockstate": {
      default: true,
    },
    "inactive-goal-selector-throttle": {
      default: true,
    },
    "throttle-hopper-when-full": {
      enabled: {
        default: false,
      },
      "skip-ticks": {
        default: 0,
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
      default: true,
    },
    "optimize-minecart": {
      enabled: {
        default: false,
      },
      "skip-tick-count": {
        default: 30,
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
    "entity-timeouts": {
      ALLAY: {
        default: -1,
        noDesc: true,
      },
      AREA_EFFECT_CLOUD: {
        default: -1,
        noDesc: true,
      },
      ARMADILLO: {
        default: -1,
        noDesc: true,
      },
      ARMOR_STAND: {
        default: -1,
        noDesc: true,
      },
      ARROW: {
        default: -1,
        noDesc: true,
      },
      AXOLOTL: {
        default: -1,
        noDesc: true,
      },
      BAT: {
        default: -1,
        noDesc: true,
      },
      BEE: {
        default: -1,
        noDesc: true,
      },
      BLAZE: {
        default: -1,
        noDesc: true,
      },
      BOAT: {
        default: -1,
        noDesc: true,
      },
      BOGGED: {
        default: -1,
        noDesc: true,
      },
      BREEZE: {
        default: -1,
        noDesc: true,
      },
      BREEZE_WIND_CHARGE: {
        default: -1,
        noDesc: true,
      },
      CAMEL: {
        default: -1,
        noDesc: true,
      },
      CAT: {
        default: -1,
        noDesc: true,
      },
      CAVE_SPIDER: {
        default: -1,
        noDesc: true,
      },
      CHEST_BOAT: {
        default: -1,
        noDesc: true,
      },
      CHEST_MINECART: {
        default: -1,
        noDesc: true,
      },
      CHICKEN: {
        default: -1,
        noDesc: true,
      },
      COD: {
        default: -1,
        noDesc: true,
      },
      COMMAND_BLOCK_MINECART: {
        default: -1,
        noDesc: true,
      },
      COW: {
        default: -1,
        noDesc: true,
      },
      CREEPER: {
        default: -1,
        noDesc: true,
      },
      DOLPHIN: {
        default: -1,
        noDesc: true,
      },
      DONKEY: {
        default: -1,
        noDesc: true,
      },
      DRAGON_FIREBALL: {
        default: -1,
        noDesc: true,
      },
      DROWNED: {
        default: -1,
        noDesc: true,
      },
      EGG: {
        default: -1,
        noDesc: true,
      },
      ELDER_GUARDIAN: {
        default: -1,
        noDesc: true,
      },
      ENDER_DRAGON: {
        default: -1,
        noDesc: true,
      },
      ENDER_PEARL: {
        default: -1,
        noDesc: true,
      },
      ENDERMAN: {
        default: -1,
        noDesc: true,
      },
      ENDERMITE: {
        default: -1,
        noDesc: true,
      },
      EVOKER: {
        default: -1,
        noDesc: true,
      },
      EVOKER_FANGS: {
        default: -1,
        noDesc: true,
      },
      EXPERIENCE_BOTTLE: {
        default: -1,
        noDesc: true,
      },
      EXPERIENCE_ORB: {
        default: -1,
        noDesc: true,
      },
      EYE_OF_ENDER: {
        default: -1,
        noDesc: true,
      },
      FIREWORK_ROCKET: {
        default: -1,
        noDesc: true,
      },
      FOX: {
        default: -1,
        noDesc: true,
      },
      FROG: {
        default: -1,
        noDesc: true,
      },
      FURNACE_MINECART: {
        default: -1,
        noDesc: true,
      },
      GHAST: {
        default: -1,
        noDesc: true,
      },
      GIANT: {
        default: -1,
        noDesc: true,
      },
      GLOW_SQUID: {
        default: -1,
        noDesc: true,
      },
      GOAT: {
        default: -1,
        noDesc: true,
      },
      GUARDIAN: {
        default: -1,
        noDesc: true,
      },
      HOGLIN: {
        default: -1,
        noDesc: true,
      },
      HOPPER_MINECART: {
        default: -1,
        noDesc: true,
      },
      HORSE: {
        default: -1,
        noDesc: true,
      },
      HUSK: {
        default: -1,
        noDesc: true,
      },
      ILLUSIONER: {
        default: -1,
        noDesc: true,
      },
      IRON_GOLEM: {
        default: -1,
        noDesc: true,
      },
      ITEM: {
        default: -1,
        noDesc: true,
      },
      OMINOUS_ITEM_SPAWNER: {
        default: -1,
        noDesc: true,
      },
      FIREBALL: {
        default: -1,
        noDesc: true,
      },
      LIGHTNING_BOLT: {
        default: -1,
        noDesc: true,
      },
      LLAMA: {
        default: -1,
        noDesc: true,
      },
      LLAMA_SPIT: {
        default: -1,
        noDesc: true,
      },
      MAGMA_CUBE: {
        default: -1,
        noDesc: true,
      },
      MOOSHROOM: {
        default: -1,
        noDesc: true,
      },
      MULE: {
        default: -1,
        noDesc: true,
      },
      OCELOT: {
        default: -1,
        noDesc: true,
      },
      PANDA: {
        default: -1,
        noDesc: true,
      },
      PARROT: {
        default: -1,
        noDesc: true,
      },
      PHANTOM: {
        default: -1,
        noDesc: true,
      },
      PIG: {
        default: -1,
        noDesc: true,
      },
      PIGLIN: {
        default: -1,
        noDesc: true,
      },
      PIGLIN_BRUTE: {
        default: -1,
        noDesc: true,
      },
      PILLAGER: {
        default: -1,
        noDesc: true,
      },
      POLAR_BEAR: {
        default: -1,
        noDesc: true,
      },
      POTION: {
        default: -1,
        noDesc: true,
      },
      PUFFERFISH: {
        default: -1,
        noDesc: true,
      },
      RABBIT: {
        default: -1,
        noDesc: true,
      },
      RAVAGER: {
        default: -1,
        noDesc: true,
      },
      SALMON: {
        default: -1,
        noDesc: true,
      },
      SHEEP: {
        default: -1,
        noDesc: true,
      },
      SHULKER: {
        default: -1,
        noDesc: true,
      },
      SHULKER_BULLET: {
        default: -1,
        noDesc: true,
      },
      SILVERFISH: {
        default: -1,
        noDesc: true,
      },
      SKELETON: {
        default: -1,
        noDesc: true,
      },
      SKELETON_HORSE: {
        default: -1,
        noDesc: true,
      },
      SLIME: {
        default: -1,
        noDesc: true,
      },
      SMALL_FIREBALL: {
        default: -1,
        noDesc: true,
      },
      SNIFFER: {
        default: -1,
        noDesc: true,
      },
      SNOW_GOLEM: {
        default: -1,
        noDesc: true,
      },
      SNOWBALL: {
        default: -1,
        noDesc: true,
      },
      SPAWNER_MINECART: {
        default: -1,
        noDesc: true,
      },
      SPECTRAL_ARROW: {
        default: -1,
        noDesc: true,
      },
      SPIDER: {
        default: -1,
        noDesc: true,
      },
      SQUID: {
        default: -1,
        noDesc: true,
      },
      STRAY: {
        default: -1,
        noDesc: true,
      },
      STRIDER: {
        default: -1,
        noDesc: true,
      },
      TADPOLE: {
        default: -1,
        noDesc: true,
      },
      TNT_MINECART: {
        default: -1,
        noDesc: true,
      },
      TRADER_LLAMA: {
        default: -1,
        noDesc: true,
      },
      TRIDENT: {
        default: -1,
        noDesc: true,
      },
      TROPICAL_FISH: {
        default: -1,
        noDesc: true,
      },
      TURTLE: {
        default: -1,
        noDesc: true,
      },
      VEX: {
        default: -1,
        noDesc: true,
      },
      VILLAGER: {
        default: -1,
        noDesc: true,
      },
      VINDICATOR: {
        default: -1,
        noDesc: true,
      },
      WANDERING_TRADER: {
        default: -1,
        noDesc: true,
      },
      WARDEN: {
        default: -1,
        noDesc: true,
      },
      WIND_CHARGE: {
        default: -1,
        noDesc: true,
      },
      WITCH: {
        default: -1,
        noDesc: true,
      },
      WITHER: {
        default: -1,
        noDesc: true,
      },
      WITHER_SKELETON: {
        default: -1,
        noDesc: true,
      },
      WITHER_SKULL: {
        default: -1,
        noDesc: true,
      },
      WOLF: {
        default: -1,
        noDesc: true,
      },
      ZOGLIN: {
        default: -1,
        noDesc: true,
      },
      ZOMBIE: {
        default: -1,
        noDesc: true,
      },
      ZOMBIE_HORSE: {
        default: -1,
        noDesc: true,
      },
      ZOMBIE_VILLAGER: {
        default: -1,
        noDesc: true,
      },
      ZOMBIFIED_PIGLIN: {
        default: -1,
        noDesc: true,
      },
      FISHING_BOBBER: {
        default: -1,
        noDesc: true,
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
    "smooth-teleport": {
      default: false,
    },
    "max-item-stack-count": {
      "max-dropped-items-stack-count": {
        default: 0,
      },
      "max-container-destroy-count": {
        default: 0,
      },
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
    },
    player: {
      "disable-moved-wrongly-threshold": {
        default: false,
      },
      "max-use-item-distance": {
        default: 1.000_000_1,
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
    },
    "chat-message-signature": {
      default: true,
    },
  },
  misc: {
    message: {
      "unknown-command": {
        default: "<red><lang:command.unknown.command><newline><detail>",
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
      default: true,
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
    "hidden-item-components": {
      default: "[]",
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
      "cache-player-profile-result": {
        default: true,
      },
      "cache-player-profile-result-timeout": {
        default: 1440,
      },
    },
  },
} as const satisfies ConfigRoot
export default config
