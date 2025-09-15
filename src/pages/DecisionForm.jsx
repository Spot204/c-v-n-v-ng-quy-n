import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/card';
import { Input } from '../components/input';
import { Label } from '../components/label';
import { Button } from '../components/button';
import { Textarea } from '../components/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/select';
import { Badge } from '../components/badge';
import { X, Plus } from 'lucide-react';

export default function DecisionForm({ onDecisionsSubmit, initialDecisions }) {
  const [decisions, setDecisions] = useState(
    initialDecisions || [{
      id: '1',
      title: '',
      description: '',
      category: 'other',
      estimatedCost: "",
      timeCommitment: "",
      urgency: 'medium'
    }]
  );

  const addDecision = () => {
    if (decisions.length < 3) {
      setDecisions(prev => [...prev, {
        id: Date.now().toString(),
        title: '',
        description: '',
        category: 'other',
        estimatedCost: "",
        timeCommitment: "",
        urgency: 'medium'
      }]);
    }
  };

  const removeDecision = (id) => {
    if (decisions.length > 1) {
      setDecisions(prev => prev.filter(d => d.id !== id));
    }
  };

  const updateDecision = (id, field, value) => {
    setDecisions(prev => prev.map(d =>
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  const handleSubmit = () => {
    const validDecisions = decisions.filter(d => d.title.trim() !== '');
    if (validDecisions.length > 0) {
      onDecisionsSubmit(validDecisions);
    }
  };

  const categoryLabels = {
    education: 'Giáo dục',
    travel: 'Tiết kiệm',
    purchase: 'Mua sắm',
    health: 'Sức khỏe',
    entertainment: 'Giải trí',
    other: 'Khác'
  };

  const urgencyLabels = {
    low: 'Thấp',
    medium: 'Trung bình',
    high: 'Cao'
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Quyết Định Cần Phân Tích</CardTitle>
        <p className="text-muted-foreground">
          Nhập từ 1-3 quyết định mà bạn đang cân nhắc (ví dụ: mua laptop, đi du lịch, đăng ký khóa học)
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {decisions.map((decision, index) => (
          <Card key={decision.id} className="border-2 border-dashed border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h3>Quyết định {index + 1}</h3>
                {decisions.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDecision(decision.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor={`title-${decision.id}`}>Tiêu đề quyết định *</Label>
                  <Input
                    id={`title-${decision.id}`}
                    value={decision.title}
                    onChange={(e) => updateDecision(decision.id, 'title', e.target.value)}
                    placeholder="Ví dụ: Mua laptop mới cho học tập"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor={`desc-${decision.id}`}>Mô tả chi tiết</Label>
                  <Textarea
                    id={`desc-${decision.id}`}
                    value={decision.description}
                    onChange={(e) => updateDecision(decision.id, 'description', e.target.value)}
                    placeholder="Mô tả chi tiết về quyết định này..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Danh mục</Label>
                  <Select
                    value={decision.category}
                    onValueChange={(value) => updateDecision(decision.id, 'category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categoryLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Mức độ khẩn cấp</Label>
                  <Select
                    value={decision.urgency}
                    onValueChange={(value) => updateDecision(decision.id, 'urgency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(urgencyLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`cost-${decision.id}`}>Chi phí ước tính (VNĐ)</Label>
                  <Input
                    id={`cost-${decision.id}`}
                    type="number"
                    value={decision.estimatedCost}
                    onChange={(e) => updateDecision(decision.id, 'estimatedCost', Number(e.target.value))}
                    placeholder="5,000,000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`time-${decision.id}`}>Thời gian cam kết (giờ/tuần)</Label>
                  <Input
                    id={`time-${decision.id}`}
                    type="number"
                    value={decision.timeCommitment}
                    onChange={(e) => updateDecision(decision.id, 'timeCommitment', Number(e.target.value))}
                    placeholder="10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex gap-4">
          {decisions.length < 3 && (
            <Button variant="outline" onClick={addDecision} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Thêm quyết định
            </Button>
          )}

          <Button onClick={handleSubmit} className="flex-1">
            Phân Tích Quyết Định
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary">Tối đa 3 quyết định</Badge>
          <Badge variant="secondary">{decisions.filter(d => d.title.trim() !== '').length} quyết định đã nhập</Badge>
        </div>
      </CardContent>
    </Card>
  );
}