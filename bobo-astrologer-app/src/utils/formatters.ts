export const formatDegree = (degree: number): string => {
  const deg = Math.floor(degree);
  const minDecimal = (degree - deg) * 60;
  const min = Math.floor(minDecimal);
  const sec = Math.floor((minDecimal - min) * 60);

  return `${deg}° ${min}' ${sec}"`;
};

export const formatDate = (year: number, month: number, day: number): string => {
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (hour: number, minute: number, second: number): string => {
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
};
