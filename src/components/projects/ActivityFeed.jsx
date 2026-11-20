import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitBranch, Tag, Radio } from 'lucide-react';
import { getRecentActivity } from '@/services/activityService';
import { useI18n } from '@/i18n';

const ICONS = { commit: GitCommit, release: Tag, newRepo: GitBranch, madePublic: Radio };

function timeAgo(isoDate, time) {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const days = Math.floor(diffMs / 86400000);
  if (days === 0) return time.today;
  if (days === 1) return time.yesterday;
  if (days < 30) return time.daysAgo(days);
  return time.monthsAgo(Math.floor(days / 30));
}

const ActivityFeed = () => {
  const { t } = useI18n();
  const [activity, setActivity] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getRecentActivity()
      .then(setActivity)
      .catch(() => setActivity([]))
      .finally(() => setReady(true));
  }, []);

  if (!ready || activity.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="dashboard-card max-w-2xl mx-auto mt-10"
    >
      <p className="font-mono text-xs text-muted-foreground mb-4">$ git log --all --source --oneline -{activity.length}</p>
      <ul className="space-y-3">
        {activity.map((item) => {
          const Icon = ICONS[item.kind] || GitCommit;
          const label = item.kind === 'commit' && item.count > 1 ? t.activity.commits(item.count) : t.activity[item.kind];
          return (
            <li key={item.id} className="flex items-start gap-3 text-sm">
              <Icon className="w-4 h-4 mt-0.5 text-primary shrink-0" />
              <span className="text-foreground/80">
                <span className="text-muted-foreground">{label}</span>{' '}
                <span className="font-mono text-foreground">{item.repo}</span>
                {item.detail && <span className="text-muted-foreground"> — {item.detail}</span>}
              </span>
              <span className="ml-auto font-mono text-[0.7rem] text-muted-foreground/70 shrink-0">{timeAgo(item.createdAt, t.time)}</span>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default ActivityFeed;
