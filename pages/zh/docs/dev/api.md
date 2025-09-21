# Leaf API

## API

::: code-group

```kotlin [build.gradle.kts]
repositories {
  maven("https://maven.leafmc.one/snapshots/")
}

dependencies {
    compileOnly("cn.dreeam.leaf:leaf-api:1.21.8-R0.1-SNAPSHOT")
}

java {
  toolchain.languageVersion.set(JavaLanguageVersion.of(21))
}
```

```xml [pom.xml]
<project>
  <repositories>
    <repository>
      <id>leafmc</id>
      <url>https://maven.leafmc.one/snapshots/</url>
    </repository>
  </repositories>

  <dependencies>
    <dependency>
      <groupId>cn.dreeam.leaf</groupId>
      <artifactId>leaf-api</artifactId>
      <version>1.21.8-R0.1-SNAPSHOT</version>
      <scope>provided</scope>
    </dependency>
  </dependencies>
</project>
```

:::

## Dev Bundle

Dev bundle 是由 paperweight 提供的工具，允许你在插件开发过程中可以轻松访问 Minecraft 的 NMS 代码。
有关如何设置及更多详细信息，请参阅 [paperweight-userdev](https://docs.papermc.io/paper/dev/userdev/).

为了能够使用 Leaf 提供的 dev bundle, 你需要将上述教程中所提供 dependency 做以下改动。
::: code-group

```kotlin [build.gradle.kts]
repositories {
  maven("https://maven.leafmc.one/snapshots/")
}

dependencies {
    paperweight.paperDevBundle("1.21.8-R0.1-SNAPSHOT") // [!code --]
    paperweight.devBundle("cn.dreeam.leaf", "1.21.8-R0.1-SNAPSHOT") // [!code ++]
}
```

:::
