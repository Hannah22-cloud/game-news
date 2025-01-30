const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());

const KIMI_API_KEY = 'sk-6PQEZehdPm7N9yk4luiIET1PBl2eZt9B04VL9mjbonEl7hSk';
const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

app.post('/call-kimi', async (req, res) => {
  try {
    const { query } = req.body;
    const response = await axios.post(KIMI_API_URL, {
      model: 'moonshot-v1-8k',
      messages: [
        { role: 'user', content: query }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${KIMI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data.choices[0].message.content);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
