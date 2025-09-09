import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/card';
import { Input } from '../components/input';
import { Label } from '../components/label';
import { Button } from '../components/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/tabs';

export default function PersonalDataForm({ onDataSubmit, initialData }) {
  const [formData, setFormData] = useState({
    monthlyIncome: initialData?.monthlyIncome || "",
    monthlyExpenses: initialData?.monthlyExpenses || "",
    savings: initialData?.savings || "",
    entertainmentBudget: initialData?.entertainmentBudget || "",
    sleepHours: initialData?.sleepHours || "",
    exerciseHours: initialData?.exerciseHours || "",
    stressLevel: initialData?.stressLevel || "",
    healthScore: initialData?.healthScore || "",
    studyHours: initialData?.studyHours || "",
    socialHours: initialData?.socialHours || "",
    workHours: initialData?.workHours || "",
    freeTime: initialData?.freeTime || "",
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    onDataSubmit(formData);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
      <CardHeader>
        <CardTitle>Thông Tin Cá Nhân</CardTitle>
        <p className="text-muted-foreground">
          Nhập thông tin cá nhân để hệ thống có thể phân tích và đưa ra quyết định phù hợp nhất
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="finance" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="finance" className={"bg-white"}>Tài Chính</TabsTrigger>
            <TabsTrigger value="health" className={"bg-white"}>Sức Khỏe</TabsTrigger>
            <TabsTrigger value="lifestyle" className={"bg-white"}>Sinh Hoạt</TabsTrigger>
          </TabsList>

          <TabsContent value="finance" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="income">Thu nhập hàng tháng (VNĐ)</Label>
                <Input
                  id="income"
                  type="number"
                  value={formData.monthlyIncome||""}
                  onChange={(e) => handleInputChange('monthlyIncome', Number(e.target.value))}
                  placeholder="10,000,000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expenses">Chi tiêu hàng tháng (VNĐ)</Label>
                <Input
                  id="expenses"
                  type="number"
                  value={formData.monthlyExpenses||""}
                  onChange={(e) => handleInputChange('monthlyExpenses', Number(e.target.value))}
                  placeholder="7,000,000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="savings">Tiết kiệm hiện tại (VNĐ)</Label>
                <Input
                  id="savings"
                  type="number"
                  value={formData.savings||""}
                  onChange={(e) => handleInputChange('savings', Number(e.target.value))}
                  placeholder="50,000,000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="entertainment">Ngân sách giải trí (VNĐ)</Label>
                <Input
                  id="entertainment"
                  type="number"
                  value={formData.entertainmentBudget||""}
                  onChange={(e) => handleInputChange('entertainmentBudget', Number(e.target.value))}
                  placeholder="2,000,000"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="health" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sleep">Giờ ngủ mỗi ngày</Label>
                <Input
                  id="sleep"
                  type="number"
                  value={formData.sleepHours||""}
                  onChange={(e) => handleInputChange('sleepHours', Number(e.target.value))}
                  placeholder="8"
                  min="0"
                  max="24"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exercise">Giờ tập thể dục mỗi tuần</Label>
                <Input
                  id="exercise"
                  type="number"
                  value={formData.exerciseHours||""}
                  onChange={(e) => handleInputChange('exerciseHours', Number(e.target.value))}
                  placeholder="5"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stress">Mức độ căng thẳng (1-10)</Label>
                <Input
                  id="stress"
                  type="number"
                  value={formData.stressLevel||""}
                  onChange={(e) => handleInputChange('stressLevel', Number(e.target.value))}
                  placeholder="5"
                  min="1"
                  max="10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="health">Điểm sức khỏe tổng quát (1-10)</Label>
                <Input
                  id="health"
                  type="number"
                  value={formData.healthScore||""}
                  onChange={(e) => handleInputChange('healthScore', Number(e.target.value))}
                  placeholder="7"
                  min="1"
                  max="10"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lifestyle" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="study">Giờ học tập mỗi ngày</Label>
                <Input
                  id="study"
                  type="number"
                  value={formData.studyHours||""}
                  onChange={(e) => handleInputChange('studyHours', Number(e.target.value))}
                  placeholder="6"
                  min="0"
                  max="24"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social">Giờ hoạt động xã hội mỗi ngày</Label>
                <Input
                  id="social"
                  type="number"
                  value={formData.socialHours||""}
                  onChange={(e) => handleInputChange('socialHours', Number(e.target.value))}
                  placeholder="2"
                  min="0"
                  max="24"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="work">Giờ làm việc/thực tập mỗi ngày</Label>
                <Input
                  id="work"
                  type="number"
                  value={formData.workHours||""}
                  onChange={(e) => handleInputChange('workHours', Number(e.target.value))}
                  placeholder="4"
                  min="0"
                  max="24"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="free">Thời gian rảnh rỗi mỗi ngày</Label>
                <Input
                  id="free"
                  type="number"
                  value={formData.freeTime||""}
                  onChange={(e) => handleInputChange('freeTime', Number(e.target.value))}
                  placeholder="3"
                  min="0"
                  max="24"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button onClick={handleSubmit} className="w-full">
            Lưu Thông Tin & Tiếp Tục
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}