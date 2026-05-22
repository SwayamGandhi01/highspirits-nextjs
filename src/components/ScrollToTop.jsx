import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ScrollToTop() {
  const router = useRouter();

  useEffect(() => {
    const handle = () => window.scrollTo({ top: 0, behavior: "smooth" });
    handle();
  }, [router.asPath]);

  return null;
}
