import { useState } from "react";
import { useApp } from "../context.jsx";
import { CtaBand, PageHead, ProjectCard } from "../components/ui.jsx";

export default function Projects() {
  const { t, D } = useApp();
  const [filter, setFilter] = useState("all");
  const chips = [["all", "f_all"], ["web", "f_web"], ["system", "f_sys"]];
  return (
    <>
      <PageHead title={t("p_page_t")} sub={t("p_page_p")} />
      <section className="sec">
        <div className="wrap">
          <div className="filters rv" role="group">
            {chips.map(([k, label]) => (
              <button key={k} className={"chipf" + (filter === k ? " on" : "")} onClick={() => setFilter(k)}>{t(label)}</button>
            ))}
          </div>
          <div className="grid2" id="plist">
            {D.projects.map((p, i) => (
              <div key={p.slug} className="pwrap" hidden={!(filter === "all" || p.kind === filter)}>
                <ProjectCard p={p} i={i} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title={t("home_cta_t")} text={t("home_cta_p")} />
    </>
  );
}
