import { useState } from "react";
import {Button} from "../components/button";
import {Input} from "../components/input";
import { Label } from "../components/label";
import {Card, CardContent, CardHeader, CardTitle} from "../components/card";
import { login } from "../services/Login.js";

export default function Login({ onLogin, onRegister, setIdUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");
        try {
            const res = await login({username, password});
            console.log({res});
            if (res.data.message === "Login successful") {
                setIdUser(res.data.id);
                onLogin();
            } else {
                setError(res?.message || "Đăng nhập thất bại");
            }
        } catch (err) {
            setError("Có lỗi xảy ra, vui lòng thử lại");
        }
    };

    const handleRegister = () => {
        onRegister();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <Card className="w-full max-w-md shadow-lg bg-white">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold text-blue-500 text-center">Đăng Nhập</CardTitle>
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
                        <Label htmlFor="password">Mật Khẩu</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Nhập mật khẩu của bạn"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                    <Button className="w-full" onClick={handleLogin}>Đăng Nhập</Button>
                    <Label className="text-blue-500 underline hover:text-blue-400 hover:cursor-pointer w-fit"
                        onClick={handleRegister}> Đăng ký </Label>
                </CardContent>
            </Card>
        </div>
    );
}