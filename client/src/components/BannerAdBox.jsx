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
    
     <>
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
       <a
  href="https://www.profitableratecpm.com/rktbxput?key=e0ee1cf62fb360581b0ba0ae42dcf0e0"
  target="_blank"
  rel="noopener noreferrer"
>
  <button
    style={{
      padding: "10px 20px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    }}
  >
    Visit Sponsored Page
  </button>
</a>

     </>
      
  );
};

export default BannerAdBox;
