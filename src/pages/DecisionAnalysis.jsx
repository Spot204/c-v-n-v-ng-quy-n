import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/card';
import { Progress } from '../components/progress';
import { Badge } from '../components/badge';
import { Alert, AlertDescription } from '../components/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/tabs';
import AnalysisCharts from './AnalysisCharts';
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Lightbulb
} from 'lucide-react';

// Bạn cần đảm bảo các hàm sau được định nghĩa ở nơi khác trong dự án
// getScoreIcon, getScoreVariant, getRiskVariant, getRiskLabel, getReasonVariant, getOverallRecommendation, analyzeDecision

export default function DecisionAnalysis({ personalData, decisions }) {
  const analysisResults = useMemo(() => {
    return decisions.map(decision => analyzeDecision(decision, personalData));
  }, [decisions, personalData]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Kết Quả Phân Tích Quyết Định</CardTitle>
          <p className="text-muted-foreground">
            Hệ thống đã phân tích {decisions.length} quyết định dựa trên thông tin cá nhân của bạn
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="results" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="results">Kết Quả Phân Tích</TabsTrigger>
          <TabsTrigger value="charts">Biểu Đồ Trực Quan</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-6 mt-6">
          {analysisResults.map((result, index) => (
            <Card key={result.decision.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    {getScoreIcon(result.overallScore)}
                    {result.decision.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={getScoreVariant(result.overallScore)}>
                      {result.overallScore}% phù hợp
                    </Badge>
                    <Badge variant={getRiskVariant(result.riskLevel)}>
                      {getRiskLabel(result.riskLevel)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Mức độ phù hợp tổng thể</span>
                    <span>{result.overallScore}%</span>
                  </div>
                  <Progress value={result.overallScore} className="h-3" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Tài chính</span>
                      <span>{result.financialScore}%</span>
                    </div>
                    <Progress value={result.financialScore} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Sức khỏe</span>
                      <span>{result.healthScore}%</span>
                    </div>
                    <Progress value={result.healthScore} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Sinh hoạt</span>
                      <span>{result.lifestyleScore}%</span>
                    </div>
                    <Progress value={result.lifestyleScore} className="h-2" />
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Lý do đánh giá
                  </h4>
                  <div className="space-y-2">
                    {result.reasons.map((reason, idx) => (
                      <Alert key={idx} variant={getReasonVariant(reason)}>
                        <AlertDescription>{reason}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </div>

                {result.suggestions.length > 0 && (
                  <div>
                    <h4 className="mb-3 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Gợi ý cải thiện
                    </h4>
                    <div className="space-y-2">
                      {result.suggestions.map((suggestion, idx) => (
                        <Alert key={idx} className="border-blue-200 bg-blue-50">
                          <AlertDescription className="text-blue-800">{suggestion}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Khuyến Nghị Tổng Quát
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getOverallRecommendation(analysisResults)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="mt-6">
          <AnalysisCharts
            personalData={personalData}
            decisions={decisions}
            analysisResults={analysisResults}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function analyzeDecision(decision, personalData) {
  const reasons = [];
  const suggestions = [];

  // Financial Analysis
  const monthlyAffordability = personalData.monthlyIncome - personalData.monthlyExpenses;
  const costRatio = decision.estimatedCost / personalData.savings;
  const monthsToCover = decision.estimatedCost / Math.max(monthlyAffordability, 1);

  let financialScore = 100;

  if (decision.estimatedCost > personalData.savings) {
    financialScore -= 40;
    reasons.push("Chi phí vượt quá số tiền tiết kiệm hiện tại");
    suggestions.push("Xem xét giảm chi phí hoặc tăng thời gian tiết kiệm");
  } else if (costRatio > 0.5) {
    financialScore -= 20;
    reasons.push("Quyết định này sử dụng hơn 50% số tiền tiết kiệm");
    suggestions.push("Cân nhắc giảm chi phí để duy trì quỹ khẩn cấp");
  }

  if (monthsToCover > 6) {
    financialScore -= 30;
    reasons.push("Cần hơn 6 tháng để có thể chi trả cho quyết định này");
    suggestions.push("Tăng thu nhập hoặc giảm chi tiêu hàng tháng");
  }

  // Health Analysis
  let healthScore = 100;

  if (decision.category === 'health') {
    healthScore += 20;
    reasons.push("Quyết định này có lợi cho sức khỏe");
  }

  if (personalData.sleepHours < 7 && decision.timeCommitment > 10) {
    healthScore -= 30;
    reasons.push("Thời gian ngủ không đủ, thêm cam kết thời gian có thể ảnh hưởng sức khỏe");
    suggestions.push("Cải thiện lịch trình ngủ trước khi cam kết thêm thời gian");
  }

  if (personalData.stressLevel > 7 && decision.urgency === 'high') {
    healthScore -= 25;
    reasons.push("Mức độ căng thẳng cao, quyết định khẩn cấp có thể tăng áp lực");
    suggestions.push("Xem xét giảm mức độ khẩn cấp hoặc cải thiện quản lý căng thẳng");
  }

  // Lifestyle Analysis
  let lifestyleScore = 100;

  const totalCommittedTime = personalData.studyHours + personalData.workHours + personalData.socialHours;
  const dailyTimeCommitment = decision.timeCommitment / 7;

  if (totalCommittedTime + dailyTimeCommitment > 16) {
    lifestyleScore -= 40;
    reasons.push("Không đủ thời gian rảnh để thực hiện quyết định này");
    suggestions.push("Giảm các hoạt động khác hoặc tối ưu hóa thời gian");
  } else if (totalCommittedTime + dailyTimeCommitment > 12) {
    lifestyleScore -= 20;
    reasons.push("Thời gian rảnh sẽ bị hạn chế đáng kể");
    suggestions.push("Lập kế hoạch thời gian cẩn thận");
  }

  if (decision.category === 'education' && personalData.studyHours > 8) {
    lifestyleScore -= 15;
    reasons.push("Đã có khối lượng học tập cao, thêm cam kết giáo dục có thể gây quá tải");
    suggestions.push("Cân bằng thời gian học tập và nghỉ ngơi");
  }

  const overallScore = Math.round((financialScore + healthScore + lifestyleScore) / 3);

  if (overallScore > 70) {
    reasons.push("Quyết định này phù hợp với tình trạng hiện tại của bạn");
  }

  if (decision.category === 'education' && personalData.freeTime > 2) {
    reasons.push("Có đủ thời gian rảnh để tham gia hoạt động giáo dục");
  }

  let riskLevel = 'low';
  if (overallScore < 50) riskLevel = 'high';
  else if (overallScore < 70) riskLevel = 'medium';

  return {
    decision,
    overallScore: Math.max(0, Math.min(100, overallScore)),
    financialScore: Math.max(0, Math.min(100, financialScore)),
    healthScore: Math.max(0, Math.min(100, healthScore)),
    lifestyleScore: Math.max(0, Math.min(100, lifestyleScore)),
    reasons,
    suggestions,
    riskLevel
  };
}

function getScoreIcon(score) {
  if (score >= 70) return <CheckCircle2 className="h-5 w-5 text-green-600" />;
  if (score >= 50) return <AlertCircle className="h-5 w-5 text-yellow-600" />;
  return <XCircle className="h-5 w-5 text-red-600" />;
}

function getScoreVariant(score) {
  if (score >= 70) return "default";
  if (score >= 50) return "secondary";
  return "destructive";
}

function getRiskVariant(risk) {
  if (risk === 'low') return "default";
  if (risk === 'medium') return "secondary";
  return "destructive";
}

function getRiskLabel(risk) {
  const labels = {
    low: 'Rủi ro thấp',
    medium: 'Rủi ro trung bình',
    high: 'Rủi ro cao'
  };
  return labels[risk] || risk;
}

function getReasonVariant(reason) {
  if (reason.includes('vượt quá') || reason.includes('không đủ') || reason.includes('quá tải')) {
    return "destructive";
  }
  return "default";
}

function getOverallRecommendation(results) {
  const bestDecision = results.reduce((best, current) =>
    current.overallScore > best.overallScore ? current : best
  );

  const averageScore = results.reduce((sum, result) => sum + result.overallScore, 0) / results.length;

  return (
    <div className="space-y-3">
      <p>
        <strong>Quyết định được khuyên nhất:</strong> {bestDecision.decision.title}
        với mức độ phù hợp {bestDecision.overallScore}%
      </p>
      <p>
        <strong>Điểm phù hợp trung bình:</strong> {Math.round(averageScore)}%
      </p>
      <p className="text-muted-foreground">
        {averageScore >= 70
          ? "Nhìn chung, các quyết định này phù hợp với tình trạng hiện tại của bạn."
          : averageScore >= 50
          ? "Các quyết định cần được cân nhắc kỹ lưỡng và có thể cần điều chỉnh."
          : "Bạn nên xem xét lại các quyết định này hoặc cải thiện tình trạng cá nhân trước khi thực hiện."}
      </p>
    </div>
  );
}