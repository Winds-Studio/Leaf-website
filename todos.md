## Writing standard for Chinese: (WIP & Outdated)

在所有语言下, 都需使用英文标点(半角). 用逗号或者句号分隔一句话的时候需要加上空格. 使用括号时需要在两边加上空格, 除非括号后面是标点

If `true` 或者 If < `0` 这类格式的翻译, 因翻译成 "如果设为 `true`" 或 "如果设为 < `0`"

中文中的英语单词应该用空格隔开，如 "使用 Java 默认的逻辑"

指代单个config / setting / option 的, 应翻译成 配置项

(This part should be included in CONTRIBUTION.md)

## Dev note for Config section

The majority of content are same across Minecraft versions and language versions. The same config option has the same description unless the description needs to change to adapt to the internal implementation changes of the feature. Using diff tool can easily see the difference between versions. These practices aim to keep a complete and accurate description for the config section, minimal changes across Minecraft versions and language versions, and try to keep lower maintenance costs as well.

### Sync

When new config options are added, or some description is changed, sync changes to other language versions as well (one exception is, minor grammar improvement for example, no need to sync, up to you based on the real situation). Thus to avoid spending much time to proofread, review, and sync many changes at a time.

### Update

When updating to a higher Minecraft version, copy docs of the last version, add descriptions for new configs, or make necessary changes (said above, adapt to impl change), and keep other config descriptions consistent.

### Misc

If you don't translate the config section when you submit a new language version to Leaf docs, don't copy and upload the exact same version or English version, instead, just link the reference of the EN version to it.
