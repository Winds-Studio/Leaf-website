# Leaf API

## API
::: code-group
```kotlin [build.gradle.kts]
repositories {
  maven {
    url = uri("https://maven.nostal.ink/repository/maven-snapshots/")
  }
}

dependencies {
    compileOnly("cn.dreeam.leaf:leaf-api:1.21.5-R0.1-SNAPSHOT")
}

java {
  toolchain.languageVersion.set(JavaLanguageVersion.of(21))
}
```

```xml [pom.xml]
<repository>
    <id>leafmc</id>
    <url>https://maven.nostal.ink/repository/maven-snapshots/</url>
</repository>

<dependency>
    <groupId>cn.dreeam.leaf</groupId>
    <artifactId>leaf-api</artifactId>
    <version>1.21.5-R0.1-SNAPSHOT</version>
    <scope>provided</scope>
</dependency>
```
:::

## Dev Bundle
Dev bundle is a tool provided by paperweight, which can easily access Minecraft NMS code during plugin development,
See how to setup it and more details in [paperweight-userdev](https://docs.papermc.io/paper/dev/userdev/).

To be able to use the dev bundle provided by Leaf, you need to make following changes to the dependency that provides in the tutorial above.
::: code-group
```kotlin [build.gradle.kts]
repositories {
  maven {
    url = uri("https://maven.nostal.ink/repository/maven-snapshots/")
  }
}

dependencies {
    paperweight.paperDevBundle("1.21.5-R0.1-SNAPSHOT") // [!code --]
    paperweight.devBundle("cn.dreeam.leaf", "1.21.5-R0.1-SNAPSHOT") // [!code ++]
}
```
:::
