import { useEffect, useRef } from "react";

const BannerAdBox = () => {
  const adRef1 = useRef(null);
  const adRef2 = useRef(null);
  const adRef3 = useRef(null);

  useEffect(() => {
    [adRef1, adRef2, adRef3].forEach((ref, index) => {
      if (!ref.current) return;

      ref.current.innerHTML = "";

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

      ref.current.appendChild(script1);
      ref.current.appendChild(script2);
    });
  }, []);

  const adStyle = {
    width: "300px",
    height: "250px",
    margin: "20px auto",
    textAlign: "center",
    overflow: "hidden",
  };

  return (
    <>
      <div ref={adRef1} style={adStyle}></div>
      <div ref={adRef2} style={adStyle}></div>
      <div ref={adRef3} style={adStyle}></div>
    </>
  );
};

export default BannerAdBox;
