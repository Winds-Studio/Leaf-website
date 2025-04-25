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
Dev bundle это инструмент от paperweight, который позволяет легко получить доступ к NMS-коду Minecraft при разработке плагинов. Смотрите, как настроить его и другие подробности в [paperweight-userdev](https://docs.papermc.io/paper/dev/userdev/).

Чтобы использовать dev bundle, предоставленный Leaf, нужно внести следующие изменения в зависимость, указанную в приведённом выше руководстве.
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
