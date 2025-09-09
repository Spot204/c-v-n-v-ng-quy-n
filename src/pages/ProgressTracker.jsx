import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/card';
import { Progress } from '../components/progress';
import { Button } from '../components/button';
import { Badge } from '../components/badge';
import { Input } from '../components/input';
import { Label } from '../components/label';
import { Textarea } from '../components/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/dialog';
import { Calendar, CheckCircle2, Clock, Edit3, Plus, Target } from 'lucide-react';

// Hàm sinh milestones cho quyết định
function generateMilestones(decision) {
  const baseMilestones = [
    'Lên kế hoạch chi tiết',
    'Chuẩn bị nguồn lực',
    'Bắt đầu thực hiện',
    'Hoàn thành 50%',
    'Hoàn thành'
  ];

  switch (decision.category) {
    case 'education':
      return [
        'Nghiên cứu chương trình học',
        'Đăng ký và thanh toán',
        'Bắt đầu học',
        'Hoàn thành 50% khóa học',
        'Tốt nghiệp/Hoàn thành'
      ];
    case 'travel':
      return [
        'Lên kế hoạch hành trình',
        'Đặt vé và khách sạn',
        'Chuẩn bị hành lý',
        'Thực hiện chuyến đi',
        'Hoàn thành chuyến đi'
      ];
    case 'purchase':
      return [
        'Nghiên cứu sản phẩm',
        'So sánh giá cả',
        'Quyết định mua',
        'Thanh toán và giao hàng',
        'Sử dụng sản phẩm'
      ];
    default:
      return baseMilestones;
  }
}

function getStatusLabel(status) {
  const labels = {
    planning: 'Đang lên kế hoạch',
    'in-progress': 'Đang thực hiện',
    completed: 'Hoàn thành',
    paused: 'Tạm dừng'
  };
  return labels[status] || status;
}

function getStatusColor(status) {
  switch (status) {
    case 'completed':
      return 'default';
    case 'in-progress':
      return 'secondary';
    case 'paused':
      return 'outline';
    default:
      return 'outline';
  }
}

export default function ProgressTracker({ decisions, onProgressUpdate }) {
  const [progressData, setProgressData] = useState(() =>
    decisions.map(decision => ({
      decisionId: decision.id,
      decision,
      status: 'planning',
      currentProgress: 0,
      updates: [],
      milestones: generateMilestones(decision)
    }))
  );

  const [selectedDecision, setSelectedDecision] = useState(null);
  const [newUpdate, setNewUpdate] = useState({
    progress: 0,
    notes: ''
  });

  useEffect(() => {
    if (onProgressUpdate) {
      onProgressUpdate(progressData);
    }
  }, [progressData, onProgressUpdate]);

  const updateProgress = (decisionId, progress, notes) => {
    const update = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      progress,
      notes
    };

    setProgressData(prev =>
      prev.map(item =>
        item.decisionId === decisionId
          ? {
              ...item,
              currentProgress: progress,
              updates: [...item.updates, update],
              status: progress >= 100 ? 'completed' : progress > 0 ? 'in-progress' : 'planning'
            }
          : item
      )
    );

    setNewUpdate({ progress: 0, notes: '' });
    setSelectedDecision(null);
  };

  const startDecision = decisionId => {
    setProgressData(prev =>
      prev.map(item =>
        item.decisionId === decisionId
          ? {
              ...item,
              status: 'in-progress',
              startDate: new Date().toISOString().split('T')[0]
            }
          : item
      )
    );
  };

  const setTargetDate = (decisionId, targetDate) => {
    setProgressData(prev =>
      prev.map(item =>
        item.decisionId === decisionId
          ? { ...item, targetDate }
          : item
      )
    );
  };

  return (
    <ProgressTrackerView
      progressData={progressData}
      setTargetDate={setTargetDate}
      startDecision={startDecision}
      setSelectedDecision={setSelectedDecision}
      newUpdate={newUpdate}
      setNewUpdate={setNewUpdate}
      updateProgress={updateProgress}
      getStatusColor={getStatusColor}
    />
  );
}

function ProgressTrackerView({ progressData, setTargetDate, startDecision, setSelectedDecision, newUpdate, setNewUpdate, updateProgress, getStatusColor }) {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Theo Dõi Tiến Trình
          </CardTitle>
          <p className="text-muted-foreground">
            Theo dõi và cập nhật tiến trình thực hiện các quyết định của bạn
          </p>
        </CardHeader>
      </Card>

      {progressData.map((item) => (
        <Card key={item.decisionId}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                {item.status === 'completed' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <Clock className="h-5 w-5 text-blue-600" />
                )}
                {item.decision.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusColor(item.status)}>
                  {getStatusLabel(item.status)}
                </Badge>
                <Badge variant="outline">
                  {item.currentProgress}%
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Tiến trình hoàn thành</span>
                <span>{item.currentProgress}%</span>
              </div>
              <Progress value={item.currentProgress} className="h-3" />
            </div>

            {/* Dates and Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Ngày bắt đầu</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{item.startDate ? new Date(item.startDate).toLocaleDateString('vi-VN') : 'Chưa bắt đầu'}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Ngày mục tiêu</Label>
                <Input
                  type="date"
                  value={item.targetDate || ''}
                  onChange={(e) => setTargetDate(item.decisionId, e.target.value)}
                  className="h-8"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Thao tác</Label>
                <div className="flex gap-2">
                  {item.status === 'planning' && (
                    <Button size="sm" onClick={() => startDecision(item.decisionId)}>
                      Bắt đầu
                    </Button>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedDecision(item)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Cập nhật
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Cập nhật tiến trình</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="progress">Tiến trình (%)</Label>
                          <Input
                            id="progress"
                            type="number"
                            min="0"
                            max="100"
                            value={newUpdate.progress}
                            onChange={(e) => setNewUpdate(prev => ({ ...prev, progress: Number(e.target.value) }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notes">Ghi chú</Label>
                          <Textarea
                            id="notes"
                            value={newUpdate.notes}
                            onChange={(e) => setNewUpdate(prev => ({ ...prev, notes: e.target.value }))}
                            placeholder="Nhập ghi chú về tiến trình..."
                            rows={3}
                          />
                        </div>
                        <Button
                          onClick={() => updateProgress(item.decisionId, newUpdate.progress, newUpdate.notes)}
                          disabled={!item}
                        >
                          Cập nhật
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div>
              <h4 className="mb-3">Các mốc quan trọng</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {item.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                    <CheckCircle2 className={`h-4 w-4 ${item.currentProgress > (idx + 1) * (100 / item.milestones.length) ? 'text-green-600' : 'text-muted-foreground'}`} />
                    <span className="text-sm">{milestone}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Updates */}
            {item.updates.length > 0 && (
              <div>
                <h4 className="mb-3">Cập nhật gần đây</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {item.updates.slice(-3).reverse().map((update) => (
                    <div key={update.id} className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline">{update.progress}%</Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(update.date).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      {update.notes && (
                        <p className="text-sm">{update.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}