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
Dev bundle, paperweight tarafından sağlanan bir araçtır ve eklenti geliştirme sırasında Minecraft NMS koduna kolayca erişmenizi sağlar. Kurulumu ve daha fazla detay için [paperweight-userdev](https://docs.papermc.io/paper/dev/userdev/) adresine bakın.

Leaf tarafından sağlanan dev bundle'ı kullanabilmek için, yukarıdaki öğreticide belirtilen bağımlılıkta aşağıdaki değişiklikleri yapmanız gerekir.
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