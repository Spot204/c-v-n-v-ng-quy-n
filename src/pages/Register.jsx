import { useState } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";
import { register } from "../services/Register.js";

export default function Register({ onRegister, onLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    setError("");
    setSuccess("");
    if (!username || !email || !password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp.");
      return;
    }
    try {
      const res = await register(username, email, password);
      if (res?.message === "Register successful") {
        setSuccess("Đăng ký thành công!");
        onRegister();
      } else {
        setError(res?.message || "Đăng ký thất bại");
      }
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại");
    }
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
            <Input
              id="username"
              placeholder="Nhập tên đăng nhập của bạn"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật Khẩu</Label>
            <Input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu của bạn"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Nhập lại Mật Khẩu</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu của bạn"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-500 text-sm">{success}</div>}
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