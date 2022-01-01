export const getMinutes = (time: string) => {
  if (!time) {
    return 0;
  }

  const parts = time.split(" ");
  let totalMinutes = 0;

  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    if (parts[i + 1] === "month,") {
      totalMinutes += parseInt(part, 10) * 30.4368499 * 24 * 60;
      i += 1;
    } else if (part.endsWith("m")) {
      totalMinutes += parseInt(part.substring(0, part.length - 1), 10);
    } else if (part.endsWith("h")) {
      totalMinutes += 60 * parseInt(part.substring(0, part.length - 1), 10);
    } else if (part.endsWith("d")) {
      totalMinutes +=
        60 * 24 * parseInt(part.substring(0, part.length - 1), 10);
    }
  }
  return totalMinutes;
};

export const formatFloat = (time: number, decimals: number) => {
  return time
    .toFixed(decimals)
    .toString()
    .replace("/./g", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
