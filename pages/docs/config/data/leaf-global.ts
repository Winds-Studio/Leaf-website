export default {

    "config-version": {
        default: "3.0"
    },

    "async": {
        "async-entity-tracker": {
            "enabled": {
                default: false,
                desc: "Make entity tracking asynchronously, can improve performance significantly, especially in" +
                    "some massive entities in small area situations.\n\n" +
                    "⚡ **Recommended value:** true"
            },
            "compat-mode": {
                default: false,
                desc: "Enable compat mode to be compatible with plugins like Citizens or NPC plugins that use real, and player-type entity.\n\n" +
                "If `true`, visibility issue that player-type NPCs may disappear sometimes can be fixed.\n\n" +
                "You should enable compat-mode to use async entity tracker feature ONLY IF you installed Citizens or any other kind of real entity NPC plugins.\n\n" +
                "But we still recommend to use packet-based / virtual entity NPC plugin to gain better performance, " +
                "e.g. [ZNPC Plus](https://github.com/Pyrbu/ZNPCsPlus), [Adyeshach](https://github.com/TabooLib/Adyeshach), " +
                "[Fancy NPC](https://modrinth.com/plugin/fancynpcs), or else, and then compat-mode can be disabled."
            },
            "max-threads": {
                default: 0,
                desc: `<p>Maximum number of threads for async entity tracker to use. If the value is set to 0, 
                it automatically uses 1/4 of the number of CPU cores and no less than 1.</p>
                <p>⚡ <b>Recommended value:</b> 1/2 of CPU cores</p>`
            },
            "keepalive": {
                default: 60,
                desc: `<p>Thread keepalive time, threads with no tasks will be terminated if they exceed the time.</p>
                <p>📏 <b>Unit:</b> seconds.</p>`
            }
        },
        "async-playerdata-save": {
            "enabled": {
                default: false,
                desc: `<p>Make PlayerData saving asynchronously.</p>
                <p>⚠️ <b>Experimental feature, may cause data lost in some circumstances!</b></p>`
            }
        },
        "async-pathfinding": {
            "enabled": {
                default: false,
                desc: `<p>Make mob pathfinding calculation asynchronously.</p>
                <p>⚡ <b>Recommended value:</b> <code>true</code></p>`
            },
            "max-threads": {
                default: 0,
                desc: `<p>Maximum number of threads for async entity pathfinding to use.</p>
                <p>If the value is set to 0, it automatically uses 1/4 of the number of CPU cores and no less than 1.</p>
                <p>⚡ <b>Recommended value:</b> 1/3 of CPU cores</p>`
            },
            "keepalive": {
                default: 60,
                desc: `Thread keepalive time, threads with no tasks will be terminated if they exceed the time. (Unit: seconds)`
            }
        },
        "async-mob-spawning": {
            "enabled": {
                default: true,
                desc: `<p>Whether asynchronous mob spawning should be enabled.
                On servers with many entities, this can improve performance by up to 15%. 
                You must have Paper's <code>per-player-mob-spawns</code> config set to <code>true</code> for this to work.
                One quick note: this does not actually spawn mobs async (that would be very unsafe). 
                This just offloads some expensive calculations that are required for mob spawning.</p>
                <p>⚡ <b>Recommended value:</b> <code>true</code></p>`
            }
        },
        "async-locator": {
            "enabled": {
                default: false,
                desc: `<p>Whether asynchronous locator should be enabled.
                This offloads structure locating to other threads.
                Currently available for:
                <ul>
                    <li>/locate command</li>
                    <li>Dolphin treasure finding</li>
                    <li>Eye of ender stronghold finding</li>
                </ul></p>
                <p>⚡ <b>Recommended value:</b> <code>true</code></p>`
            },
            "threads": {
                default: 0,
                desc: `<p>Maximum number of threads for async locator to use.
                If a value ≤ <code>0</code> is given, it automatically uses 1 thread.</p>
                <p>⚡ <b>Recommended value:</b> <code>1</code> or <code>2</code></p>`
            },
            "keepalive": {
                default: 60,
                desc: `<p>Thread keepalive time, threads with no tasks will be terminated if they exceed the time.</p>
                <p>📏 <b>Unit:</b> seconds.</p>`
            }
        }
    },

    "performance": {
        "use-virtual-thread-for-async-chat-executor": {
            default: true,
            desc: `<p>Whether to use the
            <a href="https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html">Virtual Thread</a>
            introduced in JDK 21 for Async Chat Executor.</p>
            <p>⚡ <b>Recommended value:</b> <code>true</code></p>`
        },
        "use-virtual-thread-for-async-scheduler": {
            default: true,
            desc: `<p>Whether to use the 
            <a href="https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html">Virtual Thread</a> 
            introduced in JDK 21 for CraftAsyncScheduler, which could improve 
            performance of plugin that uses async scheduler.</p>
            <p>⚡ <b>Recommended value:</b> <code>true</code></p>`
        },
        "create-snapshot-on-retrieving-blockstate": {
            default: true,
            desc: `<p>Whether to create the snapshot of TileEntity / BlockState when retrieving them.</p>
            <p>Some plugins may use <code>getHolder</code> to get the holder for an inventory, which involved getting the BlockState.
            For example, if there are tons of hoppers and plugins call this method when listening to some events 
            (e.g. hopper related events). It is very expensive to re-create BlockState and parse item stack in massive and frequent calls.
            See Paper's <a href="https://github.com/PaperMC/Paper-archive/blob/b48403bd69f534ffd43fe2afb4e8e1f1ffa95fe1/patches/server/0160-API-to-get-a-BlockState-without-a-snapshot.patch#L6">API-to-get-a-BlockState-without-a-snapshot.patch#L6</a>
            for more information.</p>
            <ul>
                <li>If <code>true</code>, it will create snapshot (copy) of BlockState everytime when the plugin call related methods.</li>
                <li>If <code>false</code>, it will get real BlockState itself when plugins call related methods, unless the plugin defines to use snapshot.</li>
            </ul>
            <p>⚡ <b>Recommended value:</b> <code>false</code> (Only if you encounter specific lag described above)</p>`
        },
        "inactive-goal-selector-throttle": {
            default: true,
            desc: `<p>Throttles the AI goal selector calculation in entity's inactive tick to every second. 
            This can improve performance by a few percent, but has minor gameplay implications.</p>
            <p>⚡ <b>Recommended value:</b> <code>true</code> for optimization, <code>false</code> for vanilla behavior.</p>`
        },
        "throttle-hopper-when-full": {
            "enabled": {
                default: false,
                desc: `<p>Whether to throttle attempts on moving items for hopper if the target container is full.</p>
                <p>⚡ <b>Recommended value:</b> <code>true</code> for optimization, <code>false</code> for vanilla behavior.</p>`
            },
            "skip-ticks": {
                default: 0,
                desc: `<p>How many ticks to wait before the next move item attempt when the hopper is throttled.
                If a value ≤ <code>0</code> is given, this throttling feature is disabled.</p>
                <p>⚡ <b>Recommended value:</b> <code>8</code> for optimization, <code>0</code> for vanilla behavior.</p>`
            }
        },
        "skip-map-item-data-updates-if-map-does-not-have-craftmaprenderer": {
            default: true,
            desc: `<p>Whether to skip map item data update if the map doesn't have a renderer.
            This can improve performance if using image map kind of plugins.</p>
            <p>⚡ <b>Recommended value:</b> <code>true</code> for optimization, <code>false</code> for vanilla behavior.</p>
            <p>⚠️ <b>This may cause vanilla map item data to stop be updated.</b></p>`
        },
        "skip-ai-for-non-aware-mob": {
            default: true,
            desc: `<p>Whether to skip AI ticks if the mob is inactive and unaware. 
            Unaware mobs are nerd and will not make actions themselves or when interacted with them.</p>
            <p>⚡ <b>Recommended value:</b> <code>true</code> for optimization, <code>false</code> for vanilla behavior.</p>`
        }
    }

}