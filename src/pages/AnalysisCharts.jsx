import { Card, CardContent, CardHeader, CardTitle } from '../components/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from "recharts";

export default function AnalysisCharts({ personalData, decisions, analysisResults }) {
  const financialData = [
    { name: 'Thu nhập', value: personalData.monthlyIncome },
    { name: 'Chi tiêu', value: personalData.monthlyExpenses },
    { name: 'Tiết kiệm', value: personalData.savings / 12 },
    { name: 'Giải trí', value: personalData.entertainmentBudget }
  ];

  const healthData = [
    { category: 'Giấc ngủ', current: personalData.sleepHours, ideal: 8 },
    { category: 'Tập thể dục', current: personalData.exerciseHours, ideal: 5 },
    { category: 'Căng thẳng', current: 10 - personalData.stressLevel, ideal: 8 },
    { category: 'Sức khỏe', current: personalData.healthScore, ideal: 8 }
  ];

  const timeDistribution = [
    { name: 'Học tập', value: personalData.studyHours, fill: '#8884d8' },
    { name: 'Làm việc', value: personalData.workHours, fill: '#82ca9d' },
    { name: 'Xã hội', value: personalData.socialHours, fill: '#ffc658' },
    { name: 'Rảnh rỗi', value: personalData.freeTime, fill: '#ff7300' },
    { name: 'Ngủ', value: personalData.sleepHours, fill: '#0088fe' }
  ];

  const decisionComparison = decisions.map(decision => ({
    name: decision.title.substring(0, 20) + '...',
    'Chi phí (triệu VNĐ)': decision.estimatedCost / 1000000,
    'Thời gian (h/tuần)': decision.timeCommitment,
    'Mức độ khẩn cấp': decision.urgency === 'high' ? 3 : decision.urgency === 'medium' ? 2 : 1
  }));

  const radarData = [
    {
      subject: 'Tài chính ổn định',
      A: Math.min(100, (personalData.savings / (personalData.monthlyExpenses * 6)) * 100),
      fullMark: 100
    },
    {
      subject: 'Sức khỏe tốt',
      A: personalData.healthScore * 10,
      fullMark: 100
    },
    {
      subject: 'Cân bằng thời gian',
      A: Math.min(100, personalData.freeTime / 4 * 100),
      fullMark: 100
    },
    {
      subject: 'Học tập hiệu quả',
      A: Math.min(100, personalData.studyHours / 8 * 100),
      fullMark: 100
    },
    {
      subject: 'Căng thẳng thấp',
      A: (10 - personalData.stressLevel) * 10,
      fullMark: 100
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Tình Hình Tài Chính</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `${Number(value).toLocaleString('vi-VN')} VNĐ`} />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Chỉ Số Sức Khỏe</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={healthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="current" fill="#82ca9d" name="Hiện tại" />
              <Bar dataKey="ideal" fill="#8dd1e1" name="Lý tưởng" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Phân Bố Thời Gian Hàng Ngày</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={timeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}h`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {timeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>So Sánh Các Quyết Định</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={decisionComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Chi phí (triệu VNĐ)" fill="#ff7300" />
              <Bar dataKey="Thời gian (h/tuần)" fill="#00ff88" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Hồ Sơ Cá Nhân Tổng Quan</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                name="Điểm số"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}