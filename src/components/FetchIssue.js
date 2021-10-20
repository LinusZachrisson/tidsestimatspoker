function FetchIssue(number) {
  // Hämtar issues som är färdigissade från TimeEstimated
  let contents = number.issue;

  const sum = contents.hours.reduce((a, b) => a + b, 0);
  const sumb = contents.actualTime.reduce((a, b) => a + b, 0);
  const avg = sum / contents.hours.length || 0;
  const avgRounded = Math.round(avg * 100) / 100;
  const sorted = contents.hours.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  const time = sum - sumb;

  return (
    <div>
      All votes:{" "}
      <ul>
        {sorted.map((vote) => (
          <li> {vote} h</li>
        ))}
      </ul>{" "}
      <br />
      Average: {avgRounded}
      <br />
      Median: {sorted[middle]}
      <br />
      Time difference: {time}
    </div>
  );
}

export default FetchIssue;
