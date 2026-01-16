# 再深入一些？

关于 `dab.blacklisted-entities` 的格式说明，它支持所有合法的 YAML 列表格式。

如果你只需要向黑名单中添加一个实体类型，可以使用以下任意一种格式：

```yaml
dab:
    blacklisted-entities: [villager]
```

或者

```yaml
dab:
    blacklisted-entities:
        - villager
```

如果你需要向黑名单中添加多个实体类型，可以使用以下任意一种格式：

```yaml
dab:
    blacklisted-entities: [villager, zombified_piglin]
```

或者

```yaml
dab:
    blacklisted-entities:
        - villager
        - zombified_piglin
```

如果你不确定配置是否正确，可以使用 [YAML 在线校验器](https://www.bejson.com/validators/yaml_editor/)，或任何在线的 YAML 语法校验工具来检查你的配置文件。
