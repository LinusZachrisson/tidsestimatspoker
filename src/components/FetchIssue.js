function FetchIssue(number) {
  // Hämtar issues som är färdigissade från TimeEstimated
  let contents = number.issue;

  const sum = contents.hours.reduce((a, b) => a + b, 0);
  const avg = sum / contents.hours.length || 0;
  const avgRounded = Math.round(avg * 100) / 100;
  const sorted = contents.hours.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

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
      
    </div>
  );
}

export default FetchIssue;
