/* A very small client-side router (history API) — no extra dependency.
   Routes: /  /projects  /projects/:slug  /services  /about  /contact */
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const RouterCtx = createContext(null);

const read = key => ({
  path: location.pathname.replace(/\/+$/, "") || "/",
  search: location.search,
  hash: location.hash,
  key
});

export function Router({ children }) {
  const [loc, setLoc] = useState(() => read(0));

  const navigate = useCallback((to, opts = {}) => {
    const u = new URL(to, location.origin);
    const next = u.pathname + u.search + u.hash;
    if (opts.replace) history.replaceState(null, "", next);
    else history.pushState(null, "", next);
    setLoc(prev => read(prev.key + 1));
  }, []);

  useEffect(() => {
    const onPop = () => setLoc(prev => read(prev.key + 1));
    addEventListener("popstate", onPop);
    return () => removeEventListener("popstate", onPop);
  }, []);

  return <RouterCtx.Provider value={{ loc, navigate }}>{children}</RouterCtx.Provider>;
}

export const useRouter = () => useContext(RouterCtx);

export function Link({ to, onClick, children, ...rest }) {
  const { navigate } = useRouter();
  const handle = e => {
    if (onClick) onClick(e);
    if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || rest.target) return;
    e.preventDefault();
    navigate(to);
  };
  return <a href={to} {...rest} onClick={handle}>{children}</a>;
}
