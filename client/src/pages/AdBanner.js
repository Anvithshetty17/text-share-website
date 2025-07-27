import { useEffect } from "react";

const AdBanner = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "//pl27271244.profitableratecpm.com/a788aec201f9275b949e28f6a1f6c00b/invoke.js";
    document.getElementById("ad-container")?.appendChild(script);
  }, []);

  return (
    <div
      id="ad-container"
      style={{
        width: "100%",
        margin: "20px auto",
        textAlign: "center",
        minHeight: "100px", // Adjust height as needed
      }}
    >
      <div id="container-a788aec201f9275b949e28f6a1f6c00b"></div>
    </div>
  );
};

export default AdBanner;
