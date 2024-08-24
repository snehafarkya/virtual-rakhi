import React, { useState, useRef, useEffect } from "react";

function VirtualRakhi() {
  const [text, setText] = useState("");
  const canvasRef = useRef(null);

  // Draw the image and text on the canvas
  const drawTextOnCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Load a local image
    const img = new Image();
    img.src = `${process.env.PUBLIC_URL}/rakhii.jpg`; // Replace with your image file name
    img.crossOrigin = "anonymous"; // Allow cross-origin if needed

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.font = "20px Arial";
      ctx.fillStyle = "yellow";
      ctx.textAlign = "left";

      // Draw the first part of the text
      ctx.fillText(
        "Distance may keep us apart,",
        canvas.width / 3,
        canvas.height / 6
      );
      ctx.fillText(
        "but it can't stop me celebrating you,",
        canvas.width / 3,
        canvas.height / 6 + 24
      );

      // Draw the user input text
      ctx.font = "bold 20px Arial"; // Set font to bold
      ctx.fillText(
        text.toUpperCase(),
        canvas.width / 3,
        canvas.height / 6 + 48
      );
    };
  };

  // UseEffect to draw the image initially
  useEffect(() => {
    drawTextOnCanvas();
  }, []);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = `${text}'s-virtual-rakhi.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleSaveName = () => {
    drawTextOnCanvas(); // Redraw the canvas with the new text
  };

  const handleCopyUrl = () => {
    const canvas = canvasRef.current;
    const imageUrl = canvas.toDataURL("image/png");

    // Copy the URL to the clipboard
    navigator.clipboard.writeText(imageUrl).then(() => {
      alert("Image URL copied to clipboard!");
    });
  };

  return (
    <div className="flex justify-center flex-col md:w-fit w-[360px] mx-auto md:items-center py-10 gap-6">
      <h1 className="text-3xl font-semibold">
        Send this virtual rakhi to your{" "}
        <span className="uppercase font-bold text-amber-900">siblings!</span>
      </h1>
      <div className="flex md:justify-center md:items-center gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-2 bg-transparent text-amber-950 rounded-lg font-semibold focus:outline-none border-2 placeholder:text-amber-950 border-amber-950"
          placeholder="Write your sibling's name"
        />
        <button
          onClick={handleSaveName}
          className="bg-amber-950 border-2 border-amber-950 text-white p-2 rounded-md shadow-xl hover:bg-amber-900"
        >
          Print Name
        </button>
      </div>
      <canvas ref={canvasRef} width={500} height={500} className="rounded-xl" />
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={handleDownload}
          className="bg-amber-950 border-2 w-fit md:mx-auto border-amber-950 text-white p-2 rounded-md shadow-xl hover:bg-amber-900"
        >
          Download Image
        </button>
        <button
          onClick={handleCopyUrl}
          className=" border-2 underline w-fit md:mx-auto border-amber-950 text-amber-950 underline-offset-4 p-2 rounded-md shadow-xl hover:bg-amber-900 hover:text-white"
        >
          Copy Image URL
        </button>
      </div>
    </div>
  );
}

export default VirtualRakhi;
