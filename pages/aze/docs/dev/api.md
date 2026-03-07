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

Dev bundle, paperweight tərəfindən təmin edilən bir alətdir və plugin inkişafı zamanı Minecraft NMS koduna asanlıqla çıxışınızı təmin edir. Qurulumu və daha çox detallar üçün [paperweight-userdev](https://docs.papermc.io/paper/dev/userdev/) ünvanına baxın.

Leaf tərəfindən təmin edilən dev bundle'ı istifadə edə bilmək üçün, yuxarıdakı təlimatda göstərilən asılılıqda aşağıdakı dəyişiklikləri etməlisiniz.

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
