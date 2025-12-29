# Want to Go Deeper?

For the format of `dab.blacklisted-entities`, it accepts all valid format of a YAML list.

If you only need to add one entity into blacklist, these formats below are allowed to use:

```yaml
dab:
    blacklisted-entities: [villager]
```

or

```yaml
dab:
    blacklisted-entities:
        - villager
```

And if you need to add multiple entities into blacklist, these formats below are allowed to use:

```yaml
dab:
    blacklisted-entities: [villager, zombified_piglin]
```

or

```yaml
dab:
    blacklisted-entities:
        - villager
        - zombified_piglin
```

If you are not sure, use [YAML Checker](https://yamlchecker.org/), or any online YAML syntax validator to check your config.
