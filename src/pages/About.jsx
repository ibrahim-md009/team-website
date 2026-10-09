import { useApp } from "../context.jsx";
import { CtaBand, PageHead } from "../components/ui.jsx";

export default function About() {
  const { t, L, D } = useApp();
  const dots = ["var(--sage)", "var(--blue)", "var(--taupe)"];
  return (
    <>
      <PageHead title={t("a_page_t")} sub={t("a_page_p")} />

      <section className="sec">
        <div className="wrap dgrid">
          <div className="rv"><h2>{t("a_story_t")}</h2></div>
          <div className="rv story" style={{ "--d": ".08s" }}>{t("a_story").map((x, i) => <p key={i}>{x}</p>)}</div>
        </div>
      </section>

      <section className="band band-sand">
        <div className="wrap">
          <h2 className="rv">{t("a_values_t")}</h2>
          <div className="grid3">
            {t("a_values").map((v, i) => (
              <div key={i} className="vcard rv" style={{ "--d": i * 0.07 + "s" }}>
                <span className="dot" style={{ background: dots[i] }} />
                <h3>{v[0]}</h3><p>{v[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap dgrid">
          <div className="rv">
            <h2>{t("a_skills_t")}</h2>
            <div className="tags">{D.services.map(s => <span key={s.id} className="tag" style={{ "--ac": s.accent }}><i className="dot" />{L(s.name)}</span>)}</div>
          </div>
          <div className="rv" style={{ "--d": ".08s" }}>
            <h2>{t("a_stack_t")}</h2>
            <div className="tags">{D.stack.map(x => <span key={x} className="tag tag-plain" dir="ltr">{x}</span>)}</div>
          </div>
        </div>
      </section>

      <CtaBand title={t("home_cta_t")} text={t("home_cta_p")} />
    </>
  );
}
