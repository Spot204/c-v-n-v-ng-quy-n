import { Button } from "../components/button";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";
import { createAccount } from "../services/Register.js";

export default function Register({ onRegister, onLogin }) {
  const handleRegister = () => {
    onRegister();
  };
  const handleLogin = () => {
    onLogin();
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Card className="w-full max-w-md shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-blue-500 text-center">
            Đăng Ký
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Tên Đăng Nhập</Label>
            <Input id="username" placeholder="Nhập tên đăng nhập của bạn" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Nhập email của bạn" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật Khẩu</Label>
            <Input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu của bạn"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật Khẩu</Label>
            <Input
              id="password"
              type="password"
              placeholder="Nhập lại mật khẩu của bạn"
            />
          </div>
          <Button className="w-full" onClick={handleRegister}>
            Đăng Ký
          </Button>
          <Label
            className="text-blue-500 underline hover:text-blue-400 hover:cursor-pointer w-fit"
            onClick={handleLogin}
          >
            Đã có tài khoản? Đăng nhập
          </Label>
        </CardContent>
      </Card>
    </div>
  );
}
