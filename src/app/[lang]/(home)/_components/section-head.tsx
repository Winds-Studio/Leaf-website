interface SectionHeadProps {
  index: string
  eyebrow: string
  title: string
  sub: string
}

export const Eyebrow = ({ index, children }: { index: string; children: string }) => (
  <span className="block font-mono text-[13px] text-(--fg-muted)">
    <span className="text-fd-primary dark:text-fd-accent-foreground">{`// ${index}`}</span>
    {` — ${children}`}
  </span>
)

const SectionHead = ({ index, eyebrow, title, sub }: SectionHeadProps) => (
  <div className="mb-10 flex items-end justify-between gap-8 max-md:flex-col max-md:items-start">
    <div>
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <h2 className="lang-en:leading-[1.2] lang-en:tracking-[-0.018em] lang-de:leading-[1.2] lang-de:tracking-[-0.018em] lang-zh:leading-[1.4] text-fd-secondary-foreground mt-3 max-w-160 text-[clamp(28px,3vw,36px)] font-semibold">
        {title}
      </h2>
    </div>
    <p className="max-w-95 text-[15px] text-(--fg-muted)">{sub}</p>
  </div>
)

export default SectionHead
