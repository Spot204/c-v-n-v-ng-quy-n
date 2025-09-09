import { useState } from "react";
import PersonalDataForm from "./pages/PersonalDataForm";
import DecisionForm from "./pages/DecisionForm";
import DecisionAnalysis from "./pages/DecisionAnalysis";
import ProgressTracker from "./pages/ProgressTracker";
import Login from "./pages/login";
import Register from "./pages/Resgister";
import { Button } from "./components/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/card";
import { Badge } from "./components/badge";
import { Tabs, TabsList, TabsTrigger } from "./components/tabs";
import {
  Brain,
  ChevronLeft,
  BarChart3,
  Target,
  User,
  Settings,
} from "lucide-react";

export default function App() {
  const [currentStep, setCurrentStep] = useState("login"); // "welcome", "personal-data", "decisions", "analysis", "tracking"
  const [personalData, setPersonalData] = useState(null);
  const [decisions, setDecisions] = useState([]);

  const handlePersonalDataSubmit = (data) => {
    setPersonalData(data);
    setCurrentStep("decisions");
  };

  const handleDecisionsSubmit = (submittedDecisions) => {
    setDecisions(submittedDecisions);
    setCurrentStep("analysis");
  };

  const goBack = () => {
    if (currentStep === "decisions") setCurrentStep("personal-data");
    else if (currentStep === "analysis") setCurrentStep("decisions");
    else if (currentStep === "tracking") setCurrentStep("analysis");
  };

  const renderWelcome = () => (
    <div className=" justify-center items-center w-full h-full">
      <div className=" flex min-h-[950px] items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Card className="w-full max-w-2xl mx-auto text-center">
          <CardHeader className="space-y-4 pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl">
                Hệ Thống Hỗ Trợ Quyết Định Cá Nhân
              </CardTitle>
              <p className="text-lg text-muted-foreground">
                Đưa ra quyết định thông minh dựa trên dữ liệu cá nhân
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="p-4 border rounded-lg">
                <User className="h-8 w-8 text-blue-600 mb-3" />
                <h3>Phân tích cá nhân</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Đánh giá tài chính, sức khỏe và thói quen sinh hoạt
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <BarChart3 className="h-8 w-8 text-indigo-600 mb-3" />
                <h3>Phân tích quyết định</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Tính toán mức độ phù hợp và đưa ra gợi ý
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <Target className="h-8 w-8 text-purple-600 mb-3" />
                <h3>Theo dõi tiến trình</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Giám sát và cập nhật quá trình thực hiện
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm mb-2">Quy trình sử dụng:</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">1. Nhập thông tin cá nhân</Badge>
                <Badge variant="outline">
                  2. Nhập quyết định cần phân tích
                </Badge>
                <Badge variant="outline">3. Xem kết quả phân tích</Badge>
                <Badge variant="outline">4. Theo dõi tiến trình</Badge>
              </div>
            </div>

            <Button
              onClick={() => setCurrentStep("personal-data")}
              size="lg"
              className="w-full bg-black text-white hover:bg-black/90"
            >
              Bắt Đầu Phân Tích
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderStepContent = () => {
    if (currentStep === "personal-data") {
      return (
        <PersonalDataForm
          onDataSubmit={handlePersonalDataSubmit}
          initialData={personalData || undefined}
        />
      );
    }

    if (currentStep === "decisions") {
      return (
        <DecisionForm
          onDecisionsSubmit={handleDecisionsSubmit}
          initialDecisions={decisions}
        />
      );
    }

    if (currentStep === "analysis" && personalData) {
      return (
        <div className="space-y-6">
          <DecisionAnalysis personalData={personalData} decisions={decisions} />
          <div className="flex justify-center">
            <Button onClick={() => setCurrentStep("tracking")}>
              Theo Dõi Tiến Trình Thực Hiện
            </Button>
          </div>
        </div>
      );
    }

    if (currentStep === "tracking") {
      return (
        <ProgressTracker
          decisions={decisions}
          onProgressUpdate={(progress) => {
            console.log("Progress updated:", progress);
          }}
        />
      );
    }

    return null;
  };

  if (currentStep === "welcome") {
    return renderWelcome();
  }
  if (currentStep === "login") {
    return <Login onLogin={() => setCurrentStep("welcome")} 
    onRegister={() => setCurrentStep("resgister")}/>;
  }
  if (currentStep === "resgister") {
    return <Register onRegister={() => setCurrentStep("welcome")} 
    onLogin={() => setCurrentStep("login")}/>;
  }

  return (
    <div className="min-h-[950px] bg-gradient-to-br from-gray-50 to-gray-100 ">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={goBack}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Quay lại
              </Button>
              <div className="flex items-center gap-3">
                <Brain className="h-6 w-6 text-blue-600" />
                <h1 className="text-lg">DSS Cá Nhân</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                Bước{" "}
                {currentStep === "personal-data"
                  ? "1"
                  : currentStep === "decisions"
                  ? "2"
                  : currentStep === "analysis"
                  ? "3"
                  : "4"}
                /4
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div
                className={`flex items-center gap-2 ${
                  currentStep === "personal-data"
                    ? "text-blue-600"
                    : personalData
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                <User className="h-5 w-5" />
                <span>Thông tin cá nhân</span>
              </div>
              <div
                className={`flex items-center gap-2 ${
                  currentStep === "decisions"
                    ? "text-blue-600"
                    : decisions.length > 0
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                <Settings className="h-5 w-5" />
                <span>Quyết định</span>
              </div>
              <div
                className={`flex items-center gap-2 ${
                  currentStep === "analysis" ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                <span>Phân tích</span>
              </div>
              <div
                className={`flex items-center gap-2 ${
                  currentStep === "tracking" ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <Target className="h-5 w-5" />
                <span>Theo dõi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 justify-center items-center">
        {renderStepContent()}
      </main>

      {/* Quick Navigation */}
      {(currentStep === "analysis" || currentStep === "tracking") &&
        personalData &&
        decisions.length > 0 && (
          <div className="fixed bottom-6 right-6">
            <Tabs
              value={currentStep}
              onValueChange={(value) => setCurrentStep(value)}
              className="w-80"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="analysis" className="text-xs">
                  Phân Tích
                </TabsTrigger>
                <TabsTrigger value="tracking" className="text-xs">
                  Theo Dõi
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}
    </div>
  );
}
