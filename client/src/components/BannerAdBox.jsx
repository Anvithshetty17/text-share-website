import { useEffect } from "react";

const BannerAdBox = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "//pl27271244.profitableratecpm.com/a788aec201f9275b949e28f6a1f6c00b/invoke.js";

    const existing = document.querySelector(`script[src="${script.src}"]`);
    if (!existing) {
      document.getElementById("banner-ad-wrapper")?.appendChild(script);
    }
  }, []);

  return (
    <div
      id="banner-ad-wrapper"
      style={{
        width: "300px", // Adjust to match the banner size you've chosen
        height: "250px",
        margin: "20px auto",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        overflow: "hidden",
      }}
    >
      <div id="container-a788aec201f9275b949e28f6a1f6c00b"></div>
    </div>
  );
};

export default BannerAdBox;
