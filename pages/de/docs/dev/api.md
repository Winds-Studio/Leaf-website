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
Das Dev Bundle ist ein von paperweight bereitgestelltes Tool, mit dem du während der Plugin-Entwicklung einfach auf den Minecraft-NMS-Code zugreifen kannst.
Wie du es einrichtest und weitere Details findest du unter [paperweight-userdev](https://docs.papermc.io/paper/dev/userdev/).

Um das von Leaf bereitgestellte dev Bundle verwenden zu können, musst du die im obigen Tutorial angegebene Abhängigkeit wie folgt anpassen.
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
