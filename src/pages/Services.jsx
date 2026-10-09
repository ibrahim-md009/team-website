import { Link } from "react-router-dom";
import { useApp } from "../context.jsx";
import { Arrow, CtaBand, PageHead, serviceIcons } from "../components/ui.jsx";

export default function Services() {
  const { t, L, D } = useApp();
  return (
    <>
      <PageHead title={t("s_page_t")} sub={t("s_page_p")} />
      {D.services.map((s, i) => {
        const ex = s.examples.map(sl => D.projects.find(p => p.slug === sl)).filter(Boolean);
        return (
          <section key={s.id} className={"sec srow " + (i % 2 ? "band band-a" : "")} id={s.id} style={{ "--ac": s.accent }}>
            <div className="wrap srow-in">
              <div className="srow-txt rv">
                <span className="sicon">{serviceIcons[s.id]}</span>
                <h2>{L(s.name)}</h2>
                <p className="lead">{L(s.desc)}</p>
                <h3 className="mini">{t("s_includes")}</h3>
                <ul className="ticks">{L(s.points).map(x => <li key={x}>{x}</li>)}</ul>
                <Link className="btn btn-fill" to={"/contact?service=" + s.id}>{t("s_ask")}<Arrow /></Link>
              </div>
              <div className="srow-vis rv" style={{ "--d": ".1s" }}>
                <div className="svis reveal-img"><i /><i /><i />{serviceIcons[s.id]}</div>
                {ex.length > 0 && (
                  <>
                    <h3 className="mini">{t("s_examples")}</h3>
                    <div className="exlist">
                      {ex.map(p => (
                        <Link key={p.slug} className="ex" style={{ "--ac": p.accent }} to={"/projects/" + p.slug}>
                          <span className="dot" />{L(p.name)}<Arrow />
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        );
      })}
      <CtaBand title={t("home_cta_t")} text={t("home_cta_p")} />
    </>
  );
}
