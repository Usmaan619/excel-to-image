// export async function createImageFromText(
//   text: string,
//   rowNumber: number
// ): Promise<string> {
//   return new Promise((resolve) => {
//     const canvas = document.createElement("canvas");
//     canvas.width = 760;
//     canvas.height = 1100;

//     const ctx = canvas.getContext("2d")!;

//     // White background
//     ctx.fillStyle = "#ffffff";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // Text settings - larger font like in image
//     ctx.font = "30px sans-serif";
//     ctx.fillStyle = "#000000";
//     ctx.textAlign = "left";

//     const lineHeight = 45; // Tight line spacing
//     const leftMargin = 90; // Similar to image
//     const topMargin = 200; // Start from top similar to image
//     const maxWidth = canvas.width - 180; // Similar margins on both sides

//     // Split text by double spaces
//     const cellValues = text.split("  ").filter((val) => val.trim() !== "");
//     const lines: string[] = [];
//     let currentLine = "";

//     // Word wrapping
//     cellValues.forEach((cellValue) => {
//       const testLine = currentLine + (currentLine ? "  " : "") + cellValue;
//       const metrics = ctx.measureText(testLine);

//       if (metrics.width > maxWidth && currentLine !== "") {
//         lines.push(currentLine.trim());
//         currentLine = cellValue;
//       } else {
//         currentLine = testLine;
//       }
//     });

//     if (currentLine.trim() !== "") {
//       lines.push(currentLine.trim());
//     }

//     // Draw text
//     let yPosition = topMargin;
//     lines.forEach((line) => {
//       ctx.fillText(line, leftMargin, yPosition);
//       yPosition += lineHeight;
//     });

//     resolve(canvas.toDataURL("image/png"));
//   });
// }
export async function createImageFromText(
  text: string,
  rowNumber: number
): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");

    // Dimensions
    canvas.width = 1000;
    canvas.height = 1500; // थोड़ा height भी बढ़ाया

    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Bigger font
    ctx.font = "38px sans-serif";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";

    // 🔥 Increased spacing
    const lineHeight = 65; // पहले 60 था
    const leftMargin = 110; // पहले 100 था
    const topMargin = 230; // पहले 220 था
    const maxWidth = canvas.width - 260; // left-right दोनों में ज्यादा spacing

    // Word wrapping
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine + (currentLine ? "  " : "") + word;
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && currentLine !== "") {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine.trim() !== "") {
      lines.push(currentLine);
    }

    // Draw text lines
    let yPosition = topMargin;
    lines.forEach((line) => {
      ctx.fillText(line, leftMargin, yPosition);
      yPosition += lineHeight;
    });

    resolve(canvas.toDataURL("image/png"));
  });
}
