# How to Setup Sentry with Leaf

[Sentry](https://sentry.io/) is a powerful service for real-time error tracking and performance monitoring. Integrating it with your Leaf server allows you to capture errors and exceptions automatically, making it much easier to diagnose and fix problems that occur on your server.

This guide explains how to configure Leaf to send error reports to your Sentry project.

## Prerequisites

1.  **Sentry Account:** You need an account on [sentry.io](https://sentry.io/). They offer free tiers suitable for many servers.
2.  **Sentry Project:** Create a new project within your Sentry organization.
    - When asked for the platform, choose **Java**. If Java isn't immediately visible, you might select "Other" or search for it. The specific platform choice mainly affects initial setup instructions on Sentry's side, but Leaf handles the integration itself.
3.  **DSN (Data Source Name):** Once your project is created, navigate to its settings. Find the "Client Keys (DSN)" section. Copy the DSN string – it looks like a URL (e.g., `https://xxxxxxxxxxxxxxxxxxxxxxxx@o######.ingest.sentry.io/#######`).

## Configuration Steps

1.  **Locate Leaf Configuration:** Open your main Leaf server configuration file. This is typically `leaf-global.yml` located in your server's root directory or a `config` subfolder.

2.  **Find the Sentry Section:** Inside the configuration file, find the `sentry:` section. It will look similar to this by default:

    ```yaml
    sentry:
        # Sentry DSN for improved error logging, leave blank to disable,
        # Obtain from https://sentry.io/
        dsn: ""
        # Logs with a level higher than or equal to this level will be recorded.
        log-level: WARN
        # Only log with a Throwable will be recorded after enabling this.
        only-log-thrown: true
    ```

3.  **Configure the Settings:**
    - **`dsn`:**
        - Replace the empty single quotes (`''`) with the DSN you copied from your Sentry project settings. Make sure it's enclosed in single quotes.
        - **Example:** `dsn: 'https://xxxxxxxxxxxxxxxxxxxxxxxx@o######.ingest.sentry.io/#######'`
        - _If you leave this blank, Sentry integration will be disabled._

    - **`log-level`:**
        - This determines the minimum severity level of log messages that Leaf will send to Sentry. Common levels include `ERROR`, `WARN`, `INFO`, `DEBUG`.
        - The default `WARN` means only messages logged as warnings or errors (which typically include exceptions) will be sent.
        - You might set it to `ERROR` if you only want critical errors. Setting it lower (like `INFO`) can send a lot more data and might not be desirable unless you're actively debugging.
        - **Recommendation:** Start with `WARN` (the default).

    - **`only-log-thrown`:**
        - If set to `true` (the default), Leaf will _only_ send log messages to Sentry if they explicitly include a Java `Throwable` (like an exception or error with a stack trace). This is highly recommended as it focuses Sentry on actual code errors.
        - If set to `false`, _any_ log message meeting the `log-level` threshold will be sent, even if it's just informational text without an error. This can create a lot of noise in Sentry.
        - **Recommendation:** Keep this as `true` (the default).

4.  **Save and Restart:**
    - Save the changes to your configuration file.
    - Restart your Leaf server completely for the new settings to take effect.

## Troubleshooting

- **Errors Not Appearing:**
    - Double-check the `dsn` is copied correctly and enclosed in single quotes in the YAML file.
    - Ensure your `log-level` isn't set too high (e.g., if set to `ERROR`, warnings won't be sent).
    - Verify `only-log-thrown` is appropriate for the errors you expect to see.
    - Make sure your server was fully restarted after changing the config.
    - Check if your server's firewall might be blocking outgoing connections to `ingest.sentry.io` on port 443 (HTTPS).
- **Too Many Issues:**
    - Increase the `log-level` (e.g., from `WARN` to `ERROR`).
    - Ensure `only-log-thrown` is set to `true`.
