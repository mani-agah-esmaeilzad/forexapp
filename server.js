const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

// ایجاد یک برنامه Express
const app = express();

// استفاده از پوشه public برای ارائه فایل‌های استاتیک
app.use(express.static(path.join(__dirname, 'public')));

// ایجاد یک سرور HTTP
const server = http.createServer(app);

// ایجاد WebSocket Server
const wss = new WebSocket.Server({ server });

// داده‌های نمونه برای اطلاعات حساب و معاملات (به عنوان مثال)
const accountInfo = {
    balance: 10000.00,
    equity: 9500.00,
    margin_level: 120.00
};

const openTrades = [
    { symbol: 'EURUSD', volume: 1.0, trade_type: 0, profit: 200.50 }, // 0 = buy
    { symbol: 'USDJPY', volume: 0.5, trade_type: 1, profit: -100.25 }, // 1 = sell
    { symbol: 'GBPUSD', volume: 2.0, trade_type: 0, profit: 150.75 }
];

// مدیریت ارتباطات WebSocket
wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    // ارسال اطلاعات حساب و معاملات به کاربر متصل
    const data = {
        account_info: accountInfo,
        open_trades: openTrades
    };
    ws.send(JSON.stringify(data));

    // دریافت پیام از کلاینت (در صورت نیاز)
    ws.on('message', (message) => {
        console.log('Received:', message);
        // می‌توانید پیام‌های دریافتی را پردازش کنید و پاسخ مناسب بفرستید
    });

    // مدیریت بستن اتصال
    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

// تنظیم پورت برای سرور
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('http://localhost:3000');
    
});
