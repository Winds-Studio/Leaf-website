# Du möchtest tiefer eintauchen?

Die Option `dab.blacklisted-entities` akzeptiert alle gültigen YAML Listenformate.

Wenn nur ein Entity zur Blacklist hinzugefügt werden soll, sind diese Formate erlaubt:

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

Wenn mehrere Entities zur Blacklist hinzugefügt werden sollen, sind diese Formate erlaubt:

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

Wenn du dir nicht sicher bist, nutze den [YAML Checker](https://yamlchecker.org/) oder andere Online-Tools, um die Syntax zu überprüfen.
