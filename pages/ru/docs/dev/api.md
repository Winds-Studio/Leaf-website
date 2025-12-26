# Leaf API

## API
::: code-group
```kotlin [build.gradle.kts]
repositories {
  maven("https://maven.nostal.ink/repository/maven-snapshots/")
}

dependencies {
    compileOnly("cn.dreeam.leaf:leaf-api:1.21.5-R0.1-SNAPSHOT")
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
      <url>https://maven.nostal.ink/repository/maven-snapshots/</url>
    </repository>
  </repositories>

  <dependencies>
    <dependency>
      <groupId>cn.dreeam.leaf</groupId>
      <artifactId>leaf-api</artifactId>
      <version>1.21.5-R0.1-SNAPSHOT</version>
      <scope>provided</scope>
    </dependency>
  </dependencies>
</project>
```
:::

## Dev Bundle (Пакет для разработки)
Dev Bundle — это инструмент, предоставляемый Paperweight, который позволяет легко получить доступ к NMS-коду Minecraft во время разработки плагинов.
Подробную инструкцию по настройке и дополнительную информацию можно найти на [paperweight-userdev](https://docs.papermc.io/paper/dev/userdev/).

Для использования Dev Bundle от Leaf необходимо внести следующие изменения в зависимости, указанную в руководстве выше:
::: code-group
```kotlin [build.gradle.kts]
repositories {
  maven("https://maven.nostal.ink/repository/maven-snapshots/")
  maven("https://repo.bsdevelopment.org/releases/")
}

dependencies {
    paperweight.paperDevBundle("1.21.5-R0.1-SNAPSHOT") // [!code --]
    paperweight.devBundle("cn.dreeam.leaf", "1.21.5-R0.1-SNAPSHOT") // [!code ++]
}
```
:::
