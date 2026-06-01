interface SectionHeadProps {
  eyebrow: string
  title: string
  sub: string
}
const SectionHead = ({ eyebrow, title, sub }: SectionHeadProps) => (
  <div className="mb-10 flex items-end justify-between gap-8 max-md:flex-col max-md:items-start">
    <div>
      <span className="lang-zh:normal-case lang-zh:tracking-normal lang-zh:text-[13px] text-xs font-medium tracking-[0.08em] text-(--fg-muted) uppercase">
        {eyebrow}
      </span>
      <h2 className="lang-en:leading-[1.2] lang-en:tracking-[-0.018em] lang-de:leading-[1.2] lang-de:tracking-[-0.018em] lang-zh:leading-[1.4] text-fd-secondary-foreground mt-3 max-w-160 text-[clamp(28px,3vw,36px)] font-semibold">
        {title}
      </h2>
    </div>
    <p className="max-w-95 text-[15px] text-(--fg-muted)">{sub}</p>
  </div>
)

export default SectionHead
