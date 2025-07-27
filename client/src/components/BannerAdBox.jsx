import { useEffect } from "react";

const BannerAdBox = () => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.type = "text/javascript";
    script1.innerHTML = `
      atOptions = {
        'key': '9bc28105adf40e37d2c54ae07abb78a4',
        'format': 'iframe',
        'height': 250,
        'width': 300,
        'params': {}
      };
    `;
    const script2 = document.createElement("script");
    script2.type = "text/javascript";
    script2.src = "//www.highperformanceformat.com/9bc28105adf40e37d2c54ae07abb78a4/invoke.js";
    script2.async = true;

    const container = document.getElementById("banner-iframe-wrapper");
    if (container) {
      container.appendChild(script1);
      container.appendChild(script2);
    }
  }, []);

  return (
    <div
      id="banner-iframe-wrapper"
      style={{
        width: "300px",
        height: "250px",
        margin: "20px auto",
        textAlign: "center",
        overflow: "hidden",
      }}
    ></div>
  );
};


export default BannerAdBox;
