# Contributing to Leaf Website

Thank you for considering contributing to the Leaf Website! Your help improves our documentation, features, and overall project quality.

---

## 📦 Quick Start

### Prerequisites

- **Node.js** version 18.20 or newer.
- **pnpm** package manager ([Install instructions](https://pnpm.io/installation)).

### Setup

1. **Fork and Clone Repository**
    ```bash
    git clone https://github.com/YOUR_USERNAME/Leaf-website.git
    cd Leaf-website
    ```
2. **Install Dependencies**
    ```bash
    pnpm install
    ```
3. **Run Local Development Server**
    ```bash
    pnpm dev
    ```

---

## 💡 Ways to Contribute

- **Documentation**: Add, update, or translate documentation.
- **Bug Reports**: Submit issues with details and possible repro steps.
- **Feature Requests**: Suggest enhancements via GitHub Issues.
- **Code Improvements**: Performance, accessibility, or typo fixes are always welcome!
- **Review or Triage Issues**: Help maintainers by clarifying existing issues.

---

## ✍️ Documentation Writing Standards

To keep documentation consistent across all languages and sections:

- Use **English (half-width) punctuation in all languages**.
- Add **a space after commas or periods**.
- For parenthesis, use spaces outside unless followed by punctuation:
    - Yes: `（ foo ）`
    - No: `（foo）`
- For logic phrases like `If true` or `If < 0`, translate as:
    - `如果设为 \`true\``
    - `如果设为 < \`0\``
- Separate English words in Chinese text with spaces.
    - Example: `使用 Java 默认的逻辑`
- When referring to a single config/setting/option, use:
    - `配置项`
- Use headings, lists, and semantic Markdown structure for clarity.
- Add alt text to images and keep links descriptive.

---

## 📐 Code Style & Commit Guidelines

- Use **descriptive commit messages**:
    - Good: `Fix typos in Gale config documentation`
    - Bad: `Update docs`
- Reference issues or todos where relevant (e.g., `Fix #12`).
- Test your changes locally (`pnpm dev`).
- Keep pull requests focused—one topic per PR is best.
- Use [Conventional Commits](https://www.conventionalcommits.org/) style for code changes (optional, but preferred):
    - Example: `feat(config): add example for leaf flags`
- Run `pnpm build` to verify static build success, if relevant.
- For code: Prefer clean, readable, and well-commented JavaScript/TypeScript.

---

## 🔄 Pull Request Process

1. **Sync** your fork with the upstream repository regularly.
2. **Create a feature branch** for your changes.
3. **Push and open a Pull Request:**
    - Include a clear, descriptive summary of what you changed and why.
    - Reference related issues or todos if applicable.
4. **Address code review feedback** promptly.
5. **Keep PRs focused and minimal**; split larger changes into multiple PRs when possible.

---

## 🏷️ Resources

- [Leaf Website Documentation](https://www.leafmc.one/)
- [VitePress Guide](https://vitepress.dev/guide/getting-started/)
- [pnpm Docs](https://pnpm.io/motivation)
- [GitHub Markdown Guide](https://guides.github.com/features/mastering-markdown/)

---

## 🤔 FAQ

**Q: I want to help but am not sure where to start!**  
A: Check `todos.md` or open [issues](https://github.com/LeafMC/Leaf-website/issues) for beginner-friendly tasks.

**Q: Can I contribute translations?**  
A: Absolutely! Ensure that you follow the writing standard and keep structure consistent with the main docs.

**Q: Do I need to be an expert developer?**  
A: Not at all—improving docs, reporting issues, or fixing small errors are all valuable contributions.

---

## 🌱 Thank You!

Contributors like you make Leaf Website great. We appreciate your time, knowledge, and expertise!

---

For any further questions or support, feel free to open an issue or start a discussion.
