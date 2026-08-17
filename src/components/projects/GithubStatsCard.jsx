import React, { useState } from 'react';

const GITHUB_USERNAME = 'LucasFelip';
const STATS_URL = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&hide_border=true&bg_color=00000000&title_color=5C7237&text_color=A6A6A6&icon_color=5C7237&hide_title=true`;

const GithubStatsCard = () => {
  const [broken, setBroken] = useState(false);
  if (broken) return null;

  return (
    <div className="dashboard-card max-w-md mx-auto mt-6 flex justify-center">
      <img
        src={STATS_URL}
        alt="Estatísticas do GitHub de Lucas Ferreira"
        className="w-full"
        loading="lazy"
        onError={() => setBroken(true)}
      />
    </div>
  );
};

export default GithubStatsCard;
