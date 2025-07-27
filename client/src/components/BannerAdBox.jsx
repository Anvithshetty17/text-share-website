import { useEffect, useRef } from "react";

const BannerAdBox = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Clear previous content (optional, useful on hot reload)
    adRef.current.innerHTML = "";

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

    adRef.current.appendChild(script1);
    adRef.current.appendChild(script2);
  }, []);

  return (
    <div
      ref={adRef}
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
