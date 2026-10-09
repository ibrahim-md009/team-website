import { Link, useParams } from "react-router-dom";
import { useApp } from "../context.jsx";
import { Arrow, CtaBand, PageHead, Preview } from "../components/ui.jsx";
import Carousel from "../components/Carousel.jsx";

export default function Project() {
  const { slug } = useParams();
  const { t, L, D } = useApp();
  const idx = D.projects.findIndex(p => p.slug === slug);
  if (idx < 0) return <PageHead title={t("nf_t")} sub={t("nf_p")} />;
  const p = D.projects[idx], nx = D.projects[(idx + 1) % D.projects.length];
  return (
    <>
      <header className="phead dhead" style={{ "--ac": p.accent }}>
        <div className="wrap">
          <Link className="back" to="/projects"><Arrow />{t("d_back")}</Link>
          <span className="badge badge-ac rv">{L(p.cat)}</span>
          <h1 className="rv" style={{ "--d": ".05s" }}>{L(p.name)}</h1>
          <p className="rv" style={{ "--d": ".1s" }}>{L(p.short)}</p>
          {p.link && (
            <a className="btn btn-fill dvisit rv" style={{ "--d": ".14s" }} href={p.link} target="_blank" rel="noopener noreferrer">{t("visit")}<Arrow /></a>
          )}
        </div>
      </header>

      <section className="sec dpre">
        <div className="wrap">
          {p.shots.length
            ? <div className="rv"><Carousel images={p.shots} alt={L(p.name)} /></div>
            : <div className="dpv rv reveal-img" style={{ "--ac": p.accent }}><Preview p={p} big /></div>}
        </div>
      </section>

      <section className="sec dtxt" style={{ "--ac": p.accent }}>
        <div className="wrap dgrid">
          <div className="rv"><h2>{t("d_overview")}</h2><p className="lead">{L(p.desc)}</p></div>
          <div className="rv" style={{ "--d": ".08s" }}>
            <h2>{t("d_features")}</h2>
            <ul className="ticks">{L(p.features).map(x => <li key={x}>{x}</li>)}</ul>
            {p.tech.length > 0 && (
              <>
                <h3 className="mini">{t("d_tech")}</h3>
                <div className="tags">{p.tech.map(x => <span key={x} className="tag" dir="ltr">{x}</span>)}</div>
              </>
            )}
          </div>
        </div>
      </section>

      {p.dashShots.length > 0 && (
        <section className="sec dash">
          <div className="wrap">
            <h2 className="rv">{t("d_dash")}</h2>
            <div className="rv" style={{ "--d": ".06s" }}><Carousel images={p.dashShots} alt={L(p.name) + " — " + t("d_dash")} /></div>
          </div>
        </section>
      )}

      <section className="band band-a" style={{ "--ac": p.accent }}>
        <div className="wrap ps">
          <div className="pbox rv"><span className="badge badge-ac">{t("d_problem")}</span><p>{L(p.problem)}</p></div>
          <div className="pbox pbox-s rv" style={{ "--d": ".08s" }}><span className="badge badge-ac">{t("d_solution")}</span><p>{L(p.solution)}</p></div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap next rv">
          <span>{t("d_next")}</span>
          <Link className="link big" to={"/projects/" + nx.slug}>{L(nx.name)}<Arrow /></Link>
        </div>
      </section>

      <CtaBand title={t("d_cta_t")} text={t("d_cta_p")} />
    </>
  );
}
