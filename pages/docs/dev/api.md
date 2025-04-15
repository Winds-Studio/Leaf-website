# Leaf API

### Maven
```xml
<repository>
    <id>leafmc</id>
    <url>https://maven.nostal.ink/repository/maven-snapshots/</url>
</repository>
```
```xml
<dependency>
    <groupId>cn.dreeam.leaf</groupId>
    <artifactId>leaf-api</artifactId>
    <version>1.21.1-R0.1-SNAPSHOT</version>
    <scope>provided</scope>
</dependency>
```

### Gradle
```kotlin
repositories {
  maven {
    url = uri("https://maven.nostal.ink/repository/maven-snapshots/")
  }
}

dependencies {
    compileOnly("cn.dreeam.leaf:leaf-api:1.21.1-R0.1-SNAPSHOT")
}

java {
  toolchain.languageVersion.set(JavaLanguageVersion.of(21))
}
```
