# 如何在 Leaf 中设置 Sentry

[Sentry](https://sentry.io/) 是一项功能强大的实时错误追踪与性能监控服务。将它集成进你的 Leaf 服务器后，可以自动捕获错误与异常，极大地方便你定位与修复服务端问题。

本指南将介绍如何配置 Leaf，将错误上报到你的 Sentry 项目。

## 前置条件

1. **Sentry 账户：** 你需要在 [sentry.io](https://sentry.io/) 上注册账户。他们提供适用于许多服务器的免费套餐。
2. **Sentry 项目：** 在你的 Sentry 组织下新建一个项目。

   * 当被询问平台时，选择 **Java**。如果没有立即看到 Java，可以选“Other（其它）”或搜索。平台选择主要会影响 Sentry 端给出的初始化指引；实际集成由 Leaf 自身完成。
3. **DSN（Data Source Name）：** 创建项目后，进入项目设置，找到“Client Keys (DSN)”部分。复制 DSN 字符串——它看起来像一个 URL（例如：`https://xxxxxxxxxxxxxxxxxxxxxxxx@o######.ingest.sentry.io/#######`）。

## 配置步骤

1. **找到 Leaf 配置：** 打开你的 Leaf 服务器主配置文件。通常是位于服务器根目录或 `config` 子目录下的 `leaf-global.yml`。

2. **定位 Sentry 配置段：** 在配置文件里找到 `sentry:` 段落。默认大致如下：

   ```yaml
    sentry:
        # Sentry DSN (出现严重错误时将发送至配置的 Sentry DSN 地址) (留空关闭)
        dsn: ''
        # 大于等于该等级的日志会被记录。
        log-level: WARN
        # 是否仅记录带有 Throwable 的日志。
        only-log-thrown: true
   ```

3. **设置各项参数：**

   * **`dsn`：**

     * 将空的单引号（`''`）替换为你在 Sentry 项目设置中复制的 DSN，确保使用单引号包裹。
     * **示例：** `dsn: 'https://xxxxxxxxxxxxxxxxxxxxxxxx@o######.ingest.sentry.io/#######'`
     * *若留空，则不会启用 Sentry 集成。*

   * **`log-level`：**

     * 决定 Leaf 发送到 Sentry 的最小日志严重等级。常见等级包括 `ERROR`、`WARN`、`INFO`、`DEBUG`。
     * 默认的 `WARN` 表示仅会发送警告或错误级别的消息（通常包含异常）。
     * 只想记录严重错误时可设置为 `ERROR`。若设置得更低（如 `INFO`），上报量会显著增加，除非在调试阶段，一般不建议。
     * **推荐：** 先使用默认的 `WARN`。

   * **`only-log-thrown`：**

     * 若设为 `true`（默认），Leaf *仅在*日志条目显式包含 Java 的 `Throwable`（如带堆栈的异常或错误）时，才会将其发送到 Sentry。强烈推荐此设置，以便将 Sentry 聚焦在真实代码错误上。
     * 若设为 `false`，*只要*达到 `log-level` 阈值的日志都会发送，即便只是没有错误的普通文本，也会造成 Sentry 中的噪声。
     * **推荐：** 保持默认的 `true`。

4. **保存与重启：**

   * 保存配置文件。
   * 完整重启你的 Leaf 服务器，使新设置生效。

## 故障排查

* **看不到错误上报：**

  * 再次确认 `dsn` 是否正确复制，并在 YAML 中用单引号包裹。
  * 确认 `log-level` 未设置得过高（例如设为 `ERROR` 时，`WARN` 级别不会上报）。
  * 核对 `only-log-thrown` 是否符合你期望看到的错误类型。
  * 修改配置后，确保已完全重启服务器。
  * 检查服务器的防火墙是否阻止了到 `ingest.sentry.io` 的 443 端口（HTTPS）出站连接。

* **问题太多：**

  * 提高 `log-level`（例如从 `WARN` 提升到 `ERROR`）。
  * 确保 `only-log-thrown` 设置为 `true`。
