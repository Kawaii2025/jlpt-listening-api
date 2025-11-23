require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');



const examsRouter = require('./routes/exams');
const partsRouter = require('./routes/parts');
const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');
const sentencesRouter = require('./routes/sentences');
const wrapResponse = require('./middlewares/wrapResponse');


const app = express();
app.use(cors());
app.use(express.json());

// 全局统一响应格式
app.use(wrapResponse((req, res, next) => next()));


app.use('/api/exams', examsRouter);
app.use('/api/parts', partsRouter);
app.use('/api/items', itemsRouter);
app.use('/api/users', usersRouter);
app.use('/api/sentences', sentencesRouter);

// 健康检查接口，检查API和数据库
app.get('/health', async (req, res) => {
  let dbStatus = 'unknown';
  try {
    await db.query('SELECT 1');
    dbStatus = 'ok';
  } catch (err) {
    dbStatus = 'error';
  }
  // 生成北京时间（东八区）时间字符串
  const now = new Date();
  const beijingTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  const pad = n => n.toString().padStart(2, '0');
  const timestamp = `${beijingTime.getUTCFullYear()}-${pad(beijingTime.getUTCMonth() + 1)}-${pad(beijingTime.getUTCDate())} ${pad(beijingTime.getUTCHours())}:${pad(beijingTime.getUTCMinutes())}:${pad(beijingTime.getUTCSeconds())}`;
  res.json({
    api: 'ok',
    db: dbStatus,
    timestamp
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening-api running on port ${port}`);
});
