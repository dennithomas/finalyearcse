import React from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line, AreaChart, Area
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export const LessonsPieChart = ({ completedLessons = [], totalLessons = 20, isUpdating = false }) => {
  const data = [
    { name: 'Completed', value: completedLessons.length },
    { name: 'Remaining', value: Math.max(0, totalLessons - completedLessons.length) },
  ];

  return (
    <div className={`chart-container position-relative ${isUpdating ? 'updating' : ''}`}>
      <div className="realtime-indicator" title="Real-time data from Firestore" />
      <h5 className="text-center mb-3">Lesson Progress</h5>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            animationBegin={0}
            animationDuration={1800}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} lessons`, name]}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 3px 10px rgba(0,0,0,0.1)' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const QuizScoresBarChart = ({ quizScores = [], isUpdating = false }) => {
  // Only keep entries where quiz.lesson is a valid string
  const safeScores = quizScores.filter(q => typeof q.lesson === 'string' && typeof q.score === 'number');

  // Transform quiz data for the chart
  const data = safeScores.map(quiz => {
    const parts = quiz.lesson.trim().split(' ');
    const name = parts.length > 0 ? parts[parts.length - 1] : quiz.lesson;
    return { name, score: quiz.score };
  });

  return (
    <div className={`chart-container position-relative ${isUpdating ? 'updating' : ''}`}>
      <div className="realtime-indicator" title="Real-time data from Firestore" />
      <h5 className="text-center mb-3">Quiz Performance</h5>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip
            formatter={(value) => [`${value}%`, 'Score']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 3px 10px rgba(0,0,0,0.1)' }}
          />
          <Legend />
          <Bar
            dataKey="score"
            fill="#8884d8"
            name="Score %"
            animationBegin={300}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const StreakLineChart = ({ streakData = [], activityLog = [], isUpdating = false }) => {
  const generateChartData = () => {
    if (activityLog.length > 0) {
      const today = new Date();
      const last7Days = [];

      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
        const formattedDate = date.toISOString().slice(0, 10);

        const dayActivities = activityLog.filter(activity => {
          let activityDate;
          if (activity.timestamp?.toDate) {
            activityDate = activity.timestamp.toDate();
          } else if (activity.date) {
            activityDate = new Date(activity.date);
          } else {
            return false;
          }
          return activityDate.toISOString().slice(0, 10) === formattedDate;
        });

        const minutes = dayActivities.reduce((sum, a) => sum + (a.minutes || a.duration || 0), 0);
        last7Days.push({ day: dayName, date: formattedDate, minutes });
      }

      return last7Days;
    }

    return streakData.length
      ? streakData
      : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((day, i) => ({
          day,
          minutes: Math.floor(Math.random() * 30) + 10
        }));
  };

  const data = generateChartData();

  return (
    <div className={`chart-container position-relative ${isUpdating ? 'updating' : ''}`}>
      <div className="realtime-indicator" title="Real-time data from Firestore" />
      <h5 className="text-center mb-3">Daily Activity</h5>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip
            formatter={(value) => [`${value} min`, 'Time Spent']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 3px 10px rgba(0,0,0,0.1)' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="minutes"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            strokeWidth={2}
            animationBegin={300}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const XpProgressChart = ({ xp = 0, xpHistory = [], isUpdating = false }) => {
  const xpPerLevel = 100;
  const calculatedLevel = Math.floor(xp / xpPerLevel) + 1;
  const currentLevelXp = xp % xpPerLevel;
  const progress = (currentLevelXp / xpPerLevel) * 100;

  const prepareXpHistoryData = () => {
    if (xpHistory.length > 0) {
      return xpHistory
        .slice()
        .sort((a, b) => {
          const dateA = a.timestamp?.toDate ? a.timestamp.toDate() : new Date(a.date || 0);
          const dateB = b.timestamp?.toDate ? b.timestamp.toDate() : new Date(b.date || 0);
          return dateA - dateB;
        })
        .map(entry => {
          const dateObj = entry.timestamp?.toDate ? entry.timestamp.toDate() : new Date(entry.date || 0);
          return { date: `${dateObj.getMonth() + 1}/${dateObj.getDate()}`, xp: entry.xp || 0 };
        });
    }

    const today = new Date();
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(today.getDate() - (6 - i));
      return { date: `${d.getMonth() + 1}/${d.getDate()}`, xp: Math.floor((i / 6) * xp) };
    });
  };

  const xpHistoryData = prepareXpHistoryData();

  return (
    <div className={`chart-container position-relative ${isUpdating ? 'updating' : ''}`}>
      <div className="realtime-indicator" title="Real-time data from Firestore" />
      <h5 className="text-center mb-3">Level {calculatedLevel} Progress</h5>
      <div className="d-flex justify-content-center align-items-center mb-2">
        <span className="badge bg-primary fs-6">{xp} XP</span>
        <span className="mx-2">•</span>
        <span>{currentLevelXp}/{xpPerLevel} to next level</span>
      </div>

      <div className="position-relative mb-4 px-2">
        <div className="progress" style={{ height: '20px', borderRadius: '10px' }}>
          <div
            className="progress-bar progress-bar-striped progress-bar-animated bg-success"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {progress.toFixed(0)}%
          </div>
        </div>
      </div>

      <h6 className="text-center mb-2">XP History</h6>
      <ResponsiveContainer width="100%" height={120}>
        <AreaChart
          data={xpHistoryData}
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis hide />
          <Tooltip formatter={(value) => [`${value} XP`, 'Experience']} />
          <Area
            type="monotone"
            dataKey="xp"
            stroke="#28a745"
            fill="rgba(40, 167, 69, 0.3)"
            activeDot={{ r: 6 }}
            animationBegin={300}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
