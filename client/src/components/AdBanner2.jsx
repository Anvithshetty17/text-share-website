// File: src/components/AdBanner2.jsx
import { useEffect } from "react";

const AdBanner2 = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "//pl27272412.profitableratecpm.com/8f58dab3f4e4906c6b12b33ae8e7a3cb/invoke.js";

    const existingScript = document.querySelector(`script[src="${script.src}"]`);
    if (!existingScript) {
      document.getElementById("ad-container-2")?.appendChild(script);
    }
  }, []);

  return (
    <div
      id="ad-container-2"
      style={{
        width: "100%",
        margin: "20px auto",
        textAlign: "center",
        minHeight: "100px",
      }}
    >
      <div id="container-8f58dab3f4e4906c6b12b33ae8e7a3cb"></div>
    </div>
  );
};

export default AdBanner2;
