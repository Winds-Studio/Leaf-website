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

Dev bundle is a tool provided by paperweight, which can easily access Minecraft NMS code during plugin development,
See how to setup it and more details in [paperweight-userdev](https://docs.papermc.io/paper/dev/userdev/).

To be able to use the dev bundle provided by Leaf, you need to make following changes to the dependency that provides in the tutorial above.
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
