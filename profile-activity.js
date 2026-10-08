function getLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function normalizeDateKey(value) {
  if (!value) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : getLocalDateKey(date);
}

function recordDailyActivity(profile, now = new Date()) {
  const today = getLocalDateKey(now);
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  const lastActivityDate = normalizeDateKey(profile.lastActivityDate || profile.lastQuestDate);
  if (lastActivityDate === today) return;

  profile.streak = lastActivityDate === getLocalDateKey(yesterday)
    ? Number(profile.streak || 0) + 1
    : 1;
  profile.lastActivityDate = today;
}

export { recordDailyActivity };
