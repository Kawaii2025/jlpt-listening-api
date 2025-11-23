require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const examsRouter = require('./routes/exams');
const partsRouter = require('./routes/parts');
const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/exams', examsRouter);
app.use('/api/parts', partsRouter);
app.use('/api/items', itemsRouter);
app.use('/api/users', usersRouter);

// 健康检查接口，检查API和数据库
app.get('/health', async (req, res) => {
  // API健康
  let dbStatus = 'unknown';
  try {
    // 简单查询数据库
    await db.query('SELECT 1');
    dbStatus = 'ok';
  } catch (err) {
    dbStatus = 'error';
  }
  res.json({
    api: 'ok',
    db: dbStatus
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening-api running on port ${port}`);
});
